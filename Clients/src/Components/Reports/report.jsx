// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const SalesReport = () => {
// //     const api = import.meta.env.VITE_API;
// //     const [data, setData] = useState([]);
// //     const [filteredData, setFilteredData] = useState([]);
// //     const [filter, setFilter] = useState({
// //         location: "",
// //         shopName: "",
// //         salesmanName: "",
// //         productName: "",
// //         fromDate: "",
// //         toDate: "",
// //     });
// //     const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

// //     // ✅ Fetch API Data
// //     useEffect(() => {
// //         const fetchReports = async () => {
// //             try {
// //                 const res = await axios.get(`${api}/reportss/inventory-customer`);
// //                 // const res2 = await axios.get(`${api}/reportss/inventory-vendor`);
// //                 // console.log(res2, "vendor reports");

// //                 const invoices = res?.data?.invoices || [];
// //                 console.log("Fetched invoices:", invoices);
// //                 setData(invoices);
// //                 setFilteredData(invoices);
// //             } catch (err) {
// //                 console.error("Error fetching reports:", err);
// //             }
// //         };
// //         fetchReports();
// //     }, []);

// //     // ✅ Extract unique dropdown options
// //     const locations = [
// //         ...new Set(data.map((d) => d?.customer?.selectedCustomerId?.area || "")),
// //     ].filter(Boolean);
// //     const shopNames = [
// //         ...new Set(data.map((d) => d?.customer?.CustomerName || "")),
// //     ].filter(Boolean);
// //     const salesmanNames = [
// //         ...new Set(data.map((d) => d?.customer?.salesmanName || "")),
// //     ].filter(Boolean);
// //     const productNames = [
// //         ...new Set(
// //             data.flatMap((d) => d?.billing?.map((b) => b.itemName || "") || [])
// //         ),
// //     ].filter(Boolean);

// //     // ✅ Filtering Logic
// //     useEffect(() => {
// //         let filtered = [...data];

// //         if (filter.location)
// //             filtered = filtered.filter(
// //                 (d) =>
// //                     d?.customer?.selectedCustomerId?.area?.toLowerCase() ===
// //                     filter.location.toLowerCase()
// //             );

// //         if (filter.shopName)
// //             filtered = filtered.filter(
// //                 (d) =>
// //                     d?.customer?.CustomerName?.toLowerCase() ===
// //                     filter.shopName.toLowerCase()
// //             );

// //         if (filter.salesmanName)
// //             filtered = filtered.filter(
// //                 (d) =>
// //                     d?.customer?.salesmanName?.toLowerCase() ===
// //                     filter.salesmanName.toLowerCase()
// //             );

// //         if (filter.productName)
// //             filtered = filtered.filter((d) =>
// //                 d.billing?.some(
// //                     (b) => b.itemName?.toLowerCase() === filter.productName.toLowerCase()
// //                 )
// //             );

// //         if (filter.fromDate && filter.toDate) {
// //             filtered = filtered.filter((d) => {
// //                 const date = new Date(d.billDate);
// //                 return (
// //                     date >= new Date(filter.fromDate) && date <= new Date(filter.toDate)
// //                 );
// //             });
// //         }

// //         setFilteredData(filtered);
// //     }, [filter, data]);

// //     // ✅ Sorting
// //     const handleSort = (key) => {
// //         let direction = "asc";
// //         if (sortConfig.key === key && sortConfig.direction === "asc") {
// //             direction = "desc";
// //         }
// //         setSortConfig({ key, direction });

// //         const sorted = [...filteredData].sort((a, b) => {
// //             const aVal =
// //                 key === "productName"
// //                     ? a.billing?.[0]?.itemName || ""
// //                     : key === "amount"
// //                         ? a.finalAmount
// //                         : key === "qty"
// //                             ? a.billing?.[0]?.qty || 0
// //                             : key === "date"
// //                                 ? new Date(a.billDate)
// //                                 : "";

// //             const bVal =
// //                 key === "productName"
// //                     ? b.billing?.[0]?.itemName || ""
// //                     : key === "amount"
// //                         ? b.finalAmount
// //                         : key === "qty"
// //                             ? b.billing?.[0]?.qty || 0
// //                             : key === "date"
// //                                 ? new Date(b.billDate)
// //                                 : "";

