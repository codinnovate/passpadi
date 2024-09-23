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
          
          *{
              font-family: 'SpaceGM', sans-serif;
              font-size: 40px;
              font-weight: 500;
            }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
};