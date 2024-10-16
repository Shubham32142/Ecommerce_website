import {
  authenticationToken,
  cartItem,
  createProduct,
  deleteCart,
  deleteProduct,
  fetchProducts,
  getCartItems,
  Login,
  productById,
  Register,
  updateCart,
  updateProduct,
} from "../Controller/products.controller.js";

export function routes(server) {
  server.post("/api/products", createProduct);
  server.get("/api/allProducts", fetchProducts);
  server.get("/api/:id", productById);
  server.get("/cart/allItems", authenticationToken, getCartItems);
  server.put("/api/:id", updateProduct);
  server.delete("/api/:id", deleteProduct);
  server.post("/cart", authenticationToken, cartItem);
  server.put("/cart/:id", authenticationToken, updateCart);
  server.delete("/cart/:id", deleteCart);
  server.post("/register", Register);
  server.post("/login", Login);
}
