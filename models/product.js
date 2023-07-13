import { Schema, model } from "mongoose";

const productSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  averagePrice: { type: Number, default: 0 },
  orderQuantity: { type: Number, default: 0 },
});

const Product = model("Product", productSchema);

export default Product;
