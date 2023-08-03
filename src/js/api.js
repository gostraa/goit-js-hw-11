
import axios from 'axios';
import { page } from "../index"


export async function fetchInPixabayApi(searchQuery) {
    const BASE_URL = "https://pixabay.com/api/";

    const options = {
        params: {
            key: "38624771-4bb2a2a9e8131c947dfc92afa",
            q: searchQuery,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 40,
            page: page,
        },
    };
     try {
         const response = await axios.get(BASE_URL, options);
  
    return response.data;
  } catch (error) {
    console.error(error);
  }
}