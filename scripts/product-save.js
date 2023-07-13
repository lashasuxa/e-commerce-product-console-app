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

const saveProduct = async () => {
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
    },
  };

  prompt.start();

  prompt.get(schema, async function (err, result) {
    if (err) {
      console.log(err);
      return;
    }

    try {
      const newProduct = new Product({
        name: result.name,
        price: result.price,
      });
      await newProduct.save();
      console.log("Product saved!");
    } catch (error) {
      console.error("Error occurred while saving the product:", error);
    }
  });
};

connect();
saveProduct();
