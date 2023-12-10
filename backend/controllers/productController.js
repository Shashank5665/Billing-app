const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const { name, code } = req.query;
    const filter = {};
    if (name) {
      filter.name = new RegExp(name, "i");
    }
    if (code) {
      filter.code = new RegExp(code, "i");
    }

    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { code, name, price, gst } = req.body;
    if (!code || !name || !price || !gst) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    const product = await Product.create({ code, name, price, gst });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, gst } = req.body;
    if (!name || !price || !gst) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { name, price, gst },
      { new: true }
    );
    const updatedProduct = await Product.findOne({ _id: id });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
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
