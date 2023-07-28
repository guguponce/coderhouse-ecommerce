import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loading from "../Loading/Loading";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function ItemDetailContainer() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookNotFound, setBookNotFound] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const bookRef = doc(db, "catalog", id);
      getDoc(bookRef)
        .then((res) => {
          setLoading(false);
          if (!res.exists()) {
            setBookNotFound(true);
          } else {
            setBook({ id: res.id, data: res.data() });
          }
        })
        .catch(() => {
          setLoading(false);
          setBookNotFound(true);
        });
    }
  }, [id]);

  return (
    <main className="main" id="single-book-main">
      {loading ? (
        <Loading />
      ) : bookNotFound ? (
        <div id="book-not-found-container" className="main">
          <h1>Book not found</h1>
          <p>{"Sorry, we couldn't find the book you were looking for."}</p>
          <p>
            Please go back to <Link to="/">Homepage</Link>
          </p>
        </div>
      ) : (
        <ItemDetail item={book.data} />
      )}
    </main>
  );
}
