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
import { generateSlug} from './utils/generates.js';
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
import nodemailer from 'nodemailer';
import Notifs from './routes/Notifications.js';

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
app.use('/notifications', Notifs);
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
app.get('/drafts', verifyJWT, (req, res) => {
   const userId = req.userId
  Blog.find({ draft: true })
      .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id   ")
      .select("blog_id title publishedAt -_id")
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

        Blog.findOneAndUpdate({ blog_id }, { title, des, banner, content, tags, draft: draft ? draft : false })
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
app.get("/users/", verifyJWT, (req, res) => {
try {
      const loggedInUserId = req.user;
      User.find({ _id: { $ne: loggedInUserId } })
      .select("-personal_info.password -google_auth -updatedAt -blogs")
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
  // remove soon ensure it's not in apps
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
  
  app.put('/reply/:postId/:replyId', verifyJWT, async (req, res) => {
    try {
      const { postId, replyId } = req.params;
      const { content, image } = req.body;
      const userId = req.user;
  
      if (!content && !image) {
        return res.status(400).json({ message: "Please provide content or an image to update" });
      }
  
      // Find the post by postId
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Find the reply to ensure it exists and belongs to the user (optional, for security)
      const reply = post.replies.id(replyId);
      if (!reply) {
        return res.status(404).json({ message: "Reply not found" });
      }
  
      if (reply.user.toString() !== userId) {
        console.log(reply.user.toString())
        console.log(userId)
        return res.status(403).json({ message: "You are not authorized to edit this reply" });
      }
  
      // Update the reply fields
      if (content) {
        reply.content = content;
      }
      if (image) {
        reply.image = image;
      }
  
      // Save the post after modification
      await post.save();
  
      res.status(200).json({ message: "Reply updated successfully", post });
    } catch (error) {
      console.error("Error updating reply: ", error);
      res.status(500).json({ message: "Error updating reply" });
    }
  });
  
  // create reply
  app.put('/reply/:postId/', verifyJWT, async (req, res) => {
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
      if(post.user != userId){

      // Create a notification
      const notification = new Notification({
        postId,
        user: post.user,
        message: `${content || 'Its an Image reply though'}`,
      });
      await notification.save();
      
      // Send email
      const receiver = await User.findById(post.user);
      if (receiver && receiver.personal_info.email) {
        console.log('Got here too')
        const transporter = nodemailer.createTransport({
          host:'smtp.gmail.com',
          port:465,
          secure:true,
          service:'gmail',
          auth: {
            user:"passpadi.com@gmail.com", // Replace with your email
            pass:"xbcxgpugziggvcza", // Replace with your email password
          },
        });
        console.log('Got here 5')

        const mailOptions = {
          from: 'Passpadi Team',
          to: receiver.personal_info.email,
          subject: `New Reply to Your Post on Passpadi `,
          html:`<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<section class="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
    <header>
        <a href="#">
            <img width="100px"  src="https://www.passpadi.com/assets/logo-0589d0c9.png" alt="">
        </a>
    </header>

    <main class="mt-8">
        <h2 class="mt-6 text-gray-700 dark:text-gray-200">Hi ${receiver.personal_info.fullname},</h2>

        <p class="mt-2 leading-loose text-gray-600 dark:text-gray-300">
            <h1>You have a new reply from   ${user.personal_info.fullname}, @${user.personal_info.username}</h1>
            
            ${content || `<img  alt='image' src={image} />`
            } https://passpadi.com/post/${postId}
        </p>
        <p class="mt-2 text-gray-600 dark:text-gray-300">
            Thanks, <br>
            Passpadi Team
        </p>
    </main>
    

    <footer class="mt-8 text-center">
        <h3 class="font-medium text-gray-800 dark:text-white">Download the app</h3>
        <p class="mt-2 text-gray-500 dark:text-gray-400">Get the most of Passpadi by installing our new mobile app.</p>

        <div class="mt-6">
            <a href="https://play.google.com/store/apps/details?id=com.kidscantech.App" class="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm overflow-hidden text-white transition-colors duration-300 bg-gray-900 rounded-lg shadow sm:w-auto sm:mx-2 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                <svg class="w-5 h-5 mx-2 fill-current" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve">
                    <g>
                        <g>
                            <path d="M407,0H105C47.103,0,0,47.103,0,105v302c0,57.897,47.103,105,105,105h302c57.897,0,105-47.103,105-105V105C512,47.103,464.897,0,407,0z M482,407c0,41.355-33.645,75-75,75H105c-41.355,0-75-33.645-75-75V105c0-41.355,33.645-75,75-75h302c41.355,0,75,33.645,75,75V407z"></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M305.646,123.531c-1.729-6.45-5.865-11.842-11.648-15.18c-11.936-6.892-27.256-2.789-34.15,9.151L256,124.166l-3.848-6.665c-6.893-11.937-22.212-16.042-34.15-9.151h-0.001c-11.938,6.893-16.042,22.212-9.15,34.151l18.281,31.664L159.678,291H110.5c-13.785,0-25,11.215-25,25c0,13.785,11.215,25,25,25h189.86l-28.868-50h-54.079l85.735-148.498C306.487,136.719,307.375,129.981,305.646,123.531z"></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M401.5,291h-49.178l-55.907-96.834l-28.867,50l86.804,150.348c3.339,5.784,8.729,9.921,15.181,11.65c2.154,0.577,4.339,0.863,6.511,0.863c4.332,0,8.608-1.136,12.461-3.361c11.938-6.893,16.042-22.213,9.149-34.15L381.189,341H401.5c13.785,0,25-11.215,25-25C426.5,302.215,415.285,291,401.5,291z"></path>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M119.264,361l-4.917,8.516c-6.892,11.938-2.787,27.258,9.151,34.15c3.927,2.267,8.219,3.345,12.458,3.344c8.646,0,17.067-4.484,21.693-12.495L176.999,361H119.264z"></path>
                        </g>
                    </g>
                </svg>

                <span class="mx-2">
                    Get it on the App Store
                </span>
            </a>

            <a href="https://play.google.com/store/apps/details?id=com.kidscantech.App" class="inline-flex items-center justify-center w-full px-4 py-2.5 mt-4 text-sm overflow-hidden text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                <svg class="w-5 h-5 mx-2 fill-current" viewBox="-28 0 512 512.00075" xmlns="http://www.w3.org/2000/svg">
                    <path d="m432.320312 215.121094-361.515624-208.722656c-14.777344-8.53125-32.421876-8.53125-47.203126 0-.121093.070312-.230468.148437-.351562.21875-.210938.125-.421875.253906-.628906.390624-14.175782 8.636719-22.621094 23.59375-22.621094 40.269532v417.445312c0 17.066406 8.824219 32.347656 23.601562 40.878906 7.390626 4.265626 15.496094 6.398438 23.601563 6.398438s16.214844-2.132812 23.601563-6.398438l361.519531-208.722656c14.777343-8.53125 23.601562-23.8125 23.601562-40.878906s-8.824219-32.347656-23.605469-40.878906zm-401.941406 253.152344c-.21875-1.097657-.351562-2.273438-.351562-3.550782v-417.445312c0-2.246094.378906-4.203125.984375-5.90625l204.324219 213.121094zm43.824219-425.242188 234.21875 135.226562-52.285156 54.539063zm-6.480469 429.679688 188.410156-196.527344 54.152344 56.484375zm349.585938-201.835938-80.25 46.332031-60.125-62.714843 58.261718-60.773438 82.113282 47.40625c7.75 4.476562 8.589844 11.894531 8.589844 14.875s-.839844 10.398438-8.589844 14.875zm0 0">
                    </path>
                </svg>

                <span class="mx-2">
                    Get it on Google Play
                </span>
            </a>
        </div>

        <p class="mt-6 text-gray-500 dark:text-gray-400">
            This email was sent to <a href="email:passpadi.com@gmail.com" class="text-blue-600 hover:underline dark:text-blue-400" target="_blank">passpadi.com@gmail.com</a>. 
        </p>
        <p class="mt-3 text-gray-500 dark:text-gray-400">© Passpadi Team. All Rights Reserved.</p>
    </footer>
</section>

</body>
</html>`,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error sending email: ', error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
    }
      res.status(201).json(post);
    } catch (error) {
      console.error("Error adding reply: ", error);
      res.status(500).json({ message: "Error adding reply" });
    }
  });

  // delete a reply 
  app.delete('/reply/:postId/:replyId', verifyJWT, async (req, res) => {
    try {
      const { postId, replyId } = req.params;
      const userId = req.user;
  
      // Find the post by postId
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Find the reply to ensure it belongs to the user (optional, for security)
      const reply = post.replies.id(replyId);
      if (!reply) {
        return res.status(404).json({ message: "Reply not found" });
      }
  
      if (reply.user.toString() !== userId) {
        return res.status(403).json({ message: "You are not authorized to delete this reply" });
      }
  
      // Remove the reply from the replies array
      post.replies.pull({ _id: replyId });
  
      // Save the post after modification
      await post.save();
  
      res.status(200).json({ message: "Reply deleted successfully" });
    } catch (error) {
      console.error("Error deleting reply: ", error);
      res.status(500).json({ message: "Error deleting reply" });
    }
  });

  // ends delete a reply
  
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
  
 




















// Ends Here












app.listen(PORT, () => {
    console.log("listening on port -> http://localhost:" + PORT)
})

// setInterval(() => {
//   console.log('running...');
// }, 3000); 