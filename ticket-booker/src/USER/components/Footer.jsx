// Footer.js

import React from 'react';
import logo from '../../Assets/logo3.png';
import { Link } from 'react-router-dom';


const Footer = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
   
  };

  const heroStyle = {
    background: '#2a2e32',
    color: '#8c8c8c',
    paddingTop: '5rem',
    flexGrow: 1,
  };

  const footerStyle = {
    backgroundColor:" #130f40",
    backgroundImage: "linear-gradient(315deg, #130f40 0%, #000000 74%)",
    color:"#8c8c8c",
    paddingTop: '.5rem', // Adjust the top padding
    paddingBottom: '.5rem', // Adjust the bottom padding
    flexGrow: 0,
  };

  return (
    <div style={containerStyle}>
    
      <footer style={footerStyle}>
        <div className="container-md py-4">
          <div className="row gy-4 gx-3">
            <div className="col-lg-4 col-md-6">
            <img width={'230px'} className="img-fluid" src={logo} alt="" />
              <p className="mt-4 small ">Your gateway to thrilling sports experiences – book events effortlessly with our ticket booking app!"</p>
              <p className="small mb-0">&copy; Copyrights. All rights reserved. <a  href="#" style={{textDecoration:"none",color:"#8c8c8c"}}>Ajith P S</a></p>
            </div>
            <div className="col-lg-2 col-md-6">
              <h5 className="text-white mb-3">Quick links</h5>
              <ul className="list-unstyled text-muted">
                <li><Link to={'/'} style={{textDecoration:"none",color:"#8c8c8c"}}>Home</Link></li>
                <li><Link to={'/login'} style={{textDecoration:"none",color:"#8c8c8c"}}>Login</Link></li>
                <li><Link  to={'/register'} style={{textDecoration:"none",color:"#8c8c8c"}}>Register</Link></li>
                <li><Link style={{textDecoration:"none",color:"#8c8c8c"}}>FAQ</Link></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6">
              <h5 className="text-white mb-3">Quick links</h5>
              <ul className="list-unstyled text-muted">
                <li><Link  to={'/'} style={{textDecoration:"none",color:"#8c8c8c"}}>Home</Link></li>
                <li><Link to={"/events"} style={{textDecoration:"none",color:"#8c8c8c"}}>Events</Link></li>
                <li><Link to={'/sports'} style={{textDecoration:"none",color:"#8c8c8c"}}>Sports</Link></li>
                <li><Link to={'/search'} style={{textDecoration:"none",color:"#8c8c8c"}}>Search</Link></li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6">
              <h5 className="text-white mb-3">Newsletter</h5>
              <p className="small ">Seize every moment! Book sports events effortlessly with our app for unforgettable experiences.</p>
              <form action="#">
                <div className="input-group mb-3">
                  <input className="form-control" type="text" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                  <button className="btn btn-primary" id="button-addon2" type="button"><i className="fas fa-paper-plane"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
