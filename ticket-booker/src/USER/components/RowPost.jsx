import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Services/baseURL";
import { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function RowPost({ event, title, url }) {
  const [loading, setLoading] = useState(true); // State to manage loading state of the component
  const [displayEvent, setDisplayEvent] = useState({}); // State to store the currently displayed event
  const [logged, setLogged] = useState(false); // State to manage user's login status
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle button click for viewing event details
  const handleButtonClick = (id) => {
    navigate(`/ticket/${id}`); // Navigate to the ticket page for the selected event
  };

  // Function to handle login click
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const [show, setShow] = useState(false); // State to manage modal visibility
  const handleClose = () => setShow(false); // Function to close the modal
  const handleShow = (item) => {
    setShow(true);
    setDisplayEvent(item); // Function to show the modal and set the displayed event
  };

  // Effect to check user's login status
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLogged(true); // Set logged state to true if token exists in sessionStorage
    } else {
      setLogged(false); // Set logged state to false if token doesn't exist
    }
  }, [logged]); // Re-run the effect when logged state changes

  // Effect to set loading state based on the presence of event data
  useEffect(() => {
    if (event && event.length > 0) {
      setLoading(false); // Set loading state to false if event data is available
    }
  }, [event]); // Re-run the effect when event data changes
  
  return (
    <>
      <Container style={{ maxWidth: "80%" }}>
        <div className="d-flex align-items-center justify-content-between pt-5">
          <h3 className="fs-2 " style={{ color: "#9c7945" }}>
            The Latest {title}
          </h3>
          <Link to={url} style={{ textDecoration: "none" }}>
            <p className="fs-6" style={{ color: " #c71585" }}>
              See All{" "}
              <i
                class="fa-solid fa-greater-than "
                style={{ fontSize: "8px" }}
              ></i>{" "}
            </p>
          </Link>
        </div>
        <Row className="mt-4">
          {loading ? (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Skeleton count={5} />
            </SkeletonTheme>
          ) : (
            event?.map((item) => (
              <Col sm={12} md={3} lg={3} onClick={() => handleShow(item)}>
                <div
                  className="d-flex flex-column  justify-content-center align-items-center"
                  style={{ width: "100%" }}
                >
                  <div
                    style={{
                      width: "82%",
                      position: "relative",
                      height: "35vh",
                      boxShadow: "0 4px 8px rgba(255, 255, 0, 0.5)",
                    }}
                  >
                    <img
                      className="img-fluid h-100"
                      width={"100%"}
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                      src={`${BASE_URL}/uploads/${item.image}`}
                      alt=""
                    />
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "40px",
                        bottom: "0px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(0, 0, 0, 0.608)",
                      }}
                      className="text-light p-2"
                    >
                      <i
                        class="fa-solid fa-calendar-days"
                        style={{ color: "yellow" }}
                      ></i>{" "}
                      {item.date}{" "}
                    </div>
                  </div>
                  <div>
                    <h5
                      className="mt-3"
                      style={{
                        width: "240px",
                        textTransform: "uppercase",
                        color: "#8c8c8c",
                      }}
                    >
                      {item.name}
                    </h5>
                    <p style={{ width: "240px", color: "#8c8c8c" }}>
                      {item.location}
                    </p>
                    <p style={{ width: "240px", color: "#8c8c8c" }}>
                      ₹ {item.price[2]} onwards
                    </p>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>
      {/* MODAL */}
      <Modal
        key={displayEvent._id}
        size="lg"
        show={show}
        onHide={handleClose}
        keyboard={false}
      >
        <Modal.Header
          className="d-flex flex-column position-relative"
          style={{
            height: "400px",
            backgroundImage: `url(${BASE_URL}/uploads/${displayEvent.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Modal.Title
            closeButton
            className="w-100 d-flex  justify-content-between align-items-center"
          >
            <div className="d-flex flex-column mt-3 ">
              {displayEvent.subcategory ? (
                <h5
                  style={{
                    color: "yellow",
                    textShadow:
                      "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                  }}
                >
                  {displayEvent.subcategory}
                </h5>
              ) : null}
              <h1
                className="text-light  "
                style={{
                  textShadow:
                    "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                  textTransform: "uppercase",
                }}
              >
                {displayEvent.name}{" "}
              </h1>
            </div>
            <div>
              <Badge bg="info">{displayEvent.category}</Badge>
            </div>
          </Modal.Title>
          <div
            style={{
              width: "100%",
              height: "80px",
              backgroundColor: "rgba(0, 0, 0, 0.608)",
            }}
            className="fixed-bottom text-light  position-absolute"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2">
                <h6>
                  <i
                    class="fa-regular fa-calendar-days"
                    style={{ color: "yellow" }}
                  ></i>{" "}
                  {displayEvent.date}
                </h6>
                <p>
                  <i
                    class="fa-regular fa-clock"
                    style={{ color: "yellow" }}
                  ></i>{" "}
                  {displayEvent.time}
                </p>
              </div>
              <p className="pe-2">
                <i
                  class="fa-solid fa-location-dot"
                  style={{ color: "red" }}
                ></i>{" "}
                {displayEvent.location}{" "}
              </p>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body
          style={{
            color: "#8c8c8c",
            backgroundColor: " #130f40",
            backgroundImage: "linear-gradient(315deg, #130f40 0%, #000000 74%)",
          }}
        >
          <h5>About</h5>
          {displayEvent.description}
        </Modal.Body>
        <Modal.Footer
          style={{
            color: "#8c8c8c",
            backgroundColor: " #130f40",
            backgroundImage: "linear-gradient(315deg, #130f40 0%, #000000 74%)",
          }}
        >
          <Button
            variant="secondary"
            className="text-dark"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            onClick={
              logged
                ? () => handleButtonClick(displayEvent._id)
                : handleLoginClick
            }
            variant="primary"
          >
            Get Your Ticket
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RowPost;
