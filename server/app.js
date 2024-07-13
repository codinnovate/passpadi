import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import User from './Schema/User.js';
import { nanoid } from 'nanoid';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccountKey from './passpadi.json' assert { type: "json" };
import { getAuth } from 'firebase-admin/auth';
import Blog from './Schema/Blog.js';
import Notification from './Schema/Notification.js';
import { verifyJWT } from './middlewares/VerifyJwt.js';
import { generateUploadURL,formatDatatoSend, generateUsername,generateSlug ,    s3 } from './utils/generates.js';
import { uploadUrl } from './controllers/uploads.js';
import { userRouter } from './routes/User.js';
import { commentRouter } from './routes/Comment.js';
import { productRouter } from './routes/Product.js';
import { paymentRouter } from './routes/Payments.js'
import subjectRoutes  from './routes/Subject.js';
import schoolRoutes  from './routes/School.js';
import  questionRoutes from './routes/Question.js';
import { Post } from './Schema/Post.js';
import PostRouter from './routes/Post.js';


admin.initializeApp({
    credential:admin.credential.cert(serviceAccountKey)
})
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
const app = express();
const PORT = 3000;
// let corsOptions = {
//     origin: ['https://passpadi-e8xj.vercel.app',
//         'https://passpadi.com',
//         'http://locahost:5173',
//         'https://passpadi.com.ng'],
//   optionsSuccessStatus: 200 
// }
mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true,
})
app.use(cors());
app.use(express.json());
app.use("", [userRouter, commentRouter, productRouter, PostRouter])
app.use("/transactions", paymentRouter)
app.use('/questions', questionRoutes);
app.use('/subjects', subjectRoutes);
app.use('/schools', schoolRoutes);
app.get('/get-upload-url', uploadUrl);
// app.use("",)

app.post("/latest-blogs", (req, res) => {

    let { page } = req.body;

    let maxLimit = 5;
    Blog.find({ draft: false })
        .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id   ")
        .sort({ "publishedAt": -1 })
        .select("blog_id title des banner activity tags publishedAt -_id ")
        .skip((page - 1) * maxLimit )
        .limit(maxLimit)
        .then(blogs => {
            return res.status(200).json({blogs})
        })
        .catch(err => {
            return res.status(500).json({error: err.message})
        }
        )

})

app.post("/all-latest-blogs-count", (req, res) => {
    Blog.countDocuments({ draft: false })
        .then(count => {
        return res.status(200).json({ totalDocs:count })
        })
        .catch(err => {
            console.log(err.message)
            return res.status(500).json({error:err.message})
        })
    
    
})


app.post("/search-blogs", (req, res) => {
    let { tag, page, query, author, limit, eliminate_blog } = req.body;
    let findQuery;
    if (tag) {
        findQuery = { tags: tag, draft: false, blog_id:{$ne: eliminate_blog}}
    } else if (query) {
        findQuery = { draft:false, title: new RegExp(query, "i") } 
    } else if (author) {
        findQuery = { author, draft:false }
    }
    let maxLimit = limit ? limit : 2 ;

    Blog.find(findQuery)
        .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id   ")
        .sort({ "publishedAt": -1 })
        .select("blog_id title des banner activity tags publishedAt -_id ")
        .skip((page - 1) * maxLimit )
        .limit(maxLimit)
        .then(blogs => {
            return res.status(200).json({blogs})
        })
        .catch(err => {
            return res.status(500).json({error: err.message})
        }
    )

})
app.get('/trending-blogs', (req, res) => {
    Blog.find({ draft: false })
        .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id   ")
        .sort({ "activity.total_read": -1, "activity.total_likes": -1, "publishedAt": -1 })
        .select("blog_id title publishedAt -_id")
        .limit(5)
        .then(blogs => {
            return res.status(200).json({blogs})
        })
        .catch(err => {
            return res.status(500).json({error:err.message})
        })
    


})


app.post("/search-blogs-count", (req, res) => {
    let { tag, query, author } = req.body;
    let findQuery;
    if (tag) {
        findQuery = { tags: tag, draft: false }
    } else if (query) {
        findQuery = { draft:false, title: new RegExp(query, "i") } 
    } else if (author) {
        findQuery = { author, draft:false }
    }
    
    Blog.countDocuments(findQuery)
        .then(count => {
            return res.status(200).json({ totalDocs: count })
        })
        .catch(err => {
            return res.status(500).json({ error: err.message })
        })
    
});







app.post("/search-users", (req, res) => {

    let { query } = req.body;

    User.find({ "personal_info.username": new RegExp(query, 'i') })
    .limit(50)
    .select("personal_info.fullname personal_info.username profile_info.profile_img -_id")
    .then(users => {
            return res.status(200).json({ users })
        })
        .catch(err => {
            return res.status(500).json({ error: err.message })
        })
})


