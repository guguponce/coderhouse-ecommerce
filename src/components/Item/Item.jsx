import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import SingleBookCover from "../SingleBookCover/SingleBookCover";
import AddCart from "../AddCart/AddCart";

export default function Item({ book }) {
  const { name, authors, imageurl, saleprice, stock } = book.data;
  const navigate = useNavigate();
  return (
    <Card className="itemCard" onClick={() => navigate(`/book/${book.id}`)}>
      <SingleBookCover imgURL={imageurl} bookTitle={name} />

      <Card.Body
        style={{ height: "100px" }}
        className="d-flex flex-column justify-content-start"
      >
        <Card.Title className="fw-bold fs-6">
          {name.slice(0, 30)}
          {name.length > 30 && "..."}
        </Card.Title>
        <Card.Text className="fs-6 text-center fst-italic ">
          {authors[0]}
        </Card.Text>
      </Card.Body>
      <Card.Footer
        className="bg-transparent border-0 d-flex justify-content-between align-items-md-center mx-auto cardFooter"
        style={{ width: "90%" }}
      >
        {stock > 0 ? (
          <>
            <AddCart book={book} />
            <Card.Text className="fw-semibold fs-4">${saleprice}</Card.Text>
          </>
        ) : (
          <Card.Text className="fw-semibold outStock">Out of stock</Card.Text>
        )}
      </Card.Footer>
    </Card>
  );
}
