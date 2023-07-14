import mongoose from "mongoose";
import Product from "../models/product.js";
import prompt from "prompt";
import dotenv from "dotenv";
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

    console.log(`Quantity of product ${product.name}: ${product.quantity}`);
    process.exit();
  } catch (error) {
    console.error("Error occurred while getting the product quantity:", error);
  }
});
