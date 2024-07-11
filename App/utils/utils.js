import axios from "axios"
import { server } from "@/server"

export const getProfile = async ({userId}) => {
    try {
      const response = await axios.get(`${server}/me/${userId}`)
      setUser(response.data.personal_info)
      console.log(response.data.personal_info)
    } catch (error) {
      console.log(error)
    }
}


export   const generateHtmlContent = (content) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css">
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/contrib/auto-render.min.js"></script>
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            renderMathInElement(document.body, {
              delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
              ]
            });
          });
        </script>
        <style>
          body {
            zoom: 3.5; /* Adjust this value to make content larger or smaller */
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
};