import React from "react";
import Item from "../Item/Item";

export default function ItemList({ items }) {
  return (
    <div id="item-list" className="booksCatalog">
      {items ? (
        items.map((book) => (
          <React.Fragment key={book.id}>
            <Item key={book.isbn} {...book} />
          </React.Fragment>
        ))
      ) : (
        <h2>There are no books in this category</h2>
      )}
    </div>
  );
}
