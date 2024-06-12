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
import  questionRoutes from './routes/Question.js';


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
app.use("", [userRouter, commentRouter, productRouter])
app.use("/transactions", paymentRouter)
app.use('/api/questions', questionRoutes);
app.use('/api/subjects', subjectRoutes);
app.get('/get-upload-url', uploadUrl)
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















app.listen(PORT, () => {
    console.log("listening on port -> http://localhost:" + PORT)
})

setInterval(() => {
  console.log('Server is still running...');
}, 3000); 