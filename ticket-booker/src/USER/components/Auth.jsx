import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logimg from "../../Assets/loginimg.png";
import logo from "../../Assets/logo.png";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginrAPI, registerAPI } from "../Services/allApi";
import { AuthStatus } from "../Context/AuthContext";

function Auth({ register }) {
  // Access the authentication status from context
  const { logedUser, setLogedUser } = useContext(AuthStatus);

  // Initialize navigate hook
  const navigate = useNavigate();

  // Determine if it's a registration form
  const isRegisterForm = register ? true : false;

  // State for user data
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;

    // Check if all fields are filled
    if (!username || !email || !password) {
      toast.info("Please fill the form completely !!!");
    } else {
      try {
        const result = await registerAPI(userData);

        if (result.status === 200) {
          toast.success(`${result.data.username} has registered successfully!!!`);

          // Clear the form fields
          setUserData({
            username: "",
            email: "",
            password: "",
          });

          // Redirect to login page after successful registration
          navigate(`/login`);
        } else {
          toast.warning(result.response.data);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;

    // Check if email and password are filled
    if (!email || !password) {
      toast.info("Please fill the form");
    } else {
      const result = await loginrAPI(userData);
      if (result.status === 200) {
        // Set user data and token in session storage
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);
        setLogedUser(result.data);

        // Clear the form fields
        setUserData({
          email: "",
          password: "",
        });

        // Redirect to home page after successful login
        navigate("/");
        window.location.reload(); // Reload the page to reflect login changes
      } else {
        toast.warning(result.response.data);
      }
    }
  };

  return (
    <section
      className="vh-100  "
      style={{
        backgroundColor: " #130f40",
        backgroundImage: "linear-gradient(315deg, #130f40 0%, #000000 74%)",
        color: "white",
      }}
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <Link to={"/"} style={{ textDecoration: "none", color: "red" }}>
              <i classNameName="fa-solid fa-arrow-left me-1"></i> Back to Home{" "}
            </Link>

            <div className="card text-black" style={{ borderRadius: " 25px;" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      {isRegisterForm ? `Sign up` : `Login`}
                    </p>

                    <form className="mx-1 mx-md-4">
                      {isRegisterForm && (
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              value={userData.username}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  username: e.target.value,
                                })
                              }
                            />
                            <label className="form-label" for="form3Example1c">
                              Your UserName
                            </label>
                          </div>
                        </div>
                      )}

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            value={userData.email}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                email: e.target.value,
                              })
                            }
                          />
                          <label className="form-label" for="form3Example3c">
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4 ">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            value={userData.password}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                password: e.target.value,
                              })
                            }
                          />
                          <div className="d-flex justify-content-between">
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label>
                            {!isRegisterForm && (
                              <label
                                className="form-label"
                                for="form3Example4c"
                              >
                                <Link
                                  to={"/forgotpassword"}
                                  style={{ textDecoration: "none" }}
                                >
                                  Forgot Password?
                                </Link>
                              </label>
                            )}
                          </div>
                        </div>
                      </div>

                      {isRegisterForm ? (
                        <div className="d-flex flex-column justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            onClick={handleRegister}
                            className="btn mx-4 btn-primary btn-lg"
                          >
                            Register
                          </button>
                          <p className="mt-3 mx-3">
                            Already have account?clicked here to{" "}
                            <Link
                              to={"/login"}
                              style={{ textDecoration: "none" }}
                            >
                              Login
                            </Link>
                          </p>
                        </div>
                      ) : (
                        <div className="d-flex  flex-column justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            onClick={handleLogin}
                            className="btn mx-4 btn-success btn-lg"
                          >
                            Login
                          </button>
                          <p className="mt-3 mx-4">
                            New User? Click here to{" "}
                            <Link
                              to={"/register"}
                              style={{ textDecoration: "none" }}
                            >
                              Register
                            </Link>
                          </p>
                        </div>
                      )}
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </section>
  );
}

export default Auth;
