import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SalesReport = () => {
  const api = import.meta.env.VITE_API;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    location: "",
    shopName: "",
    salesmanName: "",
    productName: "",
    fromDate: "",
    toDate: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // ✅ Fetch API Data
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(`${api}/reportss/inventory-customer`);
        const res2 = await axios.get(`${api}/reportss/inventory-vendor`);
        console.log(res2, "vendor reports");

        const invoices = res?.data?.invoices || [];
        console.log("Fetched invoices:", invoices);
        setData(invoices);
        setFilteredData(invoices);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };
    fetchReports();
  }, []);

  // ✅ Extract unique dropdown options
  const locations = [
    ...new Set(data.map((d) => d?.customer?.selectedCustomerId?.area || "")),
  ].filter(Boolean);
  const shopNames = [
    ...new Set(data.map((d) => d?.customer?.CustomerName || "")),
  ].filter(Boolean);
  const salesmanNames = [
    ...new Set(data.map((d) => d?.customer?.salesmanName || "")),
  ].filter(Boolean);
  const productNames = [
    ...new Set(
      data.flatMap((d) => d?.billing?.map((b) => b.itemName || "") || [])
    ),
  ].filter(Boolean);

  // ✅ Filtering Logic
  useEffect(() => {
    let filtered = [...data];

    if (filter.location)
      filtered = filtered.filter(
        (d) =>
          d?.customer?.selectedCustomerId?.area?.toLowerCase() ===
          filter.location.toLowerCase()
      );

    if (filter.shopName)
      filtered = filtered.filter(
        (d) =>
          d?.customer?.CustomerName?.toLowerCase() ===
          filter.shopName.toLowerCase()
      );

    if (filter.salesmanName)
      filtered = filtered.filter(
        (d) =>
          d?.customer?.salesmanName?.toLowerCase() ===
          filter.salesmanName.toLowerCase()
      );

    if (filter.productName)
      filtered = filtered.filter((d) =>
        d.billing?.some(
          (b) => b.itemName?.toLowerCase() === filter.productName.toLowerCase()
        )
      );

    if (filter.fromDate && filter.toDate) {
      filtered = filtered.filter((d) => {
        const date = new Date(d.billDate);
        return (
          date >= new Date(filter.fromDate) && date <= new Date(filter.toDate)
        );
      });
    }

    setFilteredData(filtered);
  }, [filter, data]);

  // ✅ Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) => {
      const aVal =
        key === "productName"
          ? a.billing?.[0]?.itemName || ""
          : key === "amount"
          ? a.finalAmount
          : key === "qty"
          ? a.billing?.[0]?.qty || 0
          : key === "date"
          ? new Date(a.billDate)
          : "";

      const bVal =
        key === "productName"
          ? b.billing?.[0]?.itemName || ""
          : key === "amount"
          ? b.finalAmount
          : key === "qty"
          ? b.billing?.[0]?.qty || 0
          : key === "date"
          ? new Date(b.billDate)
          : "";

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sorted);
  };

  return (
    <div className="container py-4">
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-center fw-bold mb-4 text-primary">Sales Report</h2>

        {/* ✅ Filters Section */}
        <div className="border rounded p-3 bg-light mb-4">
          <h5 className="fw-semibold mb-3 text-success">Filter Data</h5>
          <div className="row g-3">
            <div className="col-md-2">
              <select
                className="form-select"
                value={filter.location}
                onChange={(e) =>
                  setFilter({ ...filter, location: e.target.value })
                }
              >
                <option value="">All Locations</option>
                {locations.map((loc, i) => (
                  <option key={i} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                value={filter.shopName}
                onChange={(e) =>
                  setFilter({ ...filter, shopName: e.target.value })
                }
              >
                <option value="">All Shops</option>
                {shopNames.map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                value={filter.salesmanName}
                onChange={(e) =>
                  setFilter({ ...filter, salesmanName: e.target.value })
                }
              >
                <option value="">All Salesmen</option>
                {salesmanNames.map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                value={filter.productName}
                onChange={(e) =>
                  setFilter({ ...filter, productName: e.target.value })
                }
              >
                <option value="">All Products</option>
                {productNames.map((p, i) => (
                  <option key={i} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                value={filter.fromDate}
                onChange={(e) =>
                  setFilter({ ...filter, fromDate: e.target.value })
                }
              />
            </div>

            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                value={filter.toDate}
                onChange={(e) =>
                  setFilter({ ...filter, toDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* ✅ Data Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-white">
              <tr>
                <th>#</th>
                <th>Location</th>
                <th>Shop Name</th>
                <th>Salesman</th>
                <th
                  onClick={() => handleSort("productName")}
                  style={{ cursor: "pointer" }}
                >
                  Product Name ⬍
                </th>
                <th
                  onClick={() => handleSort("qty")}
                  style={{ cursor: "pointer" }}
                >
                  Qty ⬍
                </th>
                <th
                  onClick={() => handleSort("amount")}
                  style={{ cursor: "pointer" }}
                >
                  Amount ⬍
                </th>
                <th
                  onClick={() => handleSort("date")}
                  style={{ cursor: "pointer" }}
                >
                  Date ⬍
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((d, i) => (
                  <tr key={d._id}>
                    <td>{i + 1}</td>
                    <td>{d?.customer?.selectedCustomerId?.area}</td>
                    <td>{d?.customer?.CustomerName}</td>
                    <td>{d?.customer?.salesmanName}</td>
                    <td>{d?.billing?.[0]?.itemName}</td>
                    <td>{d?.billing?.[0]?.qty}</td>
                    <td>₹{d?.finalAmount?.toLocaleString()}</td>
                    <td>{new Date(d?.billDate).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-muted py-4">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
