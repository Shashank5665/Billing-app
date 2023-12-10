const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRoute);
app.use("/cart", cartRoute);

app.listen(process.env.PORT, () => {
  console.log(`Billing app's server is running on port ${process.env.PORT}...`);
});
