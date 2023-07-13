import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/product.js";
import prompt from "prompt";

dotenv.config();

const disconnect = async () => {
  await mongoose.connection.close();
};

const purchaseProduct = async () => {
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
        return;
      }

      const totalPrice = result.quantity * result.price;
      console.log(`Total purchase amount: ${totalPrice}`);

      // Update product quantity and save it to the database
      product.quantity -= result.quantity;
      await product.save();

      console.log("Product purchased successfully!");
    } catch (error) {
      console.error("Error occurred while purchasing the product:", error);
    }
  });
};

const averageProductPrice = async () => {
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
        return;
      }

      const totalPrice = product.price * product.quantity;
      const averagePrice = totalPrice / product.quantity;
      console.log(`Average price for product ${product.name}: ${averagePrice}`);
    } catch (error) {
      console.error("Error occurred while calculating average price:", error);
    }
  });
};
