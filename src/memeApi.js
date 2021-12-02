import axios, { AxiosRequestConfig } from "axios";
import { Meme } from "./api-types";
import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

const getMeme = (category: string) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "https://humor-jokes-and-memes.p.rapidapi.com/memes/search",
    params: {
      "api-key": apiKey,
      number: "1",
      "min-rating": "0",
      "keywords-in-image": "true",
      "media-type": "image",
      keywords: category,
    },
    headers: {
      "x-rapidapi-host": "humor-jokes-and-memes.p.rapidapi.com",
      "x-rapidapi-key": "2d0c90cf07msh712f73113dfbd9bp188812jsna5a2ff4e92d3",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const meme: Meme = response.data;
      console.log(meme);
      console.log(response.data);
      return meme;
    })
    .catch(function (error) {
      console.error(error);
    });
};

console.log(getMeme("test"));
