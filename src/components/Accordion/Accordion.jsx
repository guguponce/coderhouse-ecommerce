import { useState } from "react";

export default function Accordion({ children, id, title }) {
  const [active, setActive] = useState(false);
  return (
    <div id={id} className="accordionContainer">
      <div
        className="accordionTop"
        role="button"
        onClick={() => setActive((prev) => !prev)}
      >
        <h4 className="accordionTitle">{title}</h4>
        <span className="accordionIcon">{active ? "-" : "+"}</span>
      </div>
      <div
        className="accordionBottom"
        style={active ? { display: "block" } : { display: "none" }}
      >
        {children}
      </div>
    </div>
  );
}
