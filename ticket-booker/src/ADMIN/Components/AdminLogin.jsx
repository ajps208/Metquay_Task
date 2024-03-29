import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../USER/Services/allApi";
import { tokenAuthorisationContext } from "../Context/TokenAuth";

function AdminLogin() {
  // Access the navigation object
  const navigate = useNavigate();
  
  // Access the context for token authorization
  const { isAuthorizes, setIsAuthorizes } = useContext(tokenAuthorisationContext);

  // State to hold admin login data
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  // Handle admin login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = adminData;
    // Validate if email and password are provided
    if (!email || !password) {
      toast.info("Please fill the form completely !!!");
    } else {
      // Call the login API
      const result = await loginAPI(adminData);
      if (result.status === 200) {
        // Save user data and token to session storage
        sessionStorage.setItem("adminUser", JSON.stringify(result.data.existingAdmin));
        sessionStorage.setItem("Admintoken", result.data.token);
        // Clear admin login data
        setAdminData({
          email: "",
          password: "",
        });
        // Set authorization state to true
        setIsAuthorizes(true);
        // Navigate to admin dashboard
        navigate("/admindashboard");
      } else {
        // Display warning message if login fails
        toast.warning(result.response.data);
      }
    }
  };

  return (
    <>
      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>
                    <div className="form-outline form-white mb-4">
                      <input
                        value={adminData.email}
                        onChange={(e) =>
                          setAdminData({ ...adminData, email: e.target.value })
                        }
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "white",
                          color: "white",
                        }}
                      />
                      <label className="form-label" htmlFor="typeEmailX">
                        Email
                      </label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        value={adminData.password}
                        onChange={(e) =>
                          setAdminData({
                            ...adminData,
                            password: e.target.value,
                          })
                        }
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "white",
                          color: "white",
                        }}
                      />
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                      </label>
                    </div>

                    <button
                      onClick={handleLogin}
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}

export default AdminLogin;
