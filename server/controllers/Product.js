import Product from "../Schema/Product.js";
import { generateSlug } from "../utils/generates.js";



export const addProduct = async (req, res) => {
    let sellerId = req.user;
    let { name, banner, description, price } = req.body;
    if (!name || name.trim().length === 0) {
        return res.status(403).json({ error: "You must provide a name!" });
        console.log("No Name")
    }
    if (!description || description.trim().length === 0 || description.length > 1200) {
        return res.status(403).json({ error: "You must provide a product description under 200 characters!" });
            console.log("No Description")

    }
    if (!banner || banner.trim().length === 0) {
        return res.status(403).json({ error: "You must add a banner to publish!" });
    }
    if (!price || isNaN(price)) {
        return res.status(403).json({ error: "Add a valid price!" });
    }


    let product_id = generateSlug(name)
    try {
        let product = new Product({
            name, description, banner, product_id, seller:sellerId
        });
        await product.save()   
        return res.status(201).json(product)

    } catch (error) {
        console.log(error)
     res.status(500).json({ message: 'Failed to create product', error });
    }
}


export const singleProduct = async (req, res) => {
  try {
    const { product_id } = req.body;
    if (product_id) {
      const product = await Product.findOne({ product_id })
        .sort({ createdAt: -1 })
        .populate("seller", "personal_info.profile_img personal_info.username personal_info.email personal_info.fullname -_id");
      
      if (product) {
        return res.status(200).json(product);
      } else {
        return res.status(404).json({ error: 'Product not found' });
      }
    } else {
      return res.status(400).json({ error: 'Product ID is required' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};


export const getProduct = async (req, res) => {
  try {
      const products = await Product.find()
        .sort({ createdAt: -1 })
        .populate("seller", "personal_info.profile_img personal_info.username personal_info.fullname -_id   ")
      return res.status(200).json(products);
    }
    catch (err) {
    return res.status(500).json({ error: err.message });
  }
};