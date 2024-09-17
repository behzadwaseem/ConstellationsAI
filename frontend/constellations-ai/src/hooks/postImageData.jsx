import Axios from "axios";
import { useState } from "react";

export const postImageData = async (endpoint, position, image_id, image_url) => {
    console.log(position)
    console.log(image_id)
    console.log(image_url)
    const imageData = new FormData();
    imageData.append("position", position);
    imageData.append("image_id", image_id);
    imageData.append("image_url", image_url)
    const response  = await Axios.post(endpoint, imageData)
    console.log("POST RESPONSE: " + response)
    const { data } = response
    return data
}