app.post("/get-profile", (req, res) => {
    let { username } = req.body;
    User.findOne({ "personal_info.username": username })
    .select("-personal_info.password -google_auth -updatedAt -blogs")
        .then(user => {
        return res.status(200).json(user)
        console.log(user)
        })
        .catch(err => {
        return res.status(500).json({error:err.message})
    })
})




app.post("/create-blog", verifyJWT ,  (req, res) => {
    let authorId = req.user;
    
    let { title, banner, content, tags, des, draft, id } = req.body;
    if (!title.length) {
        return res.status(403).json({error:"You must provide a title !!"})
    }
    if (!draft) {
        if (!des.length || des.length > 200) {
            return res.status(403).json({error:"You must provude blog description under 200 characters"})
        }
        if (!banner.length) {
            return res.status(403).json({error:"You must add a banner to publish"})
        }
        if (!content.blocks.length){
            return res.status(403).json({error:"There must be some blog content to publish it"})
        }
        if (!tags.length || tags.length > 10) {
            return res.status(403).json({error: "Provide tags in order to publish the blog, Maximum 10"})
        }
    }
    tags = tags.map(tag => tag.toLowerCase());
    // replaces dashes in title with "-"
    let blog_id = id || generateSlug(title)
    if (id) {

        Blog.findOneAndUpdate({ blog_id }, { title, des, banner, content, tags, draft: draft? draft : false })
            .then(() => {
            return res.status(200).json({id: blog_id})
            })
            .catch(err => {
             return res.status(500).json({error: err.message})
         })
        
        
    } else {
        let blog = new Blog({
            title, des, banner, content, tags, author: authorId, blog_id, draft: Boolean(draft)
        });


        blog.save().then(blog => {
            let incrementVal = draft ? 0 : 1;
            User.findOneAndUpdate(
                { _id: authorId },
                { $inc: { "account_info.total_posts": incrementVal }, $push: { "blogs": blog._id } })
                .then(user => {
                    return res.status(200).json({ id: blog.blog_id })
                })
                .catch(err => {
                    return res.status(500).json({ error: "Failed to update total posts number" })
                })
        })
            .catch(err => {
                return res.status(500).json({ error: err.message })
            })
        return res.json({ "status": "done" })
    }
})

app.post("/get-blog", (req, res) => {
    let { blog_id, draft, mode } = req.body;
    let incrementVal =  mode != "edit" ? 1: 0 ;
    Blog.findOneAndUpdate({ blog_id }, { $inc: { "activity.total_reads": incrementVal } })
        .populate("author", "personal_info.fullname personal_info.username personal_info.profile_img ")
        .select("title des content banner activity publishedAt blog_id tags")
        .then(blog => {
            User.findOneAndUpdate({ "personal_info.username": blog.author.personal_info.username }, {
                $inc:{"account_info.total_reads":incrementVal}
            })
            .catch(err => {
                return res.status(500).json({ error:err.message})
            })

            if (blog.draft && !draft) {
                return res.status(500).json({error:"you can not access draft blog"})
            }

            return res.status(200).json({ blog });

        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        })
})
 
app.post("/like-blog", verifyJWT, (req, res) => {
    let user_id = req.user;
    let { _id, isLikedByUser } = req.body;
    let incrementVal = !isLikedByUser? 1 : -1 ;
    Blog.findOneAndUpdate({ _id }, { $inc: { "activity.total_likes": incrementVal } })
        .then(blog => {
            if (!isLikedByUser) {
                let like = new Notification({
                    type: "like",
                    blog: _id,
                    notification_for: blog.author,
                    user: user_id,
                })
                like.save().then(notification => {
                    return res.status(200).json({liked_by_user:true})
            }); 
                
            } else {
                Notification.findOneAndDelete({ user: user_id, blog: _id, type: "like" })
                    .then(data => {
                        return res.status(200).json({ liked_by_user:false })
                    })
                    .catch(err => {
                        return res.status(500).json({ error:err.message })
                    })
        }
    })


})

app.post("/isliked-by-user", verifyJWT, (req, res) => {
    let user_id = req.user;
    let { _id } = req.body;
    Notification.exists({ user: user_id, type: "like", blog: _id })
        .then(result => {
        return res.status(200).json({result})
        })
        .catch(err => {
            return res.status(500).json({error:err.message})
        })

})


// new code starts here