// //             if (aVal < bVal) return direction === "asc" ? -1 : 1;
// //             if (aVal > bVal) return direction === "asc" ? 1 : -1;
// //             return 0;
// //         });

// //         setFilteredData(sorted);
// //     };

// //     return (
// //         <div className="container py-4">
// //             <div className="bg-white p-4 shadow rounded">
// //                 <h2 className="text-center fw-bold mb-4 text-primary">Sales Report</h2>

// //                 {/* ✅ Filters Section */}
// //                 <div className="border rounded p-3 bg-light mb-4">
// //                     <h5 className="fw-semibold mb-3 text-success">Filter Data</h5>
// //                     <div className="row g-3">
// //                         <div className="col-md-2">
// //                             <select
// //                                 className="form-select"
// //                                 value={filter.location}
// //                                 onChange={(e) =>
// //                                     setFilter({ ...filter, location: e.target.value })
// //                                 }
// //                             >
// //                                 <option value="">All Locations</option>
// //                                 {locations.map((loc, i) => (
// //                                     <option key={i} value={loc}>
// //                                         {loc}
// //                                     </option>
// //                                 ))}
// //                             </select>
// //                         </div>

// //                         <div className="col-md-2">
// //                             <select
// //                                 className="form-select"
// //                                 value={filter.shopName}
// //                                 onChange={(e) =>
// //                                     setFilter({ ...filter, shopName: e.target.value })
// //                                 }
// //                             >
// //                                 <option value="">All Shops</option>
// //                                 {shopNames.map((name, i) => (
// //                                     <option key={i} value={name}>
// //                                         {name}
// //                                     </option>
// //                                 ))}
// //                             </select>
// //                         </div>

// //                         <div className="col-md-2">
// //                             <select
// //                                 className="form-select"
// //                                 value={filter.salesmanName}
// //                                 onChange={(e) =>
// //                                     setFilter({ ...filter, salesmanName: e.target.value })
// //                                 }
// //                             >
// //                                 <option value="">All Salesmen</option>
// //                                 {salesmanNames.map((name, i) => (
// //                                     <option key={i} value={name}>
// //                                         {name}
// //                                     </option>
// //                                 ))}
// //                             </select>
// //                         </div>

// //                         <div className="col-md-2">
// //                             <select
// //                                 className="form-select"
// //                                 value={filter.productName}
// //                                 onChange={(e) =>
// //                                     setFilter({ ...filter, productName: e.target.value })
// //                                 }
// //                             >
// //                                 <option value="">All Products</option>
// //                                 {productNames.map((p, i) => (
// //                                     <option key={i} value={p}>
// //                                         {p}
// //                                     </option>
// //                                 ))}
// //                             </select>
// //                         </div>

// //                         <div className="col-md-2">
// //                             <input
// //                                 type="date"
// //                                 className="form-control"
// //                                 value={filter.fromDate}
// //                                 onChange={(e) =>
// //                                     setFilter({ ...filter, fromDate: e.target.value })
// //                                 }
// //                             />
// //                         </div>

