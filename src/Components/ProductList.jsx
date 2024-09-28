import "./ProductList.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access the search input from Redux
import useProducts from "./useProducts.js";
import { selectSearchInput } from "./cartSlice"; // Import the selector for search input

function ProductList() {
  const { products, loading, error } = useProducts();
  const searchInput = useSelector(selectSearchInput); // Get search input from Redux store

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to generate rating stars
  const ratingStars = (ratings) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < ratings ? "⭐" : "☆");
    }
    return stars.join(" ");
  };

  const filteredProducts = products.filter((product) => {
    return product.title && typeof product.title === "string"
      ? product.title.toLowerCase().includes(searchInput.toLowerCase())
      : false;
  });

  return (
    <>
      <div className="container1">
        <h1 id="products">Our Products</h1>
        <div className="products-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id}>
                <Link to={`/products/${product.id}`} className="productLink">
                  <img src={product.images[0]} alt={product.title} />
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
