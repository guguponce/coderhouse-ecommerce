import { useContext } from "react";
import { ShoppingCartContext } from "../../hooks/CartContext";

export default function Summary() {
  const { subtotalAmount, state } = useContext(ShoppingCartContext);
  return (
    <aside id="summary-container">
      <h2 id="summary-title">Summary</h2>
      <div id="articles-box">
        {state.map((product) => (
          <div className="product-summary" key={product.id}>
            <p>{product.quantity}x</p>
            <h4>{product.data.name}</h4>
            <p>€{product.data.saleprice}</p>
          </div>
        ))}
      </div>
      <div className="delivery-summary">
        <h4>Delivery:</h4>
        <p>€3.99</p>
      </div>
      <div id="total-summary">
        <div id="total-title">
          <h3>Total:</h3>
          <small>(incl. Msts.)</small>
        </div>
        <h3>€{(subtotalAmount + 3.99).toFixed(2)}</h3>
      </div>
    </aside>
  );
}
