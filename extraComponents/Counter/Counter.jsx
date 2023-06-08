import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Counter({ stock, initial }) {
  const [count, setCount] = useState(initial);

  const handleIncrease = () => {
    if (count < stock || !stock) {
      setCount((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <Button variant="primary" onClick={handleDecrease}>
          -
        </Button>
        <Button disabled variant="secondary">
          {count}
        </Button>
        <Button variant="primary" onClick={handleIncrease}>
          +
        </Button>
        <p style={{ color: count > 5 ? "red" : "black" }}>asdfasdf</p>
      </ButtonGroup>
    </>
  );
}
