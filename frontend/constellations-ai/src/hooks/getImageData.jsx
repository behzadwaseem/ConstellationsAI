import Axios from "axios";
import { useState } from "react";

export const getImageData = async(endpoint) => {
    try {
        const response = await Axios.get(endpoint)
        console.log(response)
        const { data } = response
        return data
    } catch (error) {
        console.log("Error while fetching image data from db.")
    }
}