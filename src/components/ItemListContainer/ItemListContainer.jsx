import Container from "react-bootstrap/Container";

export default function ItemListContainer(props) {
  return (
    <Container
      id="item-list-container"
      className="mx-0 mw-100 min-vh-100 p-4 text-center  "
    >
      <h1>{props.greeting}</h1>
    </Container>
  );
}
