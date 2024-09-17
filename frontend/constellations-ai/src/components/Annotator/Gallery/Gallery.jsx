import { Grid, Container, Typography, Stack, Alert, Input, AlertTitle, Button, Box, Paper } from "@mui/material";
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import CollectionsIcon from '@mui/icons-material/Collections';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from "react";
import { uploadToCloudinary } from "../../../hooks/uploadToCloudinary";
import { getImageData } from "../../../hooks/getImageData";
import { postImageData } from "../../../hooks/postImageData";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const CLOUD_NAME = "dzvwajhpe"
const UPLOAD_PRESET = "tqyofbbv";
const TEST_URL = 'https://api.cloudinary.com/v1_1/' + CLOUD_NAME + "/image/upload";
const ENDPOINT = import.meta.env.VITE_BACKEND_API_URL + "/images/"
const TEST_IMG = 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

// const imageData = await getImageData(ENDPOINT);
// console.log(imageData);


function Gallery({ currBox, setCurrBox, boxes, imageData, rects, setRects, currImg, setCurrImg }) {
    
    const changeImage = (id, position) => {
        // Save rectangles from current image:
        boxes[currBox] = rects;
        console.log(currBox + "Rects: " + rects);

        // Display new image and its respective boxes:
        console.log("Clicked on " + id);
        setCurrImg(imageData[position].image_url)
        setRects(boxes[position]);
        setCurrBox(position);
    }
    {console.log("Gallery image is: " + currImg)}
    
    return (
        <Box sx={{
            height: "100vh",
        }}>
            <Typography variant="h4" color="primary">
                ConstellationsAI
            </Typography>
            <ImageList sx={{ width: 250, height: '100vh', backgroundColor:"#0F1214"}} cols={1} rowHeight={164} gap={2.5}>
            {imageData.map((image) => (
                <ImageListItem key={image.id}>
                    {console.log(image.id)};
                    {console.log(currImg)};
                    <Button onClick={() => changeImage(image.id, image.position)}>
                        <Typography variant="h4" color="primary">
                            {image.position}
                        </Typography>
                        <img
                            srcSet={`${image.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${image.image_url}?w=164&h=164&fit=crop&auto=format`}
                            alt={image.position}
                            loading="lazy"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                maxHeight: '240px',
                                objectFit: 'contain'
                            }}
                        />
                    </Button>
                </ImageListItem>
            ))}
            </ImageList>
        </Box>  
    )
}
export default Gallery;