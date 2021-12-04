import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

const getMeme = (category) => {
  const options = {
    method: "GET",
    url: "https://humor-jokes-and-memes.p.rapidapi.com/memes/random",
    params: {
      "api-key": apiKey,
      number: "3",
      "min-rating": "0",
      "keywords-in-image": "false",
      "media-type": "image",
      keywords: "cat",
    },
    headers: {
      "x-rapidapi-host": "humor-jokes-and-memes.p.rapidapi.com",
      "x-rapidapi-key": "2d0c90cf07msh712f73113dfbd9bp188812jsna5a2ff4e92d3",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const meme = response.data;
      console.log(meme);
      console.log(response.data);
      return meme;
    })
    .catch(function (error) {
      console.error(error);
    });
};

console.log(getMeme("test"));
