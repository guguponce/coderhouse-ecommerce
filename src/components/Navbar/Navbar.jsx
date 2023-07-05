import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import CartWidget from "../CartWidget/CartWidget";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";

export default function NavbarComponent() {
  const navigate = useNavigate();
  return (
    <Container as="header" className="px-0 mw-100 container-fluid">
      <Navbar className="bg-green-1 px-5 py-3 shadow-lg" expand="lg">
        <Container
          className="w-100  d-flex gap-3"
          role="button"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#E1E1A3"
            stroke="#E1E1A3"
            viewBox="0 0 50 50"
            className="logo"
          >
            <path d="M8 3c-.55 0-1 .45-1 1v26a1 1 0 0 0 1 1h5c.555 0 1-.445 1-1V4a1 1 0 0 0-1-1Zm9 0c-.55 0-1 .45-1 1v26a1 1 0 0 0 1 1h5c.555 0 1-.445 1-1V4a1 1 0 0 0-1-1ZM9.5 7h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2Zm9 0h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2Zm19.094 1.438L32.75 9.594a1 1 0 0 0-.625.437 1.028 1.028 0 0 0-.125.313V10a1 1 0 0 0-1-1h-5c-.55 0-1 .45-1 1v20a1 1 0 0 0 1 1h5c.555 0 1-.445 1-1V10.781l4.813 19.469c.109.46.515.781.968.781.074 0 .14-.015.219-.031l4.875-1.156a1 1 0 0 0 .625-.438.976.976 0 0 0 .125-.75L38.812 9.188a1.02 1.02 0 0 0-1.218-.75Zm-.625 4.343c.383.067.718.348.812.75a1.022 1.022 0 0 1-.75 1.219l-.968.219a.87.87 0 0 1-.22.031c-.452 0-.89-.32-1-.781a.99.99 0 0 1 .75-1.188l.97-.219a1.03 1.03 0 0 1 .406-.03ZM28 13h1a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2Zm11.531 11.469c.535-.121 1.09.21 1.219.75a.989.989 0 0 1-.75 1.187l-.969.25c-.078.02-.176.032-.25.032-.453 0-.86-.32-.968-.782a1.02 1.02 0 0 1 .75-1.218ZM9.5 25h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2Zm9 0h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2Zm9.5 0h1c.555 0 1 .445 1 1 0 .555-.445 1-1 1h-1c-.555 0-1-.445-1-1 0-.555.445-1 1-1ZM3 32a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h44c.555 0 1-.445 1-1v-3c0-.555-.445-1-1-1Zm3 7v5.5C6 45.879 7.121 47 8.5 47s2.5-1.121 2.5-2.5V39Zm33 0v5.5c0 1.379 1.121 2.5 2.5 2.5s2.5-1.121 2.5-2.5V39Z" />
          </svg>
          <Navbar.Brand
            href="#home"
            className="flex-grow-1 text-yellow-2 fw-bold fs-1"
          >
            DevBooks
          </Navbar.Brand>
        </Container>
        <Container className="d-flex flex-2 justify-content-end">
          <ul className="list-group list-group-horizontal gap-3 mx-5  flex-wrap">
            {["FrontEnd", "BackEnd", "Javascript", "Database", "Python"].map(
              (cat, i, arr) => (
                <React.Fragment key={cat}>
                  <NavLink
                    to={`category/${cat}`}
                    className="category-item text-decoration-none fw-semibold text-yellow-2 fs-5"
                  >
                    {cat}
                  </NavLink>
                  {i !== arr.length - 1 && (
                    <span className="fs-5 text-yellow-2">|</span>
                  )}
                </React.Fragment>
              )
            )}
          </ul>
          <CartWidget />
        </Container>
      </Navbar>
    </Container>
  );
}
