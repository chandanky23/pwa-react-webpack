import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./routes"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

const App = () => {
  return (
    <Router>
      <Routes />
      <Container fluid>
        <Navbar collapseOnSelect expand="sm">
          <Navbar.Brand href="/">CHANDAN YADAV</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/experiences">Experiences</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Router>
  )
}

export default App
