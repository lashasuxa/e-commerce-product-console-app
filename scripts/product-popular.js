import mongoose from "mongoose";
import Product from "../models/product.js";
import dotenv from "dotenv";
dotenv.config();

const findPopularProduct = async () => {
  try {
    const product = await Product.findOne().sort({ quantity: -1 });
    if (product) {
      console.log(`Most popular product: ${product.name}`);
    } else {
      console.log("No products found");
    }
  } catch (error) {
    console.error("Error occurred while finding the popular product:", error);
  } finally {
    mongoose.disconnect();
  }
};

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    findPopularProduct();
  })
  .catch((error) => {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  });
