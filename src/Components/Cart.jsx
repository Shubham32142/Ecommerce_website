import { useSelector, useDispatch } from "react-redux";
import { clearCart, updateItemQuantity } from "./cartSlice";
import CartItem from "./CartItem";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  function navigation() {
    navigate(-1);
  }

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    dispatch(updateItemQuantity({ id, quantity: newQuantity }));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {totalQuantity === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={handleUpdateQuantity}
            />
          ))}
          <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
          <button onClick={handleCheckout} className="checkout-button">
            Checkout
          </button>
        </div>
      )}
      <button onClick={navigation}>Back</button>
    </div>
  );
}

export default Cart;
