import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "../../Config/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // ✅ For redirecting after logout

const Dashboard = () => {
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalVendors: 0,
    totalPurchaseInvoices: 0,
    totalPurchaseAmount: 0,
    totalSalesInvoices: 0,
    totalSalesAmount: 0,
    todaySalesCount: 0,
    todaySalesAmount: 0,
    todayPurchaseCount: 0,
    todayPurchaseAmount: 0,
    thisMonthSales: 0,
    thisMonthPurchase: 0,
    lastMonthSales: 0,
    lastMonthPurchase: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/total/summary`);
        console.log("Dashboard API Response:", res?.data);

        const data = res.data?.data ? res.data.data : res.data;

        setStats({
          totalCustomers: data?.totals?.customers || 0,
          totalVendors: data?.totals?.vendors || 0,
          totalPurchaseInvoices: data?.totals?.purchaseInvoices || 0,
          totalPurchaseAmount: data?.totals?.purchaseAmount?.toFixed(2) || 0,
          totalSalesInvoices: data?.totals?.salesInvoices || 0,
          totalSalesAmount: data?.totals?.salesAmount?.toFixed(2) || 0,

          todaySalesCount: data?.today?.sales?.count || 0,
          todaySalesAmount: data?.today?.sales?.totalAmount?.toFixed(2) || 0,
          todayPurchaseCount: data?.today?.purchase?.count || 0,
          todayPurchaseAmount:
            data?.today?.purchase?.totalAmount?.toFixed(2) || 0,

          thisMonthSales: data?.thisMonth?.sales?.totalAmount?.toFixed(2) || 0,
          thisMonthPurchase:
            data?.thisMonth?.purchase?.totalAmount?.toFixed(2) || 0,
          lastMonthSales: data?.lastMonth?.sales?.totalAmount?.toFixed(2) || 0,
          lastMonthPurchase:
            data?.lastMonth?.purchase?.totalAmount?.toFixed(2) || 0,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [api]);

  // Helper to calculate % change
  const calcChange = (current, prev) => {
    if (prev === 0 && current === 0) return "0%";
    if (prev === 0) return "∞";
    const diff = ((current - prev) / prev) * 100;
    return `${diff.toFixed(2)}%`;
  };

  const purchaseChange = calcChange(
    parseFloat(stats.thisMonthPurchase),
    parseFloat(stats.lastMonthPurchase)
  );
  const salesChange = calcChange(
    parseFloat(stats.thisMonthSales),
    parseFloat(stats.lastMonthSales)
  );

  // 🧾 Cards Data
  const cardData = [
    { label: "Total Customers", value: stats.totalCustomers, bg: "success" },
    { label: "Total Vendors", value: stats.totalVendors, bg: "info" },
    {
      label: "Total Purchase Invoices",
      value: stats.totalPurchaseInvoices,
      bg: "secondary",
    },
    {
      label: "Total Purchase Amount",
      value: `₹ ${stats.totalPurchaseAmount}`,
      bg: "warning",
    },
    {
      label: "Total Sales Invoices",
      value: stats.totalSalesInvoices,
      bg: "primary",
    },
    {
      label: "Total Sales Amount",
      value: `₹ ${stats.totalSalesAmount}`,
      bg: "danger",
    },
    {
      label: "Today's Sales",
      value: `${stats.todaySalesCount} (₹${stats.todaySalesAmount})`,
      bg: "success",
    },
    {
      label: "Today's Purchases",
      value: `${stats.todayPurchaseCount} (₹${stats.todayPurchaseAmount})`,
      bg: "dark",
    },
  ];

  // 🔒 LOGOUT FUNCTION
  const handleLogout = () => {
    // 1️⃣ Remove token from localStorage
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f6fa",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center bg-white px-4 py-3 shadow">
        <h5 className="mb-0 fw-bold">Welcome Aadarsh Agency</h5>

        {/* 🚪 Logout Button */}
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleLogout}
          style={{
            fontWeight: "600",
            borderRadius: "20px",
          }}
        >
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div fluid className="py-4">
        <div className="d-flex flex-wrap justify-content-start gap-3 px-1">
          {cardData.map((item, idx) => (
            <div
              key={idx}
              className={`bg-${item.bg} text-white text-center p-3 rounded shadow-sm`}
              style={{
                width: "11.5%",
                minWidth: "160px",
              }}
            >
              <div className="small fw-semibold">{item.label}</div>
              <div className="fs-5 fw-bold">{loading ? "..." : item.value}</div>
            </div>
          ))}
        </div>

        {/* KPI Table */}
        <div className="bg-white mt-4 rounded shadow p-3">
          <div style={{ overflowX: "auto" }}>
            <Table
              bordered
              hover
              responsive
              className="mb-0 text-center align-middle table-striped"
              style={{ borderCollapse: "separate", borderSpacing: "0" }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#ffc107",
                    color: "#212529",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                  }}
                >
                  <th style={{ padding: "12px" }}>Description</th>
                  <th style={{ padding: "12px" }}>This Month (₹)</th>
                  <th style={{ padding: "12px" }}>Last Month (₹)</th>
                  <th style={{ padding: "12px" }}>Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Purchase</td>
                  <td>₹ {stats.thisMonthPurchase}</td>
                  <td>₹ {stats.lastMonthPurchase}</td>
                  <td
                    style={{
                      color: parseFloat(purchaseChange) >= 0 ? "green" : "red",
                    }}
                  >
                    {purchaseChange}
                  </td>
                </tr>
                <tr>
                  <td>Total Sales</td>
                  <td>₹ {stats.thisMonthSales}</td>
                  <td>₹ {stats.lastMonthSales}</td>
                  <td
                    style={{
                      color: parseFloat(salesChange) >= 0 ? "green" : "red",
                    }}
                  >
                    {salesChange}
                  </td>
                </tr>
                <tr>
                  <td>Today's Sales</td>
                  <td colSpan={3}>₹ {stats.todaySalesAmount}</td>
                </tr>
                <tr>
                  <td>Today's Purchases</td>
                  <td colSpan={3}>₹ {stats.todayPurchaseAmount}</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="text-center mt-3">
            <Button variant="primary">Go to Reports Page</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
