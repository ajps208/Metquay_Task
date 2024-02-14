import React from "react";
import "./Sidebar.css";
import logo from "../../Assets/logo3.png";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate=useNavigate()
  const handleLogout = () => {
    // Clear user data from sessionStorage
    sessionStorage.removeItem('Admintoken');
    sessionStorage.removeItem('adminUser');
   
    navigate('/')
    window.location.reload();
  };
  return (
    <>
      <div class="sidebar">
       <div className="w-100 p-3"> <img src={logo} className="img-fluid w-75" alt="" /></div>
       <a class="active fw-bolder"  >
          ADMIN DASHBOARD
        </a>
        <a href="/admindashboard">
          Home
        </a>
        <a href="/addevent">Add Events</a>
        <a href="/orderview">Orders</a>
        <a onClick={handleLogout}>Logout</a>
      </div>
    </>
  );
}

export default Sidebar;
