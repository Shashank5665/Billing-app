const { mongo, default: mongoose } = require("mongoose");
const Product = require("../models/productModel");
const { v4: uuidv4 } = require("uuid");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, gst } = req.body;
    console.table({ name, price, gst });
    if (!name || !price || !gst) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    const code = uuidv4();
    const product = await Product.create({ code, name, price, gst });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { name, price, gst } = req.body;

    // Check if the product exists
    const productExists = await Product.findById(id);
    if (!productExists) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    if (!name || !price || !gst) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const product = await Product.findOneAndUpdate(
      { _id: id },
      { name, price, gst },
      { new: true }
    );

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const product = await Product.findOneAndDelete({ _id: id });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
