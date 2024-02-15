// BasicExample.js

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Assets/logo3.png";
import order from "../../Assets/order.png";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { AuthStatus } from "../Context/AuthContext";
import { useContext } from "react";
import "./Header.css";

function BasicExample() {
  const navigate = useNavigate();
  const { logedUser, setLogedUser } = useContext(AuthStatus);
  const [logged, setLogged] = useState(false); // State to track user login status
  const [username, setUserName] = useState(""); // State to store username

  useEffect(() => {
    // Check if there is an existing user in sessionStorage
    const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));

    if (existingUser) {
      setUserName(existingUser.username); // Set the username if there's an existing user
      setLogged(true); // Set the logged state to true
    }
  }, [logedUser]); // Re-run the effect when the logedUser changes

  // Function to handle user logout
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Remove token from sessionStorage
    sessionStorage.removeItem("existingUser"); // Remove existing user data from sessionStorage
    setLogged(false); // Set the logged state to false
    setUserName(""); // Clear the username
    navigate("/"); // Navigate to the home page
    window.location.reload(); // Reload the window to reset the application
  };

  return (
    <div className="header-container">
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid className="ps-5 pe-5 mt-3">
          <Navbar.Brand href="/" className="ms-1">
            <img width={"230px"} className="img-fluid" src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle
            style={{ backgroundColor: "white" }}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link href="/events" className="nav-link-custom fs-6 ms-3 ">
                <i className="fa-solid fa-guitar"></i> Events
              </Nav.Link>
              <Nav.Link href="/sports" className="nav-link-custom fs-6 ms-3 ">
                <i className="fa-solid fa-basketball"></i> Sports
              </Nav.Link>
              <Nav.Link href="/search" className="nav-link-custom fs-6 ms-3 ">
                <i className="fa-solid fa-magnifying-glass"></i> Search
              </Nav.Link>
              {logged && (
                <NavDropdown
                  className="custom-dropdown"
                  title={username}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/order">
                    <img
                      width={"60px"}
                      className="img-fluid"
                      src={order}
                      alt=""
                    />
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {!logged ? (
                <Nav.Link href="/login" className="nav-link-custom fs-6 ms-3 ">
                  Login
                </Nav.Link>
              ) : (
                <Nav.Link
                  onClick={handleLogout}
                  className="nav-link-custom fs-6 ms-3 "
                >
                  Logout <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default BasicExample;