// //                         <div className="col-md-2">
// //                             <input
// //                                 type="date"
// //                                 className="form-control"
// //                                 value={filter.toDate}
// //                                 onChange={(e) =>
// //                                     setFilter({ ...filter, toDate: e.target.value })
// //                                 }
// //                             />
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* ✅ Data Table */}
// //                 <div className="table-responsive">
// //                     <table className="table table-bordered table-hover align-middle text-center">
// //                         <thead className="table-white">
// //                             <tr>
// //                                 <th>#</th>
// //                                 <th>Location</th>
// //                                 <th>Shop Name</th>
// //                                 <th>Salesman</th>
// //                                 <th
// //                                     onClick={() => handleSort("productName")}
// //                                     style={{ cursor: "pointer" }}
// //                                 >
// //                                     Product Name ⬍
// //                                 </th>
// //                                 <th
// //                                     onClick={() => handleSort("qty")}
// //                                     style={{ cursor: "pointer" }}
// //                                 >
// //                                     Qty ⬍
// //                                 </th>
// //                                 <th
// //                                     onClick={() => handleSort("amount")}
// //                                     style={{ cursor: "pointer" }}
// //                                 >
// //                                     Amount ⬍
// //                                 </th>
// //                                 <th
// //                                     onClick={() => handleSort("date")}
// //                                     style={{ cursor: "pointer" }}
// //                                 >
// //                                     Date ⬍
// //                                 </th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {filteredData.length > 0 ? (
// //                                 filteredData.map((d, i) => (
// //                                     <tr key={d._id}>
// //                                         <td>{i + 1}</td>
// //                                         <td>{d?.customer?.selectedCustomerId?.area}</td>
// //                                         <td>{d?.customer?.CustomerName}</td>
// //                                         <td>{d?.customer?.salesmanName}</td>
// //                                         <td>{d?.billing?.[0]?.itemName}</td>
// //                                         <td>{d?.billing?.[0]?.qty}</td>
// //                                         <td>₹{d?.finalAmount?.toLocaleString()}</td>
// //                                         <td>{new Date(d?.billDate).toLocaleDateString("en-IN")}</td>
// //                                     </tr>
// //                                 ))
// //                             ) : (
// //                                 <tr>
// //                                     <td colSpan="8" className="text-muted py-4">
// //                                         No records found
// //                                     </td>
// //                                 </tr>
// //                             )}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default SalesReport;


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const SalesReport = () => {
//   const api = import.meta.env.VITE_API;

//   const [activeReport, setActiveReport] = useState("sales"); // sales | purchase
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
//   const tableRef = useRef(null);

//   // Fetch API Data
//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const url =
//           activeReport === "sales"
//             ? `${api}/reportss/inventory-customer`
//             : `${api}/reportss/inventory-vendor`;
//         const res = await axios.get(url);
//         const fetchedData =
//           activeReport === "sales" ? res.data.invoices : res.data.purchases;
//         setData(fetchedData);
//         setFilteredData(fetchedData);
//       } catch (err) {
//         console.error("Error fetching reports:", err);
//       }
//     };
//     fetchReports();
//   }, [activeReport]);

//   // Sorting
//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });

//     const sorted = [...filteredData].sort((a, b) => {
//       const getVal = (d) => {
//         if (key === "productName") {
//           return activeReport === "sales"
//             ? d.billing?.[0]?.itemName || ""
//             : d.items?.[0]?.productId?.productName || "";
//         }
//         if (key === "amount") return d.finalAmount;
//         if (key === "qty") {
//           return activeReport === "sales"
//             ? d.billing?.[0]?.qty || 0
//             : d.items?.[0]?.quantity || 0;
//         }
//         if (key === "date") return activeReport === "sales" ? new Date(d.billDate) : new Date(d.date);
//         return "";
//       };

//       const aVal = getVal(a);
//       const bVal = getVal(b);

//       if (aVal < bVal) return direction === "asc" ? -1 : 1;
//       if (aVal > bVal) return direction === "asc" ? 1 : -1;
//       return 0;
//     });

//     setFilteredData(sorted);
//   };

//   // Scroll table using arrow buttons
//   const scrollTable = (direction) => {
//     if (!tableRef.current) return;
//     tableRef.current.scrollBy({
//       top: direction === "up" ? -100 : 100,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="container py-4">
//       {/* Arrow Buttons */}
//       <div className="d-flex justify-content-end gap-2 mb-2">
//         <button className="btn btn-secondary" onClick={() => scrollTable("up")}>
//           ↑
//         </button>
//         <button className="btn btn-secondary" onClick={() => scrollTable("down")}>
//           ↓
//         </button>
//       </div>

//       {/* Scrollable Table */}
//       <div
//         className="table-responsive"
//         style={{ maxHeight: "500px", overflowY: "auto" }}
//         ref={tableRef}
//       >
//         <table className="table table-bordered table-hover align-middle text-center">
//           <thead className="table-white sticky-top bg-white" style={{ top: 0, zIndex: 5 }}>
//             <tr>
//               <th>#</th>
//               {activeReport === "sales" && <th>Location</th>}
//               {activeReport === "purchase" && <th>Firm Name</th>}
//               {activeReport === "sales" && <th>Shop Name</th>}
//               {activeReport === "sales" && <th>Salesman</th>}
//               <th onClick={() => handleSort("productName")} style={{ cursor: "pointer" }}>
//                 Product Name ⬍
//               </th>
//               <th onClick={() => handleSort("qty")} style={{ cursor: "pointer" }}>
//                 Qty ⬍
//               </th>
//               <th onClick={() => handleSort("amount")} style={{ cursor: "pointer" }}>
//                 Amount ⬍
//               </th>
//               <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
//                 Date ⬍
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((d, i) => (
//                 <tr key={d._id}>
//                   <td>{i + 1}</td>
//                   {activeReport === "sales" && <td>{d?.customer?.selectedCustomerId?.area}</td>}
//                   {activeReport === "purchase" && <td>{d?.vendorId?.firm}</td>}
//                   {activeReport === "sales" && <td>{d?.customer?.CustomerName}</td>}
//                   {activeReport === "sales" && <td>{d?.customer?.salesmanName}</td>}
//                   <td>
//                     {activeReport === "sales"
//                       ? d?.billing?.[0]?.itemName
//                       : d?.items?.[0]?.productId?.productName || "N/A"}
//                   </td>
//                   <td>
//                     {activeReport === "sales"
//                       ? d?.billing?.[0]?.qty
//                       : d?.items?.[0]?.quantity}
//                   </td>
//                   <td>₹{d?.finalAmount?.toLocaleString()}</td>
//                   <td>
//                     {new Date(activeReport === "sales" ? d?.billDate : d?.date).toLocaleDateString("en-IN")}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-muted py-4">
//                   No records found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SalesReport;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SalesReport = () => {
    const api = import.meta.env.VITE_API;

    const [activeReport, setActiveReport] = useState("sales"); // sales | purchase
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

    // Fetch API Data based on active report
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const url =
                    activeReport === "sales"
                        ? `${api}/reportss/inventory-customer`
                        : `${api}/reportss/inventory-vendor`;
                const res = await axios.get(url);
                const fetchedData =
                    activeReport === "sales" ? res.data.invoices : res.data.purchases;
                setData(fetchedData);
                setFilteredData(fetchedData);
            } catch (err) {
                console.error("Error fetching reports:", err);
            }
        };
        fetchReports();
    }, [activeReport]);

    // Extract dropdown options
    const firmNames =
        activeReport === "purchase"
            ? [...new Set(data.map((d) => d.vendorId?.firm || ""))].filter(Boolean)
            : [];
    const locations =
        activeReport === "sales"
            ? [...new Set(data.map((d) => d?.customer?.selectedCustomerId?.area || ""))].filter(Boolean)
            : [];
    const shopNames =
        activeReport === "sales"
            ? [...new Set(data.map((d) => d?.customer?.CustomerName || ""))].filter(Boolean)
            : [];
    const salesmanNames =
        activeReport === "sales"
            ? [...new Set(data.map((d) => d?.customer?.salesmanName || ""))].filter(Boolean)
            : [];
    const productNames = [
        ...new Set(
            data.flatMap((d) =>
                activeReport === "sales"
                    ? d?.billing?.map((b) => b.itemName || []) || []
                    : d?.items?.map((b) => b.productId?.productName || "") || []
            )
        ),
    ].filter(Boolean);

    // Filtering logic
    useEffect(() => {
        let filtered = [...data];

        if (activeReport === "sales") {
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
        } else if (activeReport === "purchase") {
            if (filter.location)
                filtered = filtered.filter(
                    (d) => d.vendorId?.firm?.toLowerCase() === filter.location.toLowerCase()
                );
        }

        if (filter.productName)
            filtered = filtered.filter((d) =>
                activeReport === "sales"
                    ? d.billing?.some(
                        (b) => b.itemName?.toLowerCase() === filter.productName.toLowerCase()
                    )
                    : d.items?.some(
                        (b) => b.productId?.productName?.toLowerCase() === filter.productName.toLowerCase()
                    )
            );

        if (filter.fromDate && filter.toDate)
            filtered = filtered.filter((d) => {
                const date =
                    activeReport === "sales" ? new Date(d.billDate) : new Date(d.date);
                return date >= new Date(filter.fromDate) && date <= new Date(filter.toDate);
            });

        setFilteredData(filtered);
    }, [filter, data, activeReport]);

    // Sorting
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });

        const sorted = [...filteredData].sort((a, b) => {
            const getVal = (d) => {
                if (key === "productName") {
                    return activeReport === "sales"
                        ? d.billing?.[0]?.itemName || ""
                        : d.items?.[0]?.productId?.productName || "";
                }
                if (key === "amount") return d.finalAmount;
                if (key === "qty") {
                    return activeReport === "sales"
                        ? d.billing?.[0]?.qty || 0
                        : d.items?.[0]?.quantity || 0;
                }
                if (key === "date") return activeReport === "sales" ? new Date(d.billDate) : new Date(d.date);
                return "";
            };

            const aVal = getVal(a);
            const bVal = getVal(b);

            if (aVal < bVal) return direction === "asc" ? -1 : 1;
            if (aVal > bVal) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setFilteredData(sorted);
    };

    // Prevent arrow keys from changing dropdowns & scroll page instead
    useEffect(() => {
        const selects = document.querySelectorAll("select");
        const handleArrowScroll = (e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
                window.scrollBy({ top: e.key === "ArrowDown" ? 100 : -100, behavior: "smooth" });
            }
        };
        selects.forEach((select) => {
            select.addEventListener("keydown", handleArrowScroll);
        });

        return () => {
            selects.forEach((select) => {
                select.removeEventListener("keydown", handleArrowScroll);
            });
        };
    }, []);

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-end mb-3">
                <select
                    className="form-select w-auto"
                    value={activeReport}
                    onChange={(e) => setActiveReport(e.target.value)}
                >
                    <option value="sales">Sales</option>
                    <option value="purchase">Purchase</option>
                </select>
            </div>

            <div className="bg-white p-4 shadow rounded">
                <h2 className="text-center fw-bold mb-4 text-primary">
                    {activeReport === "sales" ? "Sales Report" : "Purchase Report"}
                </h2>

                {/* Filters */}
                <div className="border rounded p-3 bg-light mb-4">
                    <h5 className="fw-semibold mb-3 text-success">Filter Data</h5>
                    <div className="row g-3">
                        {activeReport === "sales" && (
                            <>
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
                            </>
                        )}

                        {activeReport === "purchase" && (
                            <div className="col-md-2">
                                <select
                                    className="form-select"
                                    value={filter.location}
                                    onChange={(e) =>
                                        setFilter({ ...filter, location: e.target.value })
                                    }
                                >
                                    <option value="">All Firms</option>
                                    {firmNames.map((firm, i) => (
                                        <option key={i} value={firm}>
                                            {firm}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

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

                {/* Table */}
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle text-center">
                        <thead className="table-white">
                            <tr>
                                <th>#</th>
                                {activeReport === "sales" && <th>Location</th>}
                                {activeReport === "purchase" && <th>Firm Name</th>}
                                {activeReport === "sales" && <th>Shop Name</th>}
                                {activeReport === "sales" && <th>Salesman</th>}
                                <th onClick={() => handleSort("productName")} style={{ cursor: "pointer" }}>
                                    Product Name ⬍
                                </th>
                                <th onClick={() => handleSort("qty")} style={{ cursor: "pointer" }}>
                                    Qty ⬍
                                </th>
                                <th onClick={() => handleSort("amount")} style={{ cursor: "pointer" }}>
                                    Amount ⬍
                                </th>
                                <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                                    Date ⬍
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((d, i) => (
                                    <tr key={d._id}>
                                        <td>{i + 1}</td>
                                        {activeReport === "sales" && <td>{d?.customer?.selectedCustomerId?.area}</td>}
                                        {activeReport === "purchase" && <td>{d?.vendorId?.firm}</td>}
                                        {activeReport === "sales" && <td>{d?.customer?.CustomerName}</td>}
                                        {activeReport === "sales" && <td>{d?.customer?.salesmanName}</td>}
                                        <td>
                                            {activeReport === "sales"
                                                ? d?.billing?.[0]?.itemName
                                                : d?.items?.[0]?.productId?.productName || "N/A"}
                                        </td>
                                        <td>
                                            {activeReport === "sales"
                                                ? d?.billing?.[0]?.qty
                                                : d?.items?.[0]?.quantity}
                                        </td>
                                        <td>₹{d?.finalAmount?.toLocaleString()}</td>
                                        <td>
                                            {new Date(activeReport === "sales" ? d?.billDate : d?.date).toLocaleDateString("en-IN")}
                                        </td>
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