//endpoint to access all the users except the logged in the user
app.get("/user/:userId", (req, res) => {
    try {
      const loggedInUserId = req.params.userId;
  
      User.find({ _id: { $ne: loggedInUserId } })
        .then((users) => {
          res.status(200).json(users);
        })
        .catch((error) => {
          console.log("Error: ", error);
          res.status(500).json("errror");
        });
    } catch (error) {
      res.status(500).json({ message: "error getting the users" });
    }
  });
// get only me
  app.get("/me/:userId", (req, res) => {
    try {
      const loggedInUserId = req.params.userId;
      User.findById(loggedInUserId)
        .then((user) => {
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ message: "User not found" });
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
          res.status(500).json({ message: "Error fetching the user" });
        });
    } catch (error) {
      res.status(500).json({ message: "Error getting the user" });
    }
  });
  
  //endpoint to follow a particular user
  app.post("/follow", async (req, res) => {
    const { currentUserId, selectedUserId } = req.body;
  
    try {
      await User.findByIdAndUpdate(selectedUserId, {
        $push: { followers: currentUserId },
      });
  
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error in following a user" });
    }
  });
  
  //endpoint to unfollow a user
  app.post("/users/unfollow", async (req, res) => {
    const { loggedInUserId, targetUserId } = req.body;
  
    try {
      await User.findByIdAndUpdate(targetUserId, {
        $pull: { followers: loggedInUserId },
      });
  
      res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error unfollowing user" });
    }
  });
  

  app.put('/reply/:postId/', verifyJWT,  async (req, res) => {
    try {
      const { postId } = req.params;
      const { content, image } = req.body;
      const userId = req.user;
  
      if (!content && !image) {
        return res.status(500).json({ message: "Please either write something or upload an image" });
      }
  
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      const newReply = {
        user: userId,
        content,
        image,
        createdAt: new Date(),
      };
  
      post.replies.push(newReply);
      await post.save();
  
      res.status(201).json(post);
    } catch (error) {
      console.error("Error adding reply: ", error);
      res.status(500).json({ message: "Error adding reply" });
    }
  });

  
  //endpoint for liking a particular post
  app.put("/like-post", verifyJWT, async (req, res) => {
    const {postId} = req.body;
    const userId = req.user; // Assuming you have a way to get the logged-in user's ID
  
    try {
      const post = await Post.findById({_id:postId}).populate("user", "name");
  
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } }, // Add user's ID to the likes array
        { new: true } // To return the updated post
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      updatedPost.user = post.user;
  
      res.json(updatedPost);
    } catch (error) {
      console.error("Error liking post:", error);
      res
        .status(500)
        .json({ message: "An error occurred while liking the post" });
    }
  });
  
  //endpoint to unlike a post
  app.put("/unlike-post", verifyJWT, async (req, res) => {
    const {postId} = req.body;
    const userId = req.user;
  
    try {
      const post = await Post.findById({_id:postId}).populate("user", "name");
  
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
      );
  
      updatedPost.user = post.user;
  
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.json(updatedPost);
    } catch (error) {
      console.error("Error unliking post:", error);
      res
        .status(500)
        .json({ message: "An error occurred while unliking the post" });
    }
  });
  
  app.get("/get-posts",  async (req, res) => {
    try {
      // Fetch all posts and populate user info
      let posts = await Post.find()
        .populate("user", "personal_info.profile_img personal_info.username personal_info.fullname")
        .populate("replies") // Assuming you have a replies field in your Post schema
        .sort({ createdAt: -1 });
  
      // Separate unanswered and answered posts
      let unansweredPosts = posts.filter(post => !post.replies || post.replies.length === 0);
      let answeredPosts = posts.filter(post => post.replies && post.replies.length > 0);
  
      // Shuffle both arrays to add randomness
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };
  
      shuffleArray(unansweredPosts);
      shuffleArray(answeredPosts);
  
      // Combine arrays, prioritizing unanswered posts
      posts = [...unansweredPosts, ...answeredPosts];
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while getting the posts" });
      console.error(error);
    }
  });

  app.get("/post/:postId", async (req, res) => {
    const postId = req.params.postId;
    console.log(postId)

    try {
        const post = await Post.findById(postId)
        .populate("user", "personal_info.profile_img personal_info.username personal_info.fullname")
        .sort({ createdAt: -1 });
        res.status(200).json(post);
        console.log(post)
      } catch (error) {
        res.status(500)
          .json({ message: "An error occurred while getting the posts" })
          console.log(error)
      }
  })
  
  app.get("/profile/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error while getting the profile" });
    }
  });
  



















// Ends Here












app.listen(PORT, () => {
    console.log("listening on port -> http://localhost:" + PORT)
})

// setInterval(() => {
//   console.log('running...');
// }, 3000); 