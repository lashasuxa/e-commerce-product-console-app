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
    name: {
      description: "Product name",
      type: "string",
      required: true,
    },
    price: {
      description: "Product price",
      type: "number",
      required: true,
    },
    id: {
      description: "Product id",
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
    const product = await Product.findOne({ id: result.id });

    if (product) {
      product.name = result.name;
      product.price = result.price;
      await product.save();
      console.log("Product updated!");
    } else {
      const newProduct = new Product({
        id: result.id,
        name: result.name,
        price: result.price,
      });
      await newProduct.save();
      console.log("Product saved!");
      process.exit();
    }
  } catch (error) {
    console.error("Error occurred while saving the product:", error);
  }
});
