import prompt from "prompt";
import Product from "../models/product.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
};

connect();

const schema = {
  properties: {
    quantity: {
      description: "Product quantity",
      type: "number",
      required: true,
    },
    price: {
      description: "Product price",
      type: "number",
      required: true,
    },
    productId: {
      description: "Product ID",
      type: "number",
      required: true,
    },
  },
};

prompt.start();

prompt.get(schema, async function (err, result) {
  if (err) {
    console.log(err);
    return;
  }

  try {
    const product = await Product.findOne({ id: result.productId });

    if (!product) {
      console.log("Product not found");
      process.exit();
    }

    const totalPrice = result.quantity * result.price;
    console.log(`Total purchase amount: ${totalPrice}`);

    // Update product quantity and save it to the database
    product.quantity -= result.quantity;
    await product.save();

    console.log("Product purchased successfully!");
    process.exit();
  } catch (error) {
    console.error("Error occurred while purchasing the product:", error);
  }
});
