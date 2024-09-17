import { useState } from 'react';
import { getImageData } from "../../hooks/getImageData";
import Gallery from './Gallery/Gallery.jsx';
import Canvas from './Canvas/Canvas.jsx';
import { Box, Typography } from '@mui/material';

const CLOUD_NAME = "dzvwajhpe"
const UPLOAD_PRESET = "tqyofbbv";
const TEST_URL = 'https://api.cloudinary.com/v1_1/' + CLOUD_NAME + "/image/upload";
const ENDPOINT = import.meta.env.VITE_BACKEND_API_URL + "/images/"
const TEST_IMG = 'https://res.cloudinary.com/dzvwajhpe/image/upload/v1725066092/aswhwi3sbmezvxejqx5m.jpg';

const imageData = await getImageData(ENDPOINT);
console.log("IMAGE DATA: ");
console.log(imageData);
const boxes = {};

// creating entries for each image in dataset:
imageData.forEach(image => {
    boxes[image.position] = [];
})
console.log("Box 1 Position: " + boxes[0]);
console.log(boxes);

function Annotator() {
    const [currBox, setCurrBox] = useState(0);
    const [currImg, setCurrImg] = useState(TEST_IMG);
    const [rects, setRects] = useState(boxes[0]);
    console.log("First Image is " + currImg);

    return (
    <div style={{display: 'flex'}}>
        <Gallery currBox={currBox} setCurrBox={setCurrBox} boxes={boxes} imageData={imageData} rects={rects} setRects={setRects} currImg={currImg} setCurrImg={setCurrImg} />;
        <Canvas currBox={currBox} boxes={boxes} rects={rects} setRects={setRects} currImg={currImg} />;
    </div>
    )
}

export default Annotator;