

import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.js"; // ✅ Include .js if using ES Modules

// ✅ Add Product : /api/product/add
export const addProduct = async (req, res) => {
    try {
        // ✅ Parse the product data from req.body
        let productData = JSON.parse(req.body.productData);

        // ✅ Get uploaded image files
        const images = req.files;

        // ✅ Upload all images to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        // ✅ Save product in database
        await Product.create({ ...productData, image: imagesUrl });

        res.json({ success: true, message: "Product added" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Get all products : /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Get single product by ID : /api/product/id
export const productById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Change product inStock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });
        res.json({ success: true, message: "Stock updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
