import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
