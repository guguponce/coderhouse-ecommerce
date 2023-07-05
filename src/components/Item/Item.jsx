import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import SingleBookCover from "../SingleBookCover/SingleBookCover";
import AddCart from "../AddCart/AddCart";

export default function SingleBookItem({
  name,
  imageurl,
  authors,
  saleprice,
  id,
}) {
  const navigate = useNavigate();
  return (
    <Card
      style={{ width: "12rem" }}
      className="itemCard"
      onClick={() => navigate(`/book/${id}`)}
    >
      <SingleBookCover imgURL={imageurl} bookTitle={name} />

      <Card.Body
        style={{ height: "100px" }}
        className="d-flex flex-column justify-content-between"
      >
        <Card.Title className="fw-bold fs-6">
          {name.slice(0, 30)}
          {name.length > 30 && "..."}
        </Card.Title>
        <Card.Text className="fs-6 text-start ">{authors[0]}</Card.Text>
      </Card.Body>
      <Card.Footer
        className="bg-transparent border-0 d-flex justify-content-between align-items-md-center mx-auto"
        style={{ width: "90%" }}
      >
        <>
          <AddCart />
        </>
        <Card.Text className="fw-semibold fs-4">${saleprice}</Card.Text>
      </Card.Footer>
    </Card>
  );
}
