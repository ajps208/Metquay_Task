import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { allEventAPI } from "../Services/allApi";
import { BASE_URL } from "../Services/baseURL";
import "./Banner.css";

function Banner() {
  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]); // State to store all events
  const [logged, setLogged] = useState(false); // State to track user login status

  // Function to handle button click to view ticket details
  const handleButtonClick = (id) => {
    navigate(`/ticket/${id}`);
  };

  // Function to handle login click
  const handleLoginClick = () => {
    navigate("/login");
  };

  // Function to fetch all events
  const getAllEvents = async () => {
    const result = await allEventAPI(); // Call the API to fetch all events
    setAllEvents(result.data.slice(0, 6)); // Set the state with the first 6 events
  };

  // useEffect hook to check if the user is logged in and fetch all events
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLogged(true); // If token is present in sessionStorage, user is logged in
    } else {
      setLogged(false); // Otherwise, user is not logged in
    }
    getAllEvents(); // Fetch all events when the component mounts or when the login status changes
  }, [logged]); // Re-run the effect when the login status changes
  
  return (
    <>
      <Carousel
        controls={false}
        indicators={false}
        style={{ position: "relative" }}
      >
        {allEvents.map((events) => (
          <Carousel.Item
            interval={3000}
            className="Carousel "
            key={events._id}
            style={{ height: "65vh" }}
          >
            <div className="carousel-overlay" />

            <img
              className="img-fluid h-100  "
              src={
                events.image
                  ? `${BASE_URL}/uploads/${events.image}`
                  : "https://cdn.pixabay.com/photo/2022/01/28/18/32/leaves-6975462_1280.png"
              }
              alt="Event slide"
            />
            <div className="carousel-content ms-3 d-flex flex-column p-3 text-light">
              <h2 className="fs-1 fw-bolder">{events.name}</h2>

              <p>{events.description.slice(0, 155)}...</p>
              <button
                onClick={
                  logged
                    ? () => handleButtonClick(events._id)
                    : handleLoginClick
                }
                className="btn text-light  h-50 w-50"
              >
                Get Your Tickets
              </button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default Banner;
