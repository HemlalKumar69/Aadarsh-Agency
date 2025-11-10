import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesManWindow = () => {
  const [salesmen, setSalesmen] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesRes, custRes] = await Promise.all([
          axios.get("/salesman"),
          axios.get("/customer"),
        ]);

        // fix here: ensure salesmen is always array
        setSalesmen(salesRes.data?.Data || []); 
        setCustomers(custRes.data?.Data || []);

        console.log("Salesmen:", salesRes.data);
        console.log("Customers:", custRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <table>
        <thead>
          <tr>
            <th>Area Name</th>
            <th>No of Shop</th>
            <th>No. of Salesman Assigned</th>
          </tr>
        </thead>
        <tbody>
          {salesmen.length > 0 ? (
            salesmen.map((s, i) => (
              <tr key={i}>
                <td>{s.beat?.map((b) => b.area).join(", ")}</td>
                <td>{/* Replace with actual shop count if available */}</td>
                <td>{/* Replace with assigned salesman count if available */}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No salesmen found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesManWindow;
