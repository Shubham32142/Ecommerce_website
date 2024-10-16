import "./ProductList.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useProducts from "./useProducts.js";
import { selectSearchInput } from "./cartSlice";

function ProductList() {
  const { products, loading, error } = useProducts();
  const searchInput = useSelector(selectSearchInput);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;

  const ratingStars = (ratings) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < ratings ? "⭐" : "☆");
    }
    return stars.join(" ");
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        if (!searchInput) return true; // Return all products if search input is empty
        return product.title && typeof product.title === "string"
          ? product.title
              .toLowerCase()
              .trim()
              .includes(searchInput.toLowerCase().trim())
          : false;
      })
    : [];

  return (
    <>
      <div className="container1">
        <h1 id="products">Our Products</h1>
        <div className="products-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id}>
                <Link to={`/products/${product._id}`} className="productLink">
                  {" "}
                  {/* Use product._id */}
                  <img src={product.images} alt={product.title} />
                  <h2>{product.title}</h2>
                  <h3 className="product-rating">
                    Ratings: {ratingStars(product.rating)}
                  </h3>
                </Link>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductList;
