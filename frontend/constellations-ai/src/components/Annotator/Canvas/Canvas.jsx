import React, { useRef, useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PanToolRoundedIcon from "@mui/icons-material/PanToolRounded";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import ClearIcon from "@mui/icons-material/Clear";
import ACTIONS from "../../../setup/Actions.jsx";
import { Stage, Layer, Rect, Transformer, Circle } from "react-konva";
import { v4 as uuidv4 } from "uuid";

// Custom hook to load an image
const useImage = (url) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      setImage(img);
    };
  }, [url]);

  return image;
};

function Canvas({ currBox, boxes, rects, setRects, currImg }) {
  const stageRef = useRef();
  const [action, setAction] = useState(ACTIONS.select);
  // const [rects, setRects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const isPainting = useRef();
  const currentId = useRef();
  const transformRef = useRef();
  const isDraggable = action === ACTIONS.SELECT;

  // const backgroundImage = useImage("https://res.cloudinary.com/dzvwajhpe/image/upload/v1725066092/aswhwi3sbmezvxejqx5m.jpg");
  const backgroundImage = useImage(currImg);
  console.log("Current Image: " + currImg);

  const getImageScale = (image, width, height) => {
    if (!image) return { x: 1, y: 1 };

    const scaleX = width / image.width;
    const scaleY = height / image.height;
    const scale = Math.min(scaleX, scaleY);

    return { x: scale, y: scale };
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onPointerDown = () => {
    if (action === ACTIONS.SELECT) {
      return;
    }
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();

    currentId.current = id;
    isPainting.current = true;

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRects((rects) => [
          ...rects,
          {
            id,
            x,
            y,
            height: 20,
            width: 20,
          },
        ]);
        break;
    }
  };

  const onPointerMove = () => {
    if (action === ACTIONS.SELECT || !isPainting.current) {
      return;
    }

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRects((rects) =>
          rects.map((rect) => {
            if (rect.id === currentId.current) {
              return {
                ...rect,
                width: x - rect.x,
                height: y - rect.y,
              };
            }
            return rect;
          })
        );
        break;
    }
  };

  const onPointerUp = () => {
    isPainting.current = false;
  };

  const updatePosition = (id) => {
    setRects((rects) =>
      rects.map((rect) => {
        if (rect.id === id) {
          return {
            ...rect,
            x: rect.x,
            y: rect.y,
          };
        }
        return rect;
      })
    );
  };

  const resizeShape = (e) => {
    if (action !== ACTIONS.SELECT) {
      return;
    }
    const shape = e.currentTarget;
    transformRef.current.nodes([shape]);
    setSelectedId(shape.id());
  };

  const clearStage = () => {
    setRects([]);
    transformRef.current.nodes([]);
    setSelectedId(null);
  };

  const handleDelete = () => {
    if (selectedId) {
      setRects(rects.filter((rect) => rect.id !== selectedId));
      setSelectedId(null);
      transformRef.current.nodes([]);
    }
  };

  return (
    <Box className="canvas-container">
      <Stage
        ref={stageRef}
        width={dimensions.width}
        height={dimensions.height}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{ background: "#0F1214" }}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            height={dimensions.height}
            width={dimensions.width}
            id="bg"
            fillPatternImage={backgroundImage}
            fillPatternScale={getImageScale(backgroundImage, dimensions.width, dimensions.height)}
            fillPatternRepeat="no-repeat"
            onClick={() => {
              transformRef.current.nodes([]);
              setSelectedId(null);
            }}
          />

          {rects.map((rect) => (
            <Rect
              key={rect.id}
              id={rect.id}
              x={rect.x}
              y={rect.y}
              stroke={"#ffa000"}
              strokeWidth={2}
              height={rect.height}
              width={rect.width}
              draggable={isDraggable}
              onDragEnd={() => updatePosition(rect.id)}
              onClick={resizeShape}
              strokeScaleEnabled={false}
            />
          ))}
          <Transformer ref={transformRef} ignoreStroke={true}>
            <Circle
              radius={8}
              fill={"#FF0000"}
              onClick={handleDelete}
            />
          </Transformer>
        </Layer>
      </Stage>
      <Box>
        <Typography color={"primary"}>Image {currBox}</Typography>
        <IconButton color={"error"} onClick={clearStage}>
          <ClearIcon />
        </IconButton>
        <IconButton
          color={action === ACTIONS.SELECT ? "primary" : "default"}
          onClick={() => setAction(ACTIONS.SELECT)}
        >
          <PanToolRoundedIcon />
        </IconButton>
        <IconButton
          color={action === ACTIONS.RECTANGLE ? "primary" : "default"}
          onClick={() => setAction(ACTIONS.RECTANGLE)}
        >
          <CheckBoxOutlineBlankIcon />
        </IconButton>
        <IconButton
        color={action === ACTIONS.AI_RECTANGLE ? "primary" : "default"}
        onClick={() => setAction(ACTIONS.AI_RECTANGLE)}>
            <PhotoFilterIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Canvas;
