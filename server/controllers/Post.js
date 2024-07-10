import { Post } from "../Schema/Post.js";

export const CreatePost = async (req,res) => {
    try {
    let userId = req.user;
    const {content, image} = req.body;


    const newPostData = {
        user: userId,
      };
    
      if (content) {
        newPostData.content = content;
      }
      if (image) {
        newPostData.image = image;
      }

      if(!image || !content){
        return res.status(500).json({message:"Please Either Write something or Upload an Image"})
      }
  
      const newPost = new Post(newPostData);
      const savedPost = await newPost.save();
      console.log(savedPost)
      res.status(200).json({ message: "Post saved successfully" });
    } catch (error) {
      res.status(500).json({ message: "post creation failed" });
      console.log(error)
    }

}