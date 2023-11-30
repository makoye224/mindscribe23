import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useStateContext } from "../context/context";

function Header() {
  const { user, logout } = useStateContext()
  // Function to handle logout
  const handleLogOut = () => {
    logout()
    // Redirect to the login page (you need to define your login route)
    window.location.href = "/login";
  };
  const handleJournals = () => {
    // Redirect to the main page (you need to define your login route)
    window.location.href = "/home";
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Container>
        <br />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Navbar.Brand href="/home">
            <h3 style={{ color: "#0275d8" }}>MindScribe</h3>
          </Navbar.Brand>

          <Navbar.Brand id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <Nav.Link onClick={handleLogOut}>
                    Log Out
                  </Nav.Link>
              ) : (
                <>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <a href="/login" className="authlink">
                      Log In
                    </a>
                    <span style={{ margin: "0 10px" }}>&nbsp;</span>
                    <a href="/register" className="authlink">
                      Sign Up
                    </a>
                  </Box>
                </>
              )}
            </Nav>
          </Navbar.Brand>
        </Box>
      </Container>
      <br />
    </div>
  );
}

export default Header;
