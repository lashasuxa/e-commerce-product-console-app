import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  purchase: [purchaseSchema],
  orders: [orderSchema],
});

// Add pre-save middleware to automatically assign an ID before saving a new product
productSchema.pre("save", async function (next) {
  if (!this.id) {
    const lastProduct = await Product.findOne().sort({ id: -1 });
    this.id = lastProduct ? lastProduct.id + 1 : 1;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
