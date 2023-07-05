import SingleBookCover from "../SingleBookCover/SingleBookCover";
import Accordion from "../Accordion/Accordion";
import ItemCount from "../ItemCount/ItemCount";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ItemDetail({ item }) {
  const [itemQuantity, setItemQuantity] = useState(0);
  const handleAddToCart = (quantity) => () => {
    setItemQuantity(quantity);
  };

  return (
    <article className="singleBook" id="single-book">
      <h1 id="name-single-book">{item.name}</h1>
      <p id="authors-single-book">
        {item.authors.map((aut, i, arr) => (
          <React.Fragment key={aut + i}>
            {aut}
            {!(i === arr.length - 1) && <span> - </span>}
          </React.Fragment>
        ))}
      </p>
      <div id="img-description-box" className="">
        <div id="img-single-book">
          <SingleBookCover imgURL={item.imageurl} bookTitle={item.name} />
        </div>
        <p id="description-single-book">
          {item.longDescription ? item.longDescription : item.shortDescription}
        </p>
      </div>
      <Accordion title={"Details"} id={"details-accordion"}>
        <p className="accordionContent">
          <span className="detailsTitle">Categories:</span>
          {item.categories.join(", ")}
        </p>
        <p className="accordionContent">
          <span className="detailsTitle">Pages:</span> {item.pages}
        </p>{" "}
        <p className="accordionContent">
          <span className="detailsTitle">ISBN:</span> {item.isbn}{" "}
        </p>
        <p className="accordionContent">
          <span className="detailsTitle">Publish year:</span> {item.year}
        </p>
      </Accordion>

      <div id="price-counter-container">
        <div id="price-counter-box">
          <p id="price-single-book">${item.saleprice}</p>
          {item.stock ? (
            <ItemCount
              id={"counter-single-book"}
              initialValue={1}
              stock={item.stock}
              handleAddToCart={handleAddToCart}
            />
          ) : (
            <h4>Out of Stock</h4>
          )}
        </div>
        {itemQuantity > 0 && (
          <div id="add-total-price-box">
            <Link to="/cart" id="add-to-cart-btn" className="btn">
              Add {itemQuantity} book{itemQuantity === 1 ? "" : "s"} to Shopping
              Cart
            </Link>
            <p id="total-price">
              <span>Total price: </span> $
              {(item.saleprice * itemQuantity).toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
