import Blog from "../Schema/Blog.js";
import { generateSlug } from "../utils/generates.js";



export const getPost = async (req, res) => {
    let { blog_id } = req.body;
    Blog.findOne({ blog_id }, { $inc: { "activity.total_reads": incrementVal } })
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
}
export const latestPost = async (req, res) => {

    try {
        let {page} = req.body;
        let maxLimit = 30;
   
        
        let post = await Blog
        .find({ draft: false })
        .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id   ")
        .sort({ "publishedAt": -1 })
        .select("blog_id title des banner activity tags publishedAt -_id ")
        .skip((page - 1) * maxLimit )
        .limit(maxLimit)
        res.status(200).json(post)
    } catch (error) {
        return res.status(500).json("Server Error")
        console.error(error)

    }
    // let { page } = req.body;
    // 
        // .then(blogs => {
          // })
          
        // res.status(200).json(post)
        //  console.log(post)
        // .catch(err => {
        // }
        // )

}
export const searchPost = async (req, res) => {
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
  
}

export const trendingPost = async (req, res) => {
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
}

export const countPost = async (req, res) => {
    let { tag, query, author } = req.body;
    let findQuery;
    if (tag) {
        findQuery = { tags: tag, draft: false }
    } else if (query) {
        findQuery = { draft:false, title: new RegExp(query, "i") } 
    } else if (author) {
        findQuery = { author, draft:false }
    }
}

export const draftPost = async (req, res) => {
    Blog.find({ draft: true })
    .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id   ")
    .select("blog_id title publishedAt -_id")
    .then(blogs => {
        return res.status(200).json({blogs})
    })
    .catch(err => {
        return res.status(500).json({error:err.message})
    })
}


export const getArticlesByTag = async (req, res) => {
    const { tagId } = req.params;
    
    try {
        const articles = await Blog.find({ tags: tagId }).populate('author', 'name').exec();
        
        if (!articles || articles.length === 0) {
            return res.status(404).json({ message: 'No articles found for this tag.' });
        }
        
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching articles." });
    }
};




export const createBlog = async (req, res) => {
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

}