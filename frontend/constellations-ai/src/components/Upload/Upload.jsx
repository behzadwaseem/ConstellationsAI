import { Grid, Container, Typography, Stack, Alert, Input, AlertTitle, Button, Box, Paper } from "@mui/material";
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import CollectionsIcon from '@mui/icons-material/Collections';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from "react";
import { uploadToCloudinary } from "../../hooks/uploadToCloudinary";
import { getImageData } from "../../hooks/getImageData";
import { postImageData } from "../../hooks/postImageData";

const CLOUD_NAME = "dzvwajhpe"
const UPLOAD_PRESET = "tqyofbbv";
const TEST_URL = 'https://api.cloudinary.com/v1_1/' + CLOUD_NAME + "/image/upload";
const ENDPOINT = import.meta.env.VITE_BACKEND_API_URL + "/images/"
console.log("Test URL:" + TEST_URL);
console.log(import.meta.env.VITE_BACKEND_API_URL);

console.log(ENDPOINT)
const res = await getImageData(ENDPOINT);
console.log(res);

function Upload() {
    const [files, setFiles] = useState(null);
    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(null)

    const renderFiles = () => (
        <ol>
        {[...files].map((file, i) => (
            <li key={i}>{file.name} - {file.type}</li>
        ))}
        </ol>)


    // const handleStartUpload = async (e) => {
    //     e.preventDefault()
    //     console.log('Starting Upload Process')
    //     console.log(files)
    //     if (files.length) {
    //         console.log("begin uploading files");
    //         [...files].forEach((file, i) => {
    //             try{
    //                 uploadToCloudinary(file, UPLOAD_PRESET, TEST_URL, i)
    //                 .then((response) => {
    //                     console.log(response)
    //                     const position = response.position;
    //                     const id = response.publicId;
    //                     const url = response.imageURL;
    //                     console.log("Frame #: " + position);
    //                     console.log("id " + id);
    //                     console.log("url " + url);
    //                     const save = await postImageData(endpoint, position, id, url)
    //                 })
    //         } catch (error) {
    //                 console.error("Error uploading images.");
    //             }
    //         });
    //         console.log('files uploaded!')
    //     }
    // }

    const handleStartUpload = async (e) => {
        e.preventDefault();
        console.log('Starting Upload Process');
        console.log(files);
      
        if (files.length) {
          console.log("begin uploading files");
          setLoading(true);
          for (const [i, file] of [...files].entries()) {
            try {
              const response = await uploadToCloudinary(file, UPLOAD_PRESET, TEST_URL, i);
              console.log(response);
      
              const position = response.position;
              const id = response.publicId;
              const url = response.imageURL;
      
              console.log("Frame #: " + position);
              console.log("id: " + id);
              console.log("url: " + url);
      
              // Post this information to the backend DB:
              const save = await postImageData(ENDPOINT,position, id, url);
              console.log('Image data saved:', save);
            } catch (error) {
              console.error("Error uploading images:", error);
            }
          }
          setLoading(false);
          console.log('Files uploaded!');
        }
      };
      

    return (
        <Grid
            container 
            direction="column"
            alignItems="center"
            justify="center"
        >
        <Paper elevation={10} border="1px grey">
            <Grid 
                container
                direction="column"
            sx={{ bgcolor:'black', border:"2px primary"}}
            >
                <Grid item display="flex" justifyContent={"left"}>
                    <Typography variant="h4" color="primary">
                        ConstellationsAI
                    </Typography>
                </Grid>

                <Grid item display="flex" justifyContent={"left"}>
                    <Alert severity="info" color="warning">
                        <AlertTitle>Welcome to ConstellationsAI!</AlertTitle>
                        <Typography>
                            To get started, upload the images that you would like to annotate.
                            Once you begin annoating, make sure to export the annotations before exiting the application.
                        </Typography>
                    </Alert>
                </Grid>

                <Grid item display="flex" justifyContent={"left"}>
                    <Stack alignItems="center" direction="row" gap={1}>
                        <CollectionsIcon />
                        <Typography 
                            variant="h6"
                            sx={{ fontWeight: 'bold' }}>
                                Upload Images to Annotate
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item display="flex" justifyContent={"center"}>
                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<UploadFileIcon />}
                    >Image Upload
                        <input type="file" multiple accept="image/*" onChange={(e) => {setFiles(e.target.files)}}/>
                        {files && renderFiles()}
                    </Button>
                </Grid>

                <Grid item display="flex" justifyContent={"left"}>
                    <Stack alignItems="center" direction="row" gap={1}>
                        <DirectionsWalkIcon />
                        <Typography 
                            variant="h6"
                            sx={{ fontWeight: 'bold' }}
                            >
                            Import Annotations
                        </Typography>
                    </Stack>
                </Grid>

                <Grid item display="flex" justifyContent={"right"}>
                    <Button variant="outlined" color="primary" onClick={handleStartUpload}>Start</Button>
                </Grid>
                <Grid item display="flex" justifyContent={"center"}>
                    {loading && <CircularProgress />}
                </Grid>

            </Grid>
        </Paper>
      </Grid>
    )
}

export default Upload;