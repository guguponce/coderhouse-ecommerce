import React, { useEffect, useRef, useState } from "react";
import Item from "../Item/Item";
import loadingGif from "/loading.gif";

export default function ItemList({ items }) {
  const [displayedBooks, setDisplayedBooks] = useState(20);
  const loadingRef = useRef();

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && displayedBooks < items.length) {
        setTimeout(() => {
          setDisplayedBooks((prev) => prev + 10);
        }, 300);
      }
      if (entries[0].intersectionRatio <= 0) return;
    });
    if (loadingRef.current) {
      intersectionObserver.observe(loadingRef.current);
    }
    if (loadingRef.current && displayedBooks >= items.length) {
      intersectionObserver.unobserve(loadingRef.current);
    }
  }, [displayedBooks, items]);

  return (
    <div className="booksCatalog">
      {items ? (
        <>
          <div id="item-list">
            {items.slice(0, displayedBooks).map((book) => (
              <React.Fragment key={book.id}>
                <Item key={book.data.isbn} book={book} />
              </React.Fragment>
            ))}
          </div>
          {items.length > displayedBooks && (
            <img
              src={loadingGif}
              alt="Loading..."
              style={{ width: "50px", height: "50px", margin: "2rem auto" }}
              ref={loadingRef}
            />
          )}
        </>
      ) : (
        <h2>There are no books in this category</h2>
      )}
    </div>
  );
}
