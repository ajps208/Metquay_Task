import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { searchEventsAPI } from "../Services/allApi";
import { BASE_URL } from "../Services/baseURL";
import { useNavigate } from "react-router-dom";

function SearchPost() {
  const [searchKey, setSearchKey] = useState(""); // State for the search key
  const [searchData, setSearchData] = useState([]); // State for storing search results
  const [displayEvent, setDisplayEvent] = useState({}); // State for storing the currently displayed event
  const [logged, setLogged] = useState(false); // State for user's login status
  const [show, setShow] = useState(false); // State for controlling modal visibility
  const navigate = useNavigate();

  // Function to handle button click for viewing event details
  const handleButtonClick = (id) => {
    navigate(`/ticket/${id}`);
  };

  // Function to handle login click
  const handleLoginClick = () => {
    navigate("/login");
  };

  // Function to close the modal
  const handleClose = () => setShow(false);

  // Function to show the modal and set the displayed event
  const handleShow = (item) => {
    setShow(true);
    setDisplayEvent(item);
  };

  // Function to fetch search results based on the search key
  const handleSearchEvent = async () => {
    try {
      const result = await searchEventsAPI(searchKey);
      if (result.status === 200) {
        setSearchData(result.data);
      }
    } catch (error) {
      console.error("Error searching events:", error);
    }
  };

  // Effect to check user's login status
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [logged]); // Re-run the effect when the logged state changes

  // Effect to handle search when the search key changes
  useEffect(() => {
    handleSearchEvent();
  }, [searchKey]); // Re-run the effect when the search key changes
  
  return (
    <>
      <Container style={{ minHeight: "100vh" }}>
        <input
          className="form-control w-100 mt-5"
          type="text"
          placeholder="Search events by name , place..."
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Row className="mt-4">
          {searchData.length > 0 ? (
            searchData.map((item) => (
              <Col sm={12} md={3} lg={3}>
                <div
                  className="d-flex flex-column "
                  style={{ width: "100%" }}
                  onClick={() => handleShow(item)}
                >
                  <div
                    style={{
                      width: "100%",
                      position: "relative",
                      height: "25vh",
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
                  <div className="w-100">
                    <h5
                      className="mt-2 text-uppercase w-100 "
                      style={{ color: "#8c8c8c" }}
                    >
                      {item.name}
                    </h5>
                    <p className="w-100 " style={{ color: "#8c8c8c" }}>
                      {item.location}
                    </p>
                    <p style={{ width: "240px", color: "#8c8c8c" }}>
                      ₹ {item.price[2]} onwards
                    </p>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              {" "}
              <h2 className="text-primary">No data found !!!</h2>
            </div>
          )}
        </Row>
      </Container>

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

export default SearchPost;
