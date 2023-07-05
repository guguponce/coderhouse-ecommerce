import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../../asyncmock";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loading from "../Loading/Loading";

export default function ItemDetailContainer() {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getItem(id)
        .then((res) => setBook(res))
        .catch((error) => {
          throw Error(error);
        });
    }
  }, [id]);

  return (
    <main className="main" id="single-book-main">
      {!book ? <Loading /> : <ItemDetail item={book} />}
    </main>
  );
}
