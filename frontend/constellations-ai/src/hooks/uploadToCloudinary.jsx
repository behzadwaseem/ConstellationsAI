import Axios from "axios";
import { useState } from "react";


export const uploadToCloudinary = async (file, preset, endpoint, position) => {

    console.log(file)
    console.log(preset)
    console.log(endpoint)
    console.log(position)
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", preset);
    imageData.append("position", position)
    const { data }  = await Axios.post(endpoint, imageData)
    console.log("TEST LOG " + data)
    return { publicId: data?.public_id, imageURL: data?.secure_url, position:position}
    // try {
    //     await Axios.post(endpoint, data
    //     ).then((response) => {
    //         console.log(response)
    //         return (response)
    //     })
    // } catch (error) {
    //     console.error("error uploading image")
    // }
    // return (null)
}