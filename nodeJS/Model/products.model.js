import mongoose from "mongoose";

//products Schema

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  rating: { type: Number, required: true },
});

const productModel = mongoose.model("products", productsSchema);

export default productModel;

//Cart Schema
const cartSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
});

export const Cart = mongoose.model("Cart", cartSchema);

//Products fetching from api and sending them to mongoDB
export async function fetchAndStoreProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    for (const product of data.products) {
      const existingProduct = await productModel.findOne({
        title: product.title,
      });
      if (!existingProduct) {
        await productModel.create({
          title: product.title,
          description: product.description,
          price: product.price,
          images: product.images[0],
          rating: product.rating,
        });
      }
    }
    console.log("Products added successfully");
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    console.log("Some products were not added because of duplicates");
  }
}

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
