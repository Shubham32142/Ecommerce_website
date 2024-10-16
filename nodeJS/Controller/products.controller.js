import productModel, { Cart, User } from "../Model/products.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function createProduct(req, res) {
  const { title, images, description, price, rating } = req.body;
  const newProduct = new productModel({
    title: title,
    description: description,
    price: price,
    images: images,
    rating: rating,
  });
  try {
    const addProducts = await newProduct.save();
    res.status(201).send(addProducts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function fetchProducts(req, res) {
  try {
    const products = await productModel.find(); // Fetch all products from the database

    // Wrap the products in an object
    const response = {
      products: products.map(({ _doc }) => {
        // Return only the relevant fields from the _doc property
        const { _id, title, description, price, images, rating } = _doc;
        return { _id, title, description, price, images, rating };
      }),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//update product
export async function updateProduct(req, res) {
  const { id } = req.params;
  const { title, description, rating, images, price } = req.body;
  if (!id) {
    return res.status(404).json({ message: "item not found" });
  }
  try {
    let updateProduct = await productModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        rating,
        images,
        price,
      },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully", updateProduct });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong updating products", err });
  }
}
//find product by ID
export async function productById(req, res) {
  try {
    const id = await productModel.findById(req.params.id);
    if (!id) {
      res.status(404).json({ message: "Product not found" });
    }
    res.send(id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
//delete product
export async function deleteProduct(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ message: "Product Id not found" });
  }
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Item not found" });
    }
    let deleteCart = await productModel.findByIdAndDelete(id);
    if (!deleteCart) {
      res.status(404).json({ message: "Item not found" });
    }
    res
      .status(200)
      .json({ message: "item deleted Successfully", title: product.title });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//add new cart item
export async function cartItem(req, res) {
  const { productId, title, quantity } = req.body;
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    let cartItem = await Cart.findOne({ productId });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart({ productId, title, quantity });
    }
    await cartItem.save();
    res.status(201).json({ message: "Product added to cart:", cartItem });
  } catch (err) {
    res.status(500).json({ message: "Error adding product to cart", err });
  }
}

//Get all the cart Items
export async function getCartItems(req, res) {
  try {
    const cartItems = await Cart.find();
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart items", err });
  }
}

//to update the cart
export async function updateCart(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;
  if (!id) {
    return res.status(404).json({ message: "Product Id not found" });
  }
  try {
    let updatedItem = await Cart.findByIdAndUpdate(
      id,
      {
        quantity,
      },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "cart item not found" });
    }
    res.status(200).json({ message: "Cart updated successfully", updatedItem });
  } catch (err) {
    res.status(500).json({ message: "Error updating the cart", err });
  }
}
//to delete cart
export async function deleteCart(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ message: "Product Id not found" });
  }
  try {
    let deleteCart = await Cart.findByIdAndDelete(id);
    if (!deleteCart) {
      res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "item deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//JWT Authentication register

export async function Register(req, res) {
  const { username, email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });
    await newUser.save();
    res.status(201).json({ message: "User registerred successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", err });
  }
}

//Login

export async function Login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong credentials" });
    }
    const token = jwt.sign({ id: user._id }, "secretKey", {
      expiresIn: "15m",
    });
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({ message: "Error logging in:", err });
  }
}

//authentication

export const authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, "secretKey", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
