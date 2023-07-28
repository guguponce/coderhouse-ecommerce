import SingleBookCover from "../SingleBookCover/SingleBookCover";
import Accordion from "../Accordion/Accordion";
import ItemCount from "../ItemCount/ItemCount";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ShoppingCartContext } from "../../hooks/CartContext";

export default function ItemDetail({ item }) {
  const [itemQuantity, setItemQuantity] = useState(0);
  const handleAddToCart = (quantity) => () => {
    setItemQuantity(quantity);
  };
  const { addToCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  return (
    <article className="singleBook" id="single-book">
      <h1 id="name-single-book">{item.data.name}</h1>
      <p id="authors-single-book">
        {item.data.authors.map((aut, i, arr) => (
          <React.Fragment key={aut + i}>
            {aut}
            {!(i === arr.length - 1) && <span> - </span>}
          </React.Fragment>
        ))}
      </p>
      <div id="img-description-box" className="">
        <div id="img-single-book">
          <SingleBookCover
            imgURL={item.data.imageurl}
            bookTitle={item.data.name}
          />
        </div>
        <p id="description-single-book">
          {item.data.longDescription
            ? item.data.longDescription
            : item.data.shortDescription}
        </p>
      </div>
      <Accordion title={"Details"} id={"details-accordion"}>
        <p className="accordionContent">
          <span className="detailsTitle">Categories:</span>
          {item.data.categories.join(", ")}
        </p>
        <p className="accordionContent">
          <span className="detailsTitle">Pages:</span> {item.data.pages}
        </p>{" "}
        <p className="accordionContent">
          <span className="detailsTitle">ISBN:</span> {item.data.isbn}{" "}
        </p>
        <p className="accordionContent">
          <span className="detailsTitle">Publish year:</span> {item.data.year}
        </p>
      </Accordion>

      <div id="price-counter-container">
        <div id="price-counter-box">
          <p id="price-single-book">${item.data.saleprice}</p>
          {item.data.stock ? (
            <ItemCount
              id={"counter-single-book"}
              initialValue={1}
              stock={item.data.stock}
              handleAddToCart={handleAddToCart}
            />
          ) : (
            <h4>Out of Stock</h4>
          )}
        </div>
        {itemQuantity > 0 && (
          <div id="add-total-price-box">
            <Button
              to="/cart"
              id="add-to-cart-btn"
              onClick={() => {
                addToCart({ ...item, quantity: itemQuantity });
                setTimeout(() => {
                  navigate("/cart");
                }, 500);
              }}
            >
              Add {itemQuantity} book{itemQuantity === 1 ? "" : "s"} to Shopping
              Cart
            </Button>
            <p id="total-price">
              <span>Total price: </span> $
              {(item.data.saleprice * itemQuantity).toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
