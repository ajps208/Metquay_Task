import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getOrderAPI, oneEventAPI } from "../Services/allApi";
import { BASE_URL } from "../Services/baseURL";
import nodata from "../../Assets/nodata.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BasicExample from "../components/Header";


function OrderView() {
  // State variables to store orders and loading state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch orders from the API
  const handleGetOrders = async () => {
    try {
      // Retrieve the token from sessionStorage
      const token = sessionStorage.getItem("token");
      
      // Prepare the request header with the token for authorization
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Fetch orders using the getOrderAPI function with the authorization header
      const result = await getOrderAPI(reqHeader);

      if (result.status === 200) {
        // If orders are successfully fetched, process them further
        const ordersWithEventInfo = await Promise.all(
          // Map through each order to fetch additional event information
          result.data.map(async (order) => {
            // Fetch event information for each order using the oneEventAPI function
            const eventInfo = await oneEventAPI(order.eventId);
            // Combine order information with event information
            return { ...order, eventInfo };
          })
        );
        
        // Sort orders based on the order date in descending order
        const sortedOrders = ordersWithEventInfo.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
        
        // Update the state with the sorted orders
        setOrders(sortedOrders);
      } else {
        // Handle failure to fetch orders
        console.error("Failed to fetch orders:", result.error);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error:", error);
    } finally {
      // Set loading state to false after fetching orders
      setLoading(false);
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    handleGetOrders();
  }, []);

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

      <Container>
        <h2 className="text-start text-success mt-5 mb-3">
          Orders <i className="fa-solid fa-clipboard-check"></i>
        </h2>

        {loading ? (
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton count={5} />
          </SkeletonTheme>
        ) : orders.length > 0 ? (
          orders.map((order, index) => (
            <Row
              key={index}
              className="border rounded shadow d-flex align-items-center justify-content-center mt-3"
            >
              <Col xs={4} md={1} lg={1}>
                <span className="text-success">#:</span> <br />
                <span className="text-light mt-1 ">{index + 1}</span>
              </Col>
              <Col xs={4} md={3} lg={3}>
                <span className="text-success">Event:</span> <br />
                <span className="text-light mt-1 text-uppercase">
                  {order.eventInfo && order.eventInfo.data
                    ? order.eventInfo.data.name
                    : "N/A"}
                </span>
              </Col>
              <Col xs={4} md={2} lg={2} className="p-1">
                <img
                  className="img-fluid w-25 shadow rounded"
                  src={
                    order.eventInfo && order.eventInfo.data
                      ? `${BASE_URL}/uploads/${order.eventInfo.data.image}`
                      : "N/A"
                  }
                  alt=""
                />
              </Col>
              <Col xs={4} md={1} lg={1}>
                <span className="text-success">Qty:</span> <br />
                <span className="text-light mt-1">{order.qty}</span>
              </Col>
              <Col xs={4} md={2} lg={2}>
                <span className="text-success">Price:</span> <br />
                <span className="text-light mt-1">{order.orderPrice} ₹</span>
              </Col>
              <Col xs={4} md={2} lg={2}>
                <span className="text-success">Date:</span> <br />
                <span className="text-light mt-1">{order.orderDate}</span>
              </Col>
            </Row>
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <img className="img-fluid" width={"150px"} src={nodata} alt="" />
            <h2 className="text-primary">No data found !!!</h2>
          </div>
        )}
      </Container>
    </div>
  );
}

export default OrderView;
