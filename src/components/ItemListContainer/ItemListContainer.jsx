import Container from "react-bootstrap/Container";

export default function ItemListContainer(props) {
  return (
    <Container
      id="item-list-container"
      className="mx-0 mw-100 mh-60 p-4 text-center bg-green-1 "
    >
      <h1>{props.greeting}</h1>
    </Container>
  );
}
