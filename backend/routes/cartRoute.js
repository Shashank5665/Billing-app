const {
  addToCart,
  getCarts,
  updateCart,
} = require("../controllers/cartController");

const router = require("express").Router();

router.get("/", getCarts);
router.post("/:productId", addToCart);
router.patch("/:productId", updateCart);

module.exports = router;
