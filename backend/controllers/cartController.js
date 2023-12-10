const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    // Find if the item is already in the cart and populate the 'product' field
    const item = await Cart.findOne({ product: productId });

    // If the item is already in the cart, update the quantity of the item
    if (item) {
      console.log("Yes I am in duplicart cart section");
      item.quantity += 1;
      await item.save();

      return res.status(200).json({
        message: "Item quantity updated",
        data: item,
        TotalQuantity: item.quantity,
      });
    }

    // If the item is not in the cart, create a new cart item
    const cart = new Cart({
      product: productId,
      quantity,
    });

    await cart.save();

    // Populate the 'product' field in the response
    const populatedCart = await Cart.findById(cart._id).populate("product");

    res.status(201).json({
      message: "Item added to cart successfully",
      data: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate("product");
    res.status(200).json({
      message: "Cart items retrieved successfully",
      data: carts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const item = await Cart.findOne({ product: productId });
    console.log("item", item);

    if (!item) {
      return res.status(500).json({
        message: "Item not found in cart",
      });
    }

    item.quantity = quantity;
    await item.save();

    const populatedCart = await Cart.findById(item._id).populate("product");

    res.status(200).json({
      message: "Cart updated successfully",
      data: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCarts,
  updateCart,
};
