import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import { completeOrderAPI } from "../../USER/Services/allApi";

const DataTableComponent = () => {
  // State variables
  const [ordersData, setOrderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch orders data from API
  const fetchData = async () => {
    try {
      const result = await completeOrderAPI();
      console.log("API Result:", result);

      if (result.status === 200) {
        // Sort orders by order date
        const sortedOrders = result.data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );

        setOrderData(sortedOrders);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Filter orders based on search term
  const filteredOrders = ordersData.filter(
    (order) =>
      order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderPrice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.qty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-100">
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="form-control w-25 mb-4 mt-4"
        />
      </div>
      {filteredOrders.length > 0 ? (
        <table className="table table-striped table-bordered table-sm">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Payment ID</th>
              <th>Event</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.paymentId}>
                <td>{order.username}</td>
                <td>{order.email}</td>
                <td>{order.paymentId}</td>
                <td>{order.eventName}</td>
                <td>{order.orderPrice}</td>
                <td>{order.qty}</td>
                <td>{order.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No matching data</p>
      )}
    </div>
  );
};

export default DataTableComponent;
