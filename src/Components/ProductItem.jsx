import { useParams, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "./cartSlice";
import "./ProductItem.css";

function ProductItem() {
  const navigate = useNavigate();
  const { products } = useOutletContext(); // Fetch products from context
  const { productId } = useParams(); // Get the productId from the URL
  const dispatch = useDispatch();

  // Find the product based on the ID from the URL
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <p>Product not found</p>;
  }

  const addToCart = () => {
    dispatch(addItemToCart(product));
  };

  const ratingStars = (ratings) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < ratings ? "⭐" : "☆");
    }
    return stars.join(" ");
  };

  function handleBack() {
    navigate(-1);
  }

  return (
    <div className="product-item">
      <h1>{product.title}</h1>
      <img src={product.images[0]} alt={product.title} />
      <p>{product.description}</p>
      <p className="price">Price: ${product.price}</p>
      <p className="rating">Rating: {ratingStars(product.rating)}</p>
      <div className="button-container">
        <button className="add-to-cart-btn" onClick={addToCart}>
          Add to Cart
        </button>
        <button className="back-btn" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
