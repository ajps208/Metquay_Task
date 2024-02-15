import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { addOrdersAPI, editEventAPI, sendEmailAPI } from "../Services/allApi";
import BasicExample from "../components/Header";

function SuccessPayment() {
  const [ticket, setTicket] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [seatname, setSeatname] = useState(null);
  const [userId, setUserId] = useState(null);
  const [noOfTickets, setNoOfTickets] = useState(null);
  const [ticketprice, setTicketPrice] = useState(null);
  const [orderdate, setOrderDate] = useState(null);
  const [orderAdded, setOrderAdded] = useState(false);
  const [emailStatus, setEmailStattus] = useState(false);

  useEffect(() => {
    // Extract query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const ticketParam = urlParams.get("ticket");
    const paymentIdParam = urlParams.get("payment_id");
    const seatnameParam = urlParams.get("seatno");
    const userIdParam = urlParams.get("userId");
    const noOfTicketsParam = urlParams.get("noOfTickets");
    const ticketPriceParam = urlParams.get("ticketprice");
    const dateParam = urlParams.get("date");

    // Decode and parse the ticket parameter
    if (ticketParam) {
      const decodedTicket = JSON.parse(decodeURIComponent(ticketParam));
      setTicket(decodedTicket);
    }

    // Set the paymentId state
    if (paymentIdParam) {
      setPaymentId(paymentIdParam);
    }

    // Set seatname, userId, and noOfTickets states
    if (seatnameParam) {
      setSeatname(seatnameParam);
    }
    if (userIdParam) {
      setUserId(decodeURIComponent(userIdParam));
    }
    if (noOfTicketsParam) {
      setNoOfTickets(parseInt(noOfTicketsParam, 10));
    }

    // Set ticketprice state
    if (ticketPriceParam) {
      setTicketPrice(parseFloat(ticketPriceParam));
    }
    if (dateParam) {
      setOrderDate(decodeURIComponent(dateParam));
    }
  }, []);

  // add to order database
  const handleAddOrder = async () => {
    if (!ticket || !ticket._id) {
      console.error("Ticket information is not available.");
      return;
    }
    const reqBody = {
      eventId: ticket._id,
      paymentId,
      noOfTickets,
      ticketprice,
      orderdate,
    };

    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const result = await addOrdersAPI(reqBody, reqHeader);
    if (result.status === 200) {
      setOrderAdded(true);
    }
  };

  // decrease seats along with no of tickets
  const handleChangeSeatNos = async () => {
    if (!ticket || !ticket.qty || !seatname) {
      console.error("Ticket information is not available.");
      return;
    }

    const newSeatAmount = ticket.qty[seatname] - noOfTickets;
    // console.log("newSeatAmount", newSeatAmount);

    const updatedQty = ticket.qty.map(Number); // Convert string values to numbers
    updatedQty[seatname] = newSeatAmount;

    const updatedTicket = { ...ticket, qty: updatedQty };
    // console.log(updatedTicket);
    setTicket(updatedTicket);

    const reqBody = { ticket, ticketQty: updatedQty };
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // api call for edit
    const result = await editEventAPI(reqBody, reqHeader);
    if (result.status === 200) {
      handeleSendEmail();
    }
  };

  const handeleSendEmail = async () => {
    const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
    const recipientemail = existingUser.email;

    try {
      const emailData = {
        to: `${recipientemail}`,
        html: `<p>Thank you for your order! Here are the ticket details:</p>
        <ul>
          <li><strong>Name:</strong> ${ticket.name}</li>
          <li><strong>Seat:</strong> ${ticket.seat[seatname]}</li>
          <li><strong>Number of Tickets:</strong> ${noOfTickets}</li>
          <li><strong>Ticket Price:</strong> ${ticketprice}</li>
          <li><strong>Date:</strong> ${ticket.date}</li>
          <li><strong>Time:</strong> ${ticket.time}</li>
          <li><strong>Reference Id:</strong> ${paymentId}</li><br/>
          <p>Consider this mail as Your Ticket</P>
        </ul>`,
      };

      const emailResult = await sendEmailAPI(emailData);
      if (emailResult.status === 200) {
        setEmailStattus(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  useEffect(() => {
    if (ticket) {
      handleAddOrder();
    }
  }, [ticket]);

  useEffect(() => {
    handleChangeSeatNos();
  }, [orderAdded]);

  // style
  const containerStyle = {
    maxWidth: "80%", // Adjusted for responsiveness
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };

  const headingStyle = {
    fontSize: "28px", // Adjusted for responsiveness
    textAlign: "center",
    color: "#28a745",
    marginBottom: "20px",
  };

  const sectionStyle = {
    marginBottom: "20px",
  };

  const subheadingStyle = {
    fontSize: "20px", // Adjusted for responsiveness
    color: "#007bff",
    marginBottom: "10px",
  };

  const textStyle = {
    fontSize: "16px", // Adjusted for responsiveness
  };

  return (
    <>
      <BasicExample />

      <Container className="mt-5" style={containerStyle}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h4 style={headingStyle}>
              <i class="fa-regular fa-circle-check"></i> Payment Success
            </h4>
            {ticket && (
              <div style={sectionStyle}>
                <h2 style={subheadingStyle}>Ticket Information</h2>
                <p style={textStyle}>
                  <span className="">Event</span>:{" "}
                  <span className="text-uppercase text-muted">
                    {ticket.name}
                  </span>
                </p>
                {/* Add more ticket information as needed */}
              </div>
            )}
            {seatname && (
              <p style={textStyle}>
                Seat Name:{" "}
                <span className="text-muted">{ticket.seat[seatname]}</span>
              </p>
            )}
            {noOfTickets && (
              <p style={textStyle}>
                Number of Tickets:
                <span className="text-muted"> {noOfTickets}</span>
              </p>
            )}
            {ticketprice && (
              <p style={textStyle}>
                Ticket Price:
                <span className="text-muted"> {ticketprice} ₹</span>
              </p>
            )}
            {paymentId && (
              <div style={sectionStyle}>
                <p style={{ ...textStyle, wordBreak: "break-all" }}>
                  Reference ID: <span className="text-muted">{paymentId}</span>
                </p>
              </div>
            )}
          </Col>
        </Row>
        {!emailStatus && (
          <h4 className="text-success">Ticket has been sent to your email</h4>
        )}
      </Container>
    </>
  );
}

export default SuccessPayment;
