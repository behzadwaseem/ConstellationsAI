import { Grid, Container, Typography, Stack, Alert, Input, AlertTitle, Button, Box, Paper, IconButton } from "@mui/material";
import PanToolRoundedIcon from '@mui/icons-material/PanToolRounded';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ClearIcon from '@mui/icons-material/Clear';
import ACTIONS from "../../setup/Actions.jsx";
import { Stage, Layer, Rect, Transformer, Circle } from "react-konva";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";

 function TestCanvas() {
    
    const stageRef = useRef();
    const [action, setAction] = useState(ACTIONS.select)
    const [rects, setRects] = useState([]);

    const isPainting = useRef();
    const currentId = useRef();

    const isDraggable = action == ACTIONS.SELECT;
    const transformRef = useRef();


    const onPointerDown = () => {  
        console.log("clicked stage!");
        console.log("ACTION: " + action);
        if (action === ACTIONS.SELECT)  {
            return;
        }
        const stage = stageRef.current;
        const {x,y} = stage.getPointerPosition();
        const id = uuidv4();

        currentId.current = id;
        isPainting.current = true;

        switch(action) {
            case ACTIONS.RECTANGLE:
                setRects((rects) => [...rects, {
                    id,
                    x,
                    y,
                    height:20,
                    width:20,
                }]);
                break;
        }
        console.log(rects);
    };

    const onPointerMove = () => {   
        if (action === ACTIONS.SELECT || !isPainting.current)  {
            return;
        }

        const stage = stageRef.current;
        const {x,y} = stage.getPointerPosition();

        switch(action) {
            case ACTIONS.RECTANGLE:
                setRects((rects) => rects.map((rect) => {
                    if (rect.id === currentId.current) {
                        return {
                            ...rect,
                            width: x - rect.x,
                            height: y -rect.y,
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
        setRects((rects) => rects.map((rect) => {
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
    }

    const resizeShape = (e) => {
        if (action !== ACTIONS.SELECT) {
            return;
        }
        const shape = e.currentTarget;
        transformRef.current.nodes([shape]);
    }

    const clearStage = () => {
        setRects([]);
    }

    return (
        <Box>
            <Stage 
            ref={stageRef}
            width={window.innerWidth}
            height={window.innerHeight}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            style={{background: "#0F1214"}}
            >
                <Layer>
                    <Rect 
                    x={0} 
                    y={0} 
                    height={window.innerHeight} 
                    width={window.innerWidth}
                    id="bg"
                    onClick={() => { transformRef.current.nodes([]) }}
                    />
                    
                    {rects.map((rect) => {
                        console.log(rect.id)
                        return (
                        <Rect 
                        key={rect.id}
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
                        )
                    })}
                    <Transformer 
                    ref={transformRef}
                    ignoreStroke={true}
                    >
                        <Circle 
                        radius={8}
                        fill={"#FF0000"}
                        onClick={console.log("delete clicked!")}
                        />
                    </Transformer>
                </Layer>
            </Stage>
            <Box
            width={window.innerWidth}>
                <IconButton
                color={"error"}
                onClick={clearStage}
                >
                    <ClearIcon />
                </IconButton>
                <IconButton 
                color={action === ACTIONS.SELECT ? 'primary':'default'}
                onClick={() => setAction(ACTIONS.SELECT)}
                >
                    <PanToolRoundedIcon />
                </IconButton>
                <IconButton
                color={action === ACTIONS.RECTANGLE ? 'primary':'default'}
                onClick={() => setAction(ACTIONS.RECTANGLE)}
                >
                    <AccessibilityIcon />
                </IconButton>
            </Box>
        </Box>
        
        )
};

export default TestCanvas;