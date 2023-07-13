import prompt from "prompt";
import Product from "../models/product.js";
import Purchase from "../models/purchase.js";
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

const purchaseProduct = async () => {
  const schema = {
    properties: {
      productId: {
        description: "Product ID",
        type: "number",
        required: true,
      },
      quantity: {
        description: "Product quantity",
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
        return;
      }

      const totalPrice = result.quantity * product.price;
      console.log(`Total purchase amount: ${totalPrice}`);

      const purchase = new Purchase({
        productId: result.productId,
        quantity: result.quantity,
        price: product.price,
      });
      await purchase.save();

      console.log("Product added to cart successfully!");
    } catch (error) {
      console.error("Error occurred while adding the product to cart:", error);
    }
  });
};

connect();
purchaseProduct();
