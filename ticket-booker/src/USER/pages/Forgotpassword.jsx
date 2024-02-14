import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { chanhePaawordAPI, sendotpAPI } from "../Services/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Forgotpassword() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [otpEntered, setOtpEntered] = useState("");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState(false);
  const [pswdChange, setPswdChange] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleOtpSend = async () => {
    const newRandomNumber = Math.floor(Math.random() * 9000) + 1000;
    setRandomNumber(newRandomNumber);

    try {
      const emailData = {
        to: `${email}`,
        html: `<p>OTP for changing the password <b>${newRandomNumber}</b> </p>`, // Use newRandomNumber here
      };

      const emailResult = await sendotpAPI(emailData);
      if (emailResult.status === 200) {
        // console.log("Email sent:", emailResult);
        setEmailStatus(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  const verifyOtp = () => {
    if (randomNumber == otpEntered) {
      setPswdChange(true);
      alert("correct");
      setRandomNumber(null);
      setOtpEntered("");
    } else {
      toast.info("Entered otp is not correct");
    }
  };

  const updatePassword=async()=>{
   if(password==cpassword){
    console.log("correct password")
    const reqBody={
        email,
        password
    }
    const result=await chanhePaawordAPI(reqBody)
    if(result.status===200){
        toast.success("Password Changed")
    }else{
        toast.error(result.data)
    }
   }
  }
  // console.log(randomNumber);

  return (
    <>
      {!pswdChange ? (
        <Container
          style={{ height: "100vh" }}
          className=" d-flex justify-content-center align-items-center"
        >
          <div className=" border rounded shadow-lg  w-75 h-75 d-flex flex-column justify-content-center align-items-center">
            <h2 className="mb-5">Forgot Password</h2>
            <div className=" w-75  d-flex justify-content-center align-items-center">
              <input
                className="shadow-lg form-control w-75"
                type="text"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleOtpSend} className="ms-2 btn btn-primary">
                Send Otp
              </button>
            </div>
            {emailStatus && (
              <div className=" w-75 mt-5  d-flex justify-content-center align-items-center">
                <input
                  className="shadow-lg form-control w-75"
                  type="text"
                  placeholder="Enter the otp"
                  onChange={(e) => setOtpEntered(e.target.value)}
                />
                <button className="ms-2  btn btn-primary" onClick={verifyOtp}>
                  Submit
                </button>
              </div>
            )}
          </div>
        </Container>
      ) : (
        <Container
          style={{ height: "100vh" }}
          className=" d-flex justify-content-center align-items-center"
        >
         <section className="vh-100  " style={{backgroundColor: "#eee;"}}>
  <div className="container h-100">
    
    <div className="row d-flex justify-content-center align-items-center h-100">
      
      <div className="col-lg-12 col-xl-11">
      <Link to={'/'} style={{ textDecoration: "none" ,color:"red"}}><i classNameName="fa-solid fa-arrow-left me-1"></i> Back to Home    </Link>

        <div className="card text-black" style={{borderRadius:" 25px;"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Change Password</p>

                <form className="mx-1 mx-md-4">



                  <div className="d-flex flex-row align-items-center mb-4 ">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" onChange={e=>setPassword(e.target.value)} minlength="8" required/>
                     <div className='d-flex justify-content-between'>
                        <label className="form-label" for="form3Example4c">Password</label>
                     </div>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4 ">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" onChange={e=>setCpassword(e.target.value)} />
                     <div className='d-flex justify-content-between'>
                        <label className="form-label" for="form3Example4c">Confirm Password</label>
                     </div>
                    </div>
                  </div>

                 <div className="d-flex flex-column justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" onClick={updatePassword}  className="btn mx-4 btn-primary btn-lg">Change Password</button>
                  </div>
                 
                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ToastContainer position='top-right' autoClose={2000} theme='colored' />

</section>
        </Container>
      )}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}

export default Forgotpassword;
