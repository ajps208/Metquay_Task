import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import BasicExample from "../components/Header";
import Banner from "../components/Banner";
import RowPost from "../components/RowPost";
import { allOtherEventAPI, allSportsAPI } from "../Services/allApi";

function LandingPage() {
  // State variables to store sports and other events
  const [sportsEvent, setSportEvent] = useState([]);
  const [otherEvent, setOtherEvent] = useState([]);

  // Function to fetch sports events from the API
  const getSports = async () => {
    try {
      const result = await allSportsAPI("");
      if (result.status === 200) {
        // Set the sports events state with the fetched data
        setSportEvent(result.data.slice(0, 4)); // Limit to the first 4 events
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch other events from the API
  const getOtherEvents = async () => {
    try {
      const result = await allOtherEventAPI("");
      if (result.status === 200) {
        // Set the other events state with the fetched data
        setOtherEvent(result.data.slice(0, 4)); // Limit to the first 4 events
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch sports and other events data when the component mounts
  useEffect(() => {
    getSports(); // Fetch sports events
    getOtherEvents(); // Fetch other events
  }, []);
  return (
    <>
      <BasicExample />
      <Banner />
      <div
        style={{
          backgroundColor: " #130f40",
          backgroundImage: "linear-gradient(315deg, #130f40 0%, #000000 74%)",
          color: "white",
        }}
      >
        <RowPost event={sportsEvent} url={"/sports"} title={"Sports"} />
        <RowPost event={otherEvent} url={"/events"} title={"Events"} />
      </div>
      {/* <RowPost title={"Movies"}/> */}
      <Footer />
    </>
  );
}

export default LandingPage;
