import React, { useCallback, useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../hooks/CartContext";
import { Link } from "react-router-dom";

export default function SingleCartItem({ product }) {
  const { addToCart, removeFromCart } = useContext(ShoppingCartContext);
  const { name, imageurl, saleprice } = product.data;
  const quantity = product.quantity;
  const [itemQuantity, setItemQuantity] = useState<number>(quantity);

  useEffect(() => {
    addToCart({ ...product, quantity: itemQuantity });
  }, [itemQuantity]);

  return (
    <article className="singleCartItem">
      <Link to={`/book/${product.id}`}>
        <img className="cartItemImg" src={imageurl} alt={name} />
      </Link>
      <h4 className="cartItemName">{name}</h4>
      <div className="itemQuantityManger">
        {
          <div className="quantityBox">
            <button
              className="quantityButton decButton"
              onClick={() =>
                setItemQuantity((prev) => (prev > 1 ? prev - 1 : prev))
              }
            >
              <span>-</span>
            </button>
            <div className="cartItemQuantity">{itemQuantity}</div>
            <button
              className="quantityButton incButton"
              onClick={() => setItemQuantity((prev) => prev + 1)}
            >
              <span>+</span>
            </button>
          </div>
        }
        <button
          className="removeButton"
          onClick={() => removeFromCart(product)}
        >
          Remove
        </button>
      </div>
      <div className="cartItemPricesBox">
        <h4 className="cartItemsTotalPrice">
          €{(saleprice * quantity).toFixed(2)}
        </h4>
        <h5 className="cartItemPrice">(€{saleprice}/item)</h5>
      </div>
    </article>
  );
}
