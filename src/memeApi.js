import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

export const getMeme = async (category) => {
  const options = {
    method: "GET",
    url: "https://humor-jokes-and-memes.p.rapidapi.com/memes/random",
    params: {
      "api-key": apiKey,
      number: "1",
      "media-type": "image",
      keywords: category,
    },
    headers: {
      "x-rapidapi-host": "humor-jokes-and-memes.p.rapidapi.com",
      "x-rapidapi-key": "2d0c90cf07msh712f73113dfbd9bp188812jsna5a2ff4e92d3",
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      const meme = response.data;
      console.log(meme);
      return meme;
    })
    .catch(function (error) {
      console.error(error);
    });
};
