import React, { useEffect, useState } from "react";
import { Container, Col, Row, Toast } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router-dom";
import { oneEventAPI, paymentAPI } from "../Services/allApi";
import { BASE_URL } from "../Services/baseURL";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicExample from "../components/Header";
function TicketView() {
  // Retrieve the 'id' parameter from the URL using the useParams hook
  const { id } = useParams();

  // State variables to manage ticket information, selected seat, number of tickets, token, and ticket price
  const [ticket, setTicket] = useState({});
  const [seat, setSeat] = useState(undefined); // Updated to handle 'undefined' instead of 'null'
  const [noOfTickets, setNoOfTickets] = useState(1);
  const [token, setToken] = useState("");
  const [ticketprice, setTicketPrice] = useState("");

  // Function to fetch event details based on the 'id' parameter
  const oneEventCall = async () => {
    try {
      const result = await oneEventAPI(id);
      if (result.status === 200) {
        console.log(result.data);
        setTicket(result.data);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to initiate the payment process
  const makePayment = async () => {
    try {
      // Load Stripe instance with the publishable key
      const stripe = await loadStripe(
        "pk_test_51OGkHMSHKWNdPynwVi6PmahTtkOQAeAENEBXD91iC4ddSRPZ4gJTkzZ3snBRpEAqT7K1zFO1jy0WHdmU49410jf400XvEgzrrF"
      );

      // Check if seat selection is valid
      if (
        seat === null ||
        seat === undefined ||
        seat === "SELECT YOUR CATEGORY"
      ) {
        toast.info("Please select a seat before making the payment");
        return;
      }

      // Prepare request body for payment
      const reqBody = {
        ticketprice: ticketprice,
        noOfTickets: noOfTickets,
        seat: seat,
        ticket: ticket,
      };

      // Prepare request header with authorization token
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Make a request to the paymentAPI
      const response = await paymentAPI(reqBody, reqHeader);

      // Validate session response
      if (!response.data || !response.data.id) {
        console.error("Invalid session response from the server");
        return;
      }

      // Redirect to Stripe checkout page with the session ID
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Effect hook to set the token from sessionStorage when the component mounts
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);

  // Effect hook to fetch event details when the 'id' parameter changes
  useEffect(() => {
    oneEventCall();
  }, [id]);

  // Effect hook to calculate the total ticket price when seat, number of tickets, or ticket details change
  useEffect(() => {
    const totalTicketPrice =
      ticket.price && seat !== undefined ? ticket.price[seat] * noOfTickets : 0;

    setTicketPrice(totalTicketPrice);
  }, [seat, noOfTickets, ticket]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: " #130f40",
        backgroundImage: "linear-gradient(315deg, #130f40 0%, #000000 74%)",
        color: "white",
      }}
    >
      <BasicExample />

      <Container style={{ maxWidth: "80%" }} className="mt-5">
        <Row>
          <Col sm={12} md={7} lg={7}>
            <div
              className="d-flex flex-column position-relative "
              style={{
                width: "100%",
                height: "400px",
                backgroundImage: `url(${BASE_URL}/uploads/${ticket.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "0 4px 8px rgba(255, 255, 0, 0.6)",
              }}
            >
              <div className="w-100 d-flex justify-content-between align-items-center p-3">
                <div className="d-flex flex-column">
                  {ticket.subcategory ? (
                    <h5
                      style={{
                        color: "yellow",
                        textShadow:
                          "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                      }}
                    >
                      {ticket.subcategory}
                    </h5>
                  ) : null}
                  <h3
                    className="text-light"
                    style={{
                      textShadow:
                        "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                      textTransform: "uppercase",
                    }}
                  >
                    {ticket.name}{" "}
                  </h3>
                </div>
                <div>
                  <Badge bg="info">{ticket.category}</Badge>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "80px",
                  backgroundColor: "rgba(0, 0, 0, 0.608)",
                }}
                className="fixed-bottom text-light position-absolute"
              >
                <div className="d-flex justify-content-between align-items-center p-3">
                  <div>
                    <h6>
                      <i
                        class="fa-regular fa-calendar-days"
                        style={{ color: "yellow" }}
                      ></i>{" "}
                      {ticket.date}
                    </h6>
                    <p>
                      <i
                        class="fa-regular fa-clock"
                        style={{ color: "yellow" }}
                      ></i>{" "}
                      {ticket.time}
                    </p>
                  </div>
                  <p>
                    <i
                      class="fa-solid fa-location-dot"
                      style={{ color: "red" }}
                    ></i>{" "}
                    {ticket.location}{" "}
                  </p>
                </div>
              </div>
            </div>
            <h4 className="mt-3" style={{ color: "#8c8c8c" }}>
              About
            </h4>
            <p style={{ color: "#8c8c8c" }}>{ticket.description}</p>
          </Col>
          <Col
            sm={12}
            md={5}
            lg={5}
            className="d-flex flex-column align-items-center "
          >
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex w-100 mt-4 ">
                <select
                  className="form-select w-100 caret"
                  name=""
                  id=""
                  placeholder="SELECT YOUR CATEGORY"
                  onChange={(e) => setSeat(e.target.value)}
                >
                  <option value="SELECT YOUR CATEGORY" selected>
                    Select your seats
                  </option>
                  {ticket.seat &&
                    ticket.seat.map((item, index) => (
                      <option key={item} value={index}>
                        {item}
                      </option>
                    ))}
                </select>
              </div>
              <div className="d-flex align-items-center justify-content-center  mt-3 ">
                <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                  <div
                    style={{ backgroundColor: "#000000", color: "wheat" }}
                    className="d-flex flex-column align-items-center justify-content-center border p-3 rounded "
                  >
                    <div className="d-flex  align-items-center justify-content-center">
                      <span className="me-2 fs-5 ">No of tickets:</span>
                      <button
                        className="btn btn-info fs-4"
                        onClick={() =>
                          setNoOfTickets(Math.max(1, noOfTickets - 1))
                        }
                      >
                        -
                      </button>
                      <p style={{ color: "wheat" }} className="fs-5 m-2">
                        {noOfTickets}
                      </p>
                      <button
                        className="btn btn-info fs-4"
                        onClick={() => setNoOfTickets(noOfTickets + 1)}
                      >
                        +
                      </button>
                    </div>
                    <input
                      style={{
                        backgroundColor: "#000000",
                        textAlign: "center", // Center text
                        border: "none", // Remove border
                        outline: "none", // Remove outline on focus
                        cursor: "default", // Disable hover effect
                        color: "white",
                      }}
                      type="text"
                      className="form-control w-100 m-2 fs-4"
                      value={`Price: ${ticketprice} ₹`}
                    />
                  </div>
                </div>
              </div>
              <button
                disabled={
                  ticket.qty && seat !== undefined && ticket.qty[seat] === 0
                }
                onClick={makePayment}
                className="w-100 mt-4 btn btn-primary"
              >
                {" "}
                Get your tickets
              </button>

              <p className="mt-4" style={{ marginLeft: "-165px" }}>
                Remaining Tickets:{" "}
                {ticket.qty && seat !== undefined
                  ? ticket.qty[seat] === 0
                    ? "soldout"
                    : ticket.qty[seat]
                  : 0}
              </p>
            </div>

            <div className="w-75 ms-1 ">
              <Accordion defaultActiveKey={null} flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Terms & Conditions</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>
                        Tickets once booked cannot be exchanged or refunded
                      </li>
                      <li>
                        No refund on a purchased ticket is possible, even in
                        case of any rescheduling.
                      </li>
                      <li>
                        Unlawful resale (or attempted unlawful resale) of a
                        ticket would lead to seizure or cancellation of that
                        ticket without refund or other compensation.
                      </li>
                      <li>
                        We recommend that you arrive at least 30 minutes prior
                        at the venue for a seamless entry{" "}
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}

export default TicketView;
