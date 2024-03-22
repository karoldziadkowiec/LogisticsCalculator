import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './App.css';

const AppNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">LogisticsCalculator</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/cpm">CPM</Nav.Link>
              <Nav.Link as={Link} to="/mediator">Mediator issue</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
    );
  }

export default AppNavbar;