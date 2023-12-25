const CartItem = require("../models/cartItemModel");
const Product = require("../models/productModel");

const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find({}).populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    const cartItemExists = await CartItem.findOne({ product: productId });
    if (!cartItemExists) {
      const quantity = 1;
      const cartItem = await CartItem.create({ product: productId, quantity });
      const updatedCartItem = await CartItem.findOne({
        _id: cartItem._id,
      }).populate("product");
      res.status(201).json(updatedCartItem);
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id, quantity } = req.body;
    console.table({ id, quantity });
    if (!quantity) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    const cartItem = await CartItem.findOneAndUpdate(
      { _id: id },
      { quantity },
      { new: true }
    ).populate("product");
    const updatedCartItem = await CartItem.findOne({ _id: id });
    res.status(200).json(updatedCartItem);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await CartItem.findOneAndDelete({ _id: id });
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllCartItems,
  createCartItem,
  updateCartItem,
  deleteCartItem,
};
