// Importing required modules and eventSchema model
const events = require("../Model/eventSchema");
const jwt = require("jsonwebtoken");

// Function to add events
exports.addEvents = async (req, res) => {
  console.log("inside the event add");
  console.log(req.body);

  // Destructuring request body and extracting image filename
  const image = req.file.filename;
  const {
    event,
    category,
    subcategory,
    name,
    description,
    date,
    time,
    location,
    price,
    seat,
    qty,
  } = req.body;

  try {
    // Parsing price and quantity strings into arrays of numbers
    const parsedPrice = price.split(",").map(Number);
    const parsedSeat = seat.split(",");
    const parsedQty = qty.split(",").map(Number);

    // Creating a new event object and saving it to the database
    const newEvent = new events({
      event,
      category,
      subcategory,
      name,
      description,
      date,
      time,
      location,
      price: parsedPrice,
      seat: parsedSeat,
      image,
      qty: parsedQty,
    });

    await newEvent.save();
    console.log(newEvent);
    res.status(200).json(newEvent); // Responding with the newly created event
  } catch (error) {
    console.log(error);
    res.status(401).json(`Request failed: ${error}`); // Responding with error message if operation fails
  }
};

// Function to get all events
exports.getEvents = async (req, res) => {
  try {
    const result = await events.find();
    res.status(200).json(result); // Responding with all events
  } catch (error) {
    res.status(401).json(error); // Responding with error message if operation fails
  }
};

// Function to get one event by ID
exports.oneEvents = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await events.findById(id);
    res.status(200).json(result); // Responding with the specific event
  } catch (error) {
    res.status(401).json(error); // Responding with error message if operation fails
  }
};

// Function to get all sports events
exports.getSportsEvents = async (req, res) => {
  // Filtering sports events by category and search key
  const searchKey = req.query.search;
  const query = {
    event: "sports",
    category: { $regex: searchKey, $options: "i" },
  };

  try {
    const result = await events.find(query);
    res.status(200).json(result); // Responding with sports events
  } catch (error) {
    res.status(401).json(error); // Responding with error message if operation fails
  }
};

// Function to get all other events
exports.getOtherEvents = async (req, res) => {
  // Filtering other events by category and search key
  const searchKey = req.query.search;
  const query = {
    event: "event",
    category: { $regex: searchKey, $options: "i" },
  };

  try {
    const result = await events.find(query);
    res.status(200).json(result); // Responding with other events
  } catch (error) {
    res.status(401).json(error); // Responding with error message if operation fails
  }
};

// Function to edit events
exports.editEvents = async (req, res) => {
  console.log("inside the edit event");
  const userId = req.payload;
  const { ticket, ticketQty } = req.body;

  try {
    // Updating event details based on ID
    const result = await events.findByIdAndUpdate(
      { _id: ticket._id },
      { ...ticket, qty: ticketQty },
      { new: true }
    );
    await result.save();
    res.status(200).json(result); // Responding with the updated event
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Responding with error message if operation fails
  }
};

// Function to delete event
exports.deleteEvent = async (req, res) => {
  console.log("inside the delete");
  const { eventid } = req.params;

  try {
    const result = await events.findByIdAndDelete({ _id: eventid });
    res.status(200).json(result); // Responding with success message upon deletion
  } catch (error) {
    console.log(error);
    res.status(401).json(error); // Responding with error message if operation fails
  }
};

// Function to get events by specific search criteria
exports.getSearchEvents = async (req, res) => {
  console.log("inside specificsearch ");
  const searchKey = req.query.search;
  console.log(searchKey);
  const regexPattern = new RegExp(searchKey, "i");

  try {
    // Searching events based on various criteria
    const result = await events.find({
      $or: [
        { event: { $regex: regexPattern } },
        { category: { $regex: regexPattern } },
        { subcategory: { $regex: regexPattern } },
        { name: { $regex: regexPattern } },
        { description: { $regex: regexPattern } },
        { date: { $regex: regexPattern } },
        { time: { $regex: regexPattern } },
        { location: { $regex: regexPattern } },
      ],
    });
    console.log(result);
    res.status(200).json(result); // Responding with the matched events
  } catch (error) {
    console.log(error);
    res.status(401).json(error); // Responding with error message if operation fails
  }
};
