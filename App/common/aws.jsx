import axios from "axios";
import {server} from '@/server'


export const uploadImage = async (img) => {
    let imgUrl = null;
    await axios.get(`${server}/get-upload-url`)
      .then(async ({ data: { uploadURL } }) => {
        await axios({
          method: "PUT",
          url: uploadURL,
          headers: { 'Content-Type': 'multipart/form-data' },
          data: img
        })
          .then(() => {
            imgUrl = uploadURL.split("?")[0];
          });
      });
    return imgUrl;
  };

