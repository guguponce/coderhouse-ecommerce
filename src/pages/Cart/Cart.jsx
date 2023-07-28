import React, { useContext, useMemo } from "react";
import SingleCartItem from "./CartItem";
import { ShoppingCartContext } from "../../hooks/CartContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function ShoppingCart() {
  const { state, clearCart } = useContext(ShoppingCartContext);

  const subtotal = useMemo(() => {
    const subt = state.reduce((tot, p) => tot + p.saleprice * p.quantity, 0);
    return subt;
  }, [state]);

  return (
    <main id="cart-main">
      <h1>Shopping Cart</h1>
      <section id="cart-list">
        {state.length ? (
          state.map((prod) => {
            console.log(prod);
            return (
              <React.Fragment key={prod.id}>
                <SingleCartItem product={prod} />
              </React.Fragment>
            );
          })
        ) : (
          <div id="no-items-box">
            <h3>Your shopping cart is empty</h3>
            <Button as={Link} to="/" id="add-items-btn">
              Add some products
            </Button>
          </div>
        )}
      </section>
      {!!state.length && (
        <div id="clear-checkout-btns">
          <Button variant="danger" onClick={() => clearCart()}>
            Clear Cart
          </Button>
          <Button id="checkout-cart-btn" as={Link} to={"/checkout"}>
            Checkout
          </Button>
        </div>
      )}
      {subtotal > 0 && (
        <div id="checkout-box">
          <div id="total-price-box">
            <div id="subprices-container">
              <div className="subpricesBox">
                <h4 className="subpricesLabel" id="subtotal-label">
                  Subtotal:
                </h4>
                <h4 className="subpricesPrice" id="subtotal-price">
                  €{subtotal.toFixed(2)}
                </h4>
              </div>

              <div className="subpricesBox" id="box">
                <h4 className="subpricesLabel" id="delivery-label">
                  Delivery price:
                </h4>
                <h4 className="subpricesPrice" id="delivery-price">
                  €3.99
                </h4>
              </div>
            </div>

            <div className="totalBox" id="total-box">
              <h4 id="total-label">Total:</h4>
              <h4 id="total-price">€{(subtotal + 3.99).toFixed(2)}</h4>
            </div>
          </div>
          <Button
            as={Link}
            to="/checkout"
            className="button-plain"
            id="checkout-btn"
          >
            Checkout
          </Button>
        </div>
      )}
    </main>
  );
}
