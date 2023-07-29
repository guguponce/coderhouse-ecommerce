import { useContext, useState } from "react";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import Summary from "../../components/Summary/Summary";
import { ShoppingCartContext } from "../../hooks/CartContext";
import { Link } from "react-router-dom";
export default function Checkout() {
  const [orderID, setOrderID] = useState(undefined);
  const [order, setOrder] = useState({});
  const { state } = useContext(ShoppingCartContext);

  const handleOrder = (newOrder, id) => {
    setOrderID(id);
    setOrder(newOrder);
  };

  return (
    <div
      id="checkout-main"
      className={
        orderID || !state.length ? "summaryExcluded" : "summaryIncluded"
      }
    >
      {orderID ? (
        <div id="successful-section">
          <h2>Congratulations, {order.buyer.name}!</h2>
          <h3>Your order has been placed!</h3>
          <p>
            <strong>Order ID:</strong> {orderID}
          </p>
        </div>
      ) : state.length ? (
        <>
          <CheckoutForm handleOrder={handleOrder} />
          <Summary />
        </>
      ) : (
        <div id="no-items-box">
          <h3>Your shopping cart is empty</h3>
          <p>
            Please go back to <Link to="/">Homepage</Link>
          </p>
        </div>
      )}
    </div>
  );
}
