import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ItemList from "../ItemList/ItemList";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
import { FirestoreContext } from "../../firebase/Firestore";

export default function ItemListContainer() {
  const [booksList, setBooksList] = useState([]);
  const { category } = useParams();
  const { getCatalog } = useContext(FirestoreContext);
  useEffect(() => {
    getCatalog().then((books) => {
      if (category) {
        setBooksList(
          books.filter((book) => book.data.categories.includes(category))
        );
      } else {
        setBooksList(books);
      }
    });
  }, [category, getCatalog]);

  return (
    <Container
      id="item-list-container"
      className="mx-0 mw-100 min-vh-100 p-4 text-center  "
    >
      {!booksList.length ? <Loading /> : <ItemList items={booksList} />}
    </Container>
  );
}
