import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const Menu = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">UbyShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/fabricantes">Fabricantes</Nav.Link>
            <Nav.Link href="/productos">Productos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
