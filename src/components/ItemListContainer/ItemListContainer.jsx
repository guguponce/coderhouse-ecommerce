import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { getBooks, getBooksByCategory } from "../../asyncmock";
import ItemList from "../ItemList/ItemList";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";

export default function ItemListContainer() {
  const [booksList, setBooksList] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const getData = category ? getBooksByCategory : getBooks;
    getData(category)
      .then((books) => {
        setBooksList(books);
      })
      .catch((error) => {
        throw Error(error);
      });
  }, [category]);
  return (
    <Container
      id="item-list-container"
      className="mx-0 mw-100 min-vh-100 p-4 text-center  "
    >
      {!booksList.length ? <Loading /> : <ItemList items={booksList} />}
    </Container>
  );
}
