import { Post } from "../Schema/Post.js";

export const CreatePost = async (req, res) => {
  try {
    let userId = req.user;
    const { content, image } = req.body;

    if (!content && !image) {
      return res.status(400).json({ message: "Please either write something or upload an image" });
    }

    // Check for duplicate post
    const existingPost = await Post.findOne({
      user: userId,
      content: content || null,
      image: image || null,
    });

    if (existingPost) {
      return res.status(409).json({ message: "Sorry but you already posted that!!" });
    }

    const newPostData = {
      user: userId,
    };

    if (content) {
      newPostData.content = content;
    }
    if (image) {
      newPostData.image = image;
    }

    const newPost = new Post(newPostData);
    const savedPost = await newPost.save();
    console.log(savedPost);
    res.status(200).json({ message: "Post saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Post creation failed" });
    console.log(error);
  }
};




export const DeletePost = async (req, res) => {
  try {
    const userId = req.user;
    const { postId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "You do not have permission to delete this post" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Post deletion failed" });
    console.error(error);
  }
};

export const EditPost = async (req, res) => {
  try {
    const userId = req.user;
    const { postId, content, image } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "You do not have permission to edit this post" });
    }

    if (content) {
      post.content = content;
    }
    if (image) {
      post.image = image;
    }

    await post.save();
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Post update failed" });
    console.error(error);
  }
};
