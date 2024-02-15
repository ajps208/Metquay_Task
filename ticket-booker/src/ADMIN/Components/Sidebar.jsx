import React from "react";
import "./Sidebar.css"; // Import the CSS file for styling
import logo from "../../Assets/logo3.png"; // Import the logo image
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data from sessionStorage
    sessionStorage.removeItem("Admintoken");
    sessionStorage.removeItem("adminUser");

    // Redirect to the home page and reload the window
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {/* Sidebar container */}
      <div className="sidebar">
        {/* Logo section */}
        <div className="w-100 p-3">
          <img src={logo} className="img-fluid w-75" alt="Logo" />
        </div>
        {/* Navigation links */}
        <a className="active fw-bolder">ADMIN DASHBOARD</a>
        <a href="/admindashboard">Home</a>
        <a href="/addevent">Add Events</a>
        <a href="/orderview">Orders</a>
        {/* Logout link with onClick event handler */}
        <a onClick={handleLogout}>Logout</a>
      </div>
    </>
  );
}

export default Sidebar;
