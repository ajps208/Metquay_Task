import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { EventAddAPI } from "../../USER/Services/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddEvent() {
  // State variables
  const [eventDetails, setEventDetails] = useState({
    event: "",
    category: "",
    subcategory: "",
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    galleryItems: [{ galleryName: "", price: "", totalTickets: "" }],
    image: "",
  });
  const [seat, setSeat] = useState([]);
  const [price, setPrice] = useState([]);
  const [qty, setQty] = useState([]);
  const [token, setToken] = useState("");

  // Handle changes in gallery items
  const handleGalleryItemChange = (index, field, value) => {
    const updatedGalleryItems = [...eventDetails.galleryItems];
    updatedGalleryItems[index][field] = value;
    setEventDetails({ ...eventDetails, galleryItems: updatedGalleryItems });

    // Update seat, price, qty arrays
    setSeat(updatedGalleryItems.map((item) => item.galleryName));
    setPrice(updatedGalleryItems.map((item) => item.price));
    setQty(updatedGalleryItems.map((item) => item.totalTickets));
  };

  // Add new gallery item
  const addGalleryItem = () => {
    setEventDetails({
      ...eventDetails,
      galleryItems: [
        ...eventDetails.galleryItems,
        { galleryName: "", price: "", totalTickets: "" },
      ],
    });
  };

  // Fetch token from sessionStorage on component mount
  useEffect(() => {
    if (sessionStorage.getItem("admintoken")) {
      setToken(sessionStorage.getItem("admintoken"));
    } else {
      setToken("");
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      event,
      category,
      subcategory,
      name,
      description,
      date,
      time,
      location,
      image,
    } = eventDetails;
    const reqBody = new FormData();
    reqBody.append("event", event);
    reqBody.append("category", category);
    reqBody.append("subcategory", subcategory);
    reqBody.append("name", name);
    reqBody.append("description", description);
    reqBody.append("date", date);
    reqBody.append("time", time);
    reqBody.append("location", location);
    reqBody.append("price", price);
    reqBody.append("seat", seat);
    reqBody.append("qty", qty);
    reqBody.append("image", image);
    const reqHeader = {
      "Content-Type": "multipart/form-data",
    };
    const result = await EventAddAPI(reqBody, reqHeader);
    if (result.status === 200) {
      toast.success("Event added");
      // Clear form fields and gallery items after successful submission
      setEventDetails({
        event: "",
        category: "",
        subcategory: "",
        name: "",
        description: "",
        date: "",
        time: "",
        location: "",
        galleryItems: [{ galleryName: "", price: "", totalTickets: "" }],
        image: "",
      });
      setPrice([]);
      setQty([]);
      setSeat([]);
    }
  };
  
  return (
    <>
      <Row className="w-100">
        <Col xs={12} md={2} lg={2}>
          <Sidebar />
        </Col>
        <Col xs={12} md={10} lg={10}>
          <Container className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="mt-5">ADD EVENTS</h1>
            <div
              style={{
                backgroundColor: " #130f40",
                backgroundImage:
                  "linear-gradient(315deg, #130f40 0%, #000000 74%)",
                color: "white",
              }}
              className=" p-4 rounded shadow-lg text-light"
            >
              <Row className="mb-3">
                <Col xs={12} sm={6} md={4} lg={4}>
                  <Form.Label className="pt-2">Event</Form.Label>
                  <Form.Select
                    className="bg-light border-0 shadow-lg"
                    value={eventDetails.event}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        event: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="" selected>
                      Select the Event
                    </option>
                    <option value="sports">SPORTS</option>
                    <option value="event">EVENTS</option>
                  </Form.Select>
                </Col>
                <Col xs={12} sm={6} md={4} lg={4}>
                  <Form.Label className="pt-2">Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    className="bg-light border-0 shadow-lg"
                    value={eventDetails.category}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        category: e.target.value,
                      })
                    }
                    required
                  />
                </Col>
                <Col xs={12} sm={6} md={4} lg={4}>
                  <Form.Label className="pt-2">Sub Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter subcategory"
                    className="bg-light border-0 shadow-lg"
                    value={eventDetails.subcategory}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        subcategory: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <Form.Label className="pt-2">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Description"
                    className="bg-light border-0 shadow-lg"
                    value={eventDetails.description}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <Form.Label className="pt-2">Name of Event</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name of event"
                    className="bg-light border-0 shadow-lg"
                    value={eventDetails.name}
                    onChange={(e) =>
                      setEventDetails({ ...eventDetails, name: e.target.value })
                    }
                    required
                  />
                </Col>
                <Col xs={12} sm={6} md={4} lg={4}>
                  <Form.Label className="pt-2">Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter date"
                    className="bg-light border-0 shadow-lg"
                    value={eventDetails.date}
                    onChange={(e) =>
                      setEventDetails({ ...eventDetails, date: e.target.value })
                    }
                    required
                  />
                </Col>
                <Col xs={12} sm={6} md={4} lg={4}>
                  <Form.Label className="pt-2">Time</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Time"
                    className="bg-light border-0 shadow-lg"
                    value={eventDetails.time}
                    onChange={(e) =>
                      setEventDetails({ ...eventDetails, time: e.target.value })
                    }
                    required
                  />
                </Col>
                <Col xs={12} sm={6} md={4} lg={4}>
                  <Form.Label className="pt-2">Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    className="bg-light border-0 shadow-lg"
                    value={eventDetails.location}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        location: e.target.value,
                      })
                    }
                    required
                  />
                </Col>
              </Row>
              <Row className="border rounded p-3 shadow-lg-lg">
                {eventDetails.galleryItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <Col xs={12} sm={6} md={3} lg={3}>
                      <Form.Label>Gallery Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Gallery"
                        className="bg-light border-0 shadow-lg"
                        value={item.galleryName}
                        onChange={(e) =>
                          handleGalleryItemChange(
                            index,
                            "galleryName",
                            e.target.value
                          )
                        }
                        required
                      />
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3}>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Price"
                        className="bg-light border-0 shadow-lg"
                        value={item.price}
                        onChange={(e) =>
                          handleGalleryItemChange(
                            index,
                            "price",
                            e.target.value
                          )
                        }
                        required
                      />
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3}>
                      <Form.Label>Total Tickets</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Tickets"
                        className="bg-light border-0 shadow-lg"
                        value={item.totalTickets}
                        onChange={(e) =>
                          handleGalleryItemChange(
                            index,
                            "totalTickets",
                            e.target.value
                          )
                        }
                        required
                      />
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3}>
                      <button
                        className="btn btn-info mt-4 shadow-lg"
                        onClick={addGalleryItem}
                      >
                        Add
                      </button>
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
              <Row className="mb-3 align-items-center">
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Form.Label className="mt-3">Event Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="bg-light border-0 shadow-lg"
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        image: e.target.files[0],
                      })
                    }
                    required
                  />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} className="mt-5">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary  shadow-lg"
                  >
                    ADD EVENT
                  </button>
                </Col>
              </Row>
            </div>
          </Container>
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}

export default AddEvent;
