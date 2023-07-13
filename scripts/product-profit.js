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

const calculateProfit = async () => {
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

      const purchaseQuantity = product.purchase.reduce(
        (total, purchase) => total + purchase.quantity,
        0
      );
      const orderQuantity = product.orders.reduce(
        (total, order) => total + order.quantity,
        0
      );
      const profit = purchaseQuantity - orderQuantity;

      console.log(`Profit for product ${product.name}: ${profit}`);
    } catch (error) {
      console.error("Error occurred while calculating profit:", error);
    }
  });
};

connect();
calculateProfit();
