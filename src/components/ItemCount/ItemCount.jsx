import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function ItemCount({
  initialValue,
  stock,
  id,
  handleAddToCart,
}) {
  const [count, setCount] = useState(initialValue);

  const handleAdd = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleSubtract = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="handleAddToCartContainer" id={id}>
      <div className="counter">
        <button onClick={handleSubtract} className="counterBtn minusBtn">
          -
        </button>
        <span className="counterNumber">{count}</span>
        <button onClick={handleAdd} className="counterBtn plusBtn">
          +
        </button>
      </div>
      <Button
        onClick={handleAddToCart(count)}
        variant="outline-success"
        className="addToCartBtn"
      >
        {count > 0 ? "Add to Cart" : "Cancel"}
      </Button>
    </div>
  );
}
