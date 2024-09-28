/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { removeItemFromCart, updateItemQuantity } from "./cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  function handleUpdateQuantity(newQuantity) {
    // Ensure newQuantity is non-negative
    if (newQuantity >= 0) {
      dispatch(
        updateItemQuantity({
          id: item.id,
          quantity: newQuantity,
          price: item.price,
        })
      );
    }
  }

  return (
    <div className="cart-item">
      <h3>{item.title}</h3>
      <div className="item-details">
        <div className="quantity-control">
          <button
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
            disabled={item.quantity === 1}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => handleUpdateQuantity(item.quantity + 1)}>
            +
          </button>
        </div>
        <p>
          ${item.price.toFixed(2)} x {item.quantity} = $
          {item.totalPrice.toFixed(2)}
        </p>
        <button onClick={() => dispatch(removeItemFromCart(item.id))}>
          Remove Item
        </button>
      </div>
    </div>
  );
}

export default CartItem;
