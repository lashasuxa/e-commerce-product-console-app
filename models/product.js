import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const autoIncrementFactory = AutoIncrementFactory(mongoose.connection);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

productSchema.plugin(autoIncrementFactory.plugin, {
  model: "Product",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
