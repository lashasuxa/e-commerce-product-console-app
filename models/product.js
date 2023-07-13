import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// Add pre-save middleware to automatically assign an ID before saving a new product
productSchema.pre("save", async function (next) {
  if (!this.id) {
    const lastProduct = await Product.findOne().sort({ id: -1 });
    this.id = lastProduct ? lastProduct.id + 1 : 1;
  }

  if (this.isModified("name")) {
    const existingProduct = await Product.findOne({ name: this.name });

    if (existingProduct) {
      this.price = existingProduct.price;
      console.log("Product updated!");
    }
  }

  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
