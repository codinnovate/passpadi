import Blog from '../Schema/Blog.js';
import Comment from '../Schema/Comment.js'
import Notification from '../Schema/Notification.js';


export const addComment = (req, res) => {
    let user_id = req.user;
    let { _id, comment, replying_to, blog_author } = req.body;
    if (!comment.length) {
        return res.status(200).json({error:"Write something to leave a comment "})
    }
    // creating a new comment doctors

    let commentObj = new Comment({
            blog_id: _id,
            blog_author,
            comment,
            commented_by:user_id,
    })
    commentObj.save().then(commentFile => {
        let { comment, commentedAt, children } = commentFile;
        Blog.findOneAndUpdate(
            { _id },
            {
                $push: { "comments": commentFile._id },
                $inc: { "activity.total_comments": 1 },
                "activity.total_parent_comments": 1
            }
        )
            .then(blog => {
                console.log("New comment created!")
            });
        let notificationObj = {
            type: "comment",
            blog: _id,
            notification_for: blog_author,
            user: user_id,
            comment:commentFile._id
        }
        new Notification(notificationObj).save().then(notification => console.log('New notification created'))
        return res.status(200).json({
            comment, commentedAt, _id:commentFile._id, user_id, children
        })
    })

}



export const getComment = (req, res) => { 
    let { blog_id, skip } = req.body;
    let maxLimit = 5;
    Comment.find({ blog_id, isReply: false })
        .populate("commented_by", "personal_info.username personal_info.fullname, personal_info.profile_img")
        .skip(skip)
        .limit(maxLimit)
        .sort({
            'commentedAt':-1
        })
        .then(comment => {
            return res.status(200).json(comment)

        })
        .catch(err => {
            console.log(err.message);
            return res.status(500).json({error:err.message})
        })
}