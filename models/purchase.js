import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
