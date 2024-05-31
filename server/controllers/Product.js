import Product from "../Schema/Product.js";
import User from "../Schema/User.js";
import { generateSlug } from "../utils/generates.js";



export const addProduct = (req, res) => {
    let sellerId = req.user;
    let { title, banner, des, categories, price, draft , id} = req.body;
    if (!title.length) {
            return res.status(403).json({error:"You must provide a title !!"})
    }
    if (!draft) {
        if (!des.length || des.length > 200) {
            return res.status(403).json({error:"You must provude Product description under 200 characters"})
        }
        if (!banner.length) {
            return res.status(403).json({error:"You must add a banner to publish"})
        }
        if (!price.length){
            return res.status(403).json({error:"There must be some Product content to publish it"})
        }
        if (!categories.length || categories.length > 10) {
            return res.status(403).json({error: "Provide categories in order to publish the Product, Maximum 10"})
        }
    }
    categories = categories.map(cat => cat.toLowerCase());
    let product_id = id || generateSlug(title)
    if (id) {

        Product.findOneAndUpdate({ product_id }, { title, des, banner, price, categories, draft: draft ? draft : false })
            .then(() => {
                return res.status(200).json({ id: product_id })
            })
            .catch(err => {
                return res.status(500).json({ error: err.message })
            })
        
    } else {
        let product = new Product({
            title, des, banner, content, tags, author: authorId, product_id, draft: Boolean(draft)
        });
        product.save().then(product => {
            let incrementVal = draft ? 0 : 1;
            User.findOneAndUpdate(
                { _id: authorId },
                { $inc: { "account_info.total_products": incrementVal }, $push: { "products": product._id } })
                .then(user => {
                    return res.status(200).json({ id: product.product_id })
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


export const getProduct = (req, res) => {
    let { product_id, draft, mode } = req.body;
    let incrementVal =  mode != "edit" ? 1: 0 ;
    Product.findOneAndUpdate({ product_id },
        {
            $inc: { "activity.total_views": incrementVal }
        })
        .populate("seller", "personal_info.fullname personal_info.username personal_info.profile_img ")
        .select("title des content banner activity publishedAt product_id tags")
        .then(product => {
            User.findOneAndUpdate({ "personal_info.username": product.seller.personal_info.username }, {
                $inc:{"account_info.total_reads":incrementVal}
            })
            .catch(err => {
                return res.status(500).json({ error:err.message})
            })

            if (product.draft && !draft) {
                return res.status(500).json({error:"you can not access draft product"})
            }

            return res.status(200).json({ product });

        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        })
}