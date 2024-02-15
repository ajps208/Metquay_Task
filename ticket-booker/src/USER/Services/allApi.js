import { BASE_URL } from "./baseURL";
import { commonAPI } from "./commonApi";

// register
export const registerAPI = async (user) => {
  return await commonAPI("POST", `${BASE_URL}/user/register`, user, "");
};

// login
export const loginrAPI = async (user) => {
  return await commonAPI("POST", `${BASE_URL}/user/login`, user, "");
};

// all events
export const allEventAPI = async () => {
  return await commonAPI("GET", `${BASE_URL}/events/getevents`, "", "");
};

// get one events
export const oneEventAPI = async (eventId) => {
  return await commonAPI(
    "GET",
    `${BASE_URL}/events/oneevent?id=${eventId}`,
    "",
    ""
  );
};

// all sports events
export const allSportsAPI = async (searchKey) => {
  return await commonAPI(
    "GET",
    `${BASE_URL}/events/getsports?search=${searchKey}`,
    "",
    ""
  );
};

// all other events
export const allOtherEventAPI = async (searchKey) => {
  return await commonAPI(
    "GET",
    `${BASE_URL}/events/getotherevents?search=${searchKey}`,
    "",
    ""
  );
};

// all other events
export const paymentAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${BASE_URL}/events/payment`,
    reqBody,
    reqHeader
  );
};

// add orders
export const addOrdersAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${BASE_URL}/order/addorder`,
    reqBody,
    reqHeader
  );
};

// edit event
export const editEventAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${BASE_URL}/event/editevent`,
    reqBody,
    reqHeader
  );
};

// send email
export const sendEmailAPI = async (emailData) => {
  return await commonAPI("POST", `${BASE_URL}/order/send-email`, emailData, "");
};

// get order
export const getOrderAPI = async (reqHeader) => {
  return await commonAPI("GET", `${BASE_URL}/order/getorder`, "", reqHeader);
};

// get admin login

export const loginAPI = async (admin) => {
  return await commonAPI("POST", `${BASE_URL}/admin/login`, admin, "");
};

// event add
export const EventAddAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${BASE_URL}/events/addevent`,
    reqBody,
    reqHeader
  );
};

// event delete
export const EventDeleteAPI = async (eventid) => {
  return await commonAPI(
    "DELETE",
    `${BASE_URL}/events/delete/${eventid}`,
    {},
    {}
  );
};

// get complete order data
export const completeOrderAPI = async () => {
  return await commonAPI("GET", `${BASE_URL}/order/alldetails`, "", "");
};

// all events by search
export const searchEventsAPI = async (searchKey) => {
  return await commonAPI(
    "GET",
    `${BASE_URL}/events/searchevent?search=${searchKey}`,
    "",
    ""
  );
};

// send otp
export const sendotpAPI = async (emailData) => {
  return await commonAPI("POST", `${BASE_URL}/user/send-otp`, emailData, "");
};

// edit user password
export const chanhePaawordAPI = async (reqBody) => {
  return await commonAPI("PUT", `${BASE_URL}/user/change`, reqBody, "");
};
