const express = require("express");
const router = express.Router();
const cartItemController = require("../controllers/cartItemController");

// Route to create a new cart item
router.post("/", cartItemController.createCartItem);

// Route to get all cart items
router.get("/", cartItemController.getAllCartItems);

// Route to update a cart item
router.patch("/", cartItemController.updateCartItem);

// Route to delete a cart item
router.delete("/:id", cartItemController.deleteCartItem);

module.exports = router;
