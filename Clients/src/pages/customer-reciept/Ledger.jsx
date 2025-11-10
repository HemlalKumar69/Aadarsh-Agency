// import React, { useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Table,
//   Button,
//   Pagination,
// } from "react-bootstrap";
// import axios from "../../Config/axios";
// import CustomerModal from "./CustomerModal"; // ✅ Modal

// const Ledger = () => {
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [ledgerEntries, setLedgerEntries] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // ✅ Fetch Ledger
//   const fetchLedger = async () => {
//     if (!selectedCustomer) return alert("Please select a customer");

//     try {
//       const res = await axios.get("/ledger", {
//         params: {
//           customerId: selectedCustomer._id,
//           startDate,
//           endDate,
//         },
//       });
//       setLedgerEntries(res.data || []);
//       setCurrentPage(1); // Reset to page 1 on new fetch
//     } catch (error) {
//       console.error("Error fetching ledger:", error);
//       alert("Failed to fetch ledger data");
//     }
//   };

//   // ✅ Pagination Logic
//   const totalEntries = ledgerEntries.length;
//   const totalPages =
//     rowsPerPage === "all" ? 1 : Math.ceil(totalEntries / rowsPerPage);

//   const startIndex =
//     rowsPerPage === "all" ? 0 : (currentPage - 1) * rowsPerPage;
//   const endIndex =
//     rowsPerPage === "all"
//       ? ledgerEntries.length
//       : startIndex + Number(rowsPerPage);

//   const currentEntries =
//     rowsPerPage === "all"
//       ? ledgerEntries
//       : ledgerEntries.slice(startIndex, endIndex);

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(e.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const renderPagination = () => {
//     if (rowsPerPage === "all" || totalPages <= 1) return null;

//     const paginationItems = [];
//     for (let i = 1; i <= totalPages; i++) {
//       paginationItems.push(
//         <Pagination.Item
//           key={i}
//           active={i === currentPage}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </Pagination.Item>
//       );
//     }

//     return (
//       <Pagination className="justify-content-end mt-3">
//         <Pagination.First
//           onClick={() => handlePageChange(1)}
//           disabled={currentPage === 1}
//         />
//         <Pagination.Prev
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         />
//         {paginationItems}
//         <Pagination.Next
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         />
//         <Pagination.Last
//           onClick={() => handlePageChange(totalPages)}
//           disabled={currentPage === totalPages}
//         />
//       </Pagination>
//     );
//   };

//   return (
//     <Container fluid className="p-4">
//       <h2 className="mb-4">Customer Ledger </h2>

//       <Row className="mb-4">
//         <Col md={3}>
//           <Form.Group>
//             <Form.Label>Customer</Form.Label>
//             <div className="d-flex">
//               <Form.Control
//                 value={selectedCustomer ? selectedCustomer.name : ""}
//                 placeholder="Select customer"
//                 readOnly
//               />
//               <Button
//                 variant="secondary"
//                 onClick={() => setShowModal(true)}
//                 className="ms-2"
//               >
//                 Search
//               </Button>
//             </div>
//           </Form.Group>
//         </Col>

//         <Col md={3}>
//           <Form.Group>
//             <Form.Label>Start Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//           </Form.Group>
//         </Col>

//         <Col md={3}>
//           <Form.Group>
//             <Form.Label>End Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </Form.Group>
//         </Col>

//         <Col md={3} className="d-flex align-items-end justify-content-between">
//           <Button variant="primary" onClick={fetchLedger}>
//             Get Ledger
//           </Button>

//           {/* ✅ Rows per page dropdown */}
//           <Form.Select
//             size="sm"
//             value={rowsPerPage}
//             onChange={handleRowsPerPageChange}
//             style={{ width: "120px" }}
//           >
//             <option value="5">5 rows</option>
//             <option value="10">10 rows</option>
//             <option value="15">15 rows</option>
//             <option value="20">20 rows</option>
//             <option value="all">All</option>
//           </Form.Select>
//         </Col>
//       </Row>

//       <Table striped bordered hover responsive size="sm">
//         <thead className="table-dark">
//           <tr>
//             <th>Date</th>
//             <th>Ref Type</th>
//             <th>Ref ID</th>
//             <th>Narration</th>
//             <th>Debit Account</th>
//             <th>Credit Account</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentEntries.length === 0 ? (
//             <tr>
//               <td colSpan="7" className="text-center">
//                 No records found
//               </td>
//             </tr>
//           ) : (
//             currentEntries.map((entry) => (
//               <tr key={entry._id}>
//                 <td>{new Date(entry.date).toLocaleDateString()}</td>
//                 <td>{entry.refType}</td>
//                 <td>{entry.refId}</td>
//                 <td>{entry.narration}</td>
//                 <td>{entry.debitAccount}</td>
//                 <td>{entry.creditAccount}</td>
//                 <td>₹ {Number(entry.amount || 0).toFixed(2)}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>

//       {/* ✅ Pagination */}
//       {renderPagination()}

//       {/* ✅ Customer Modal */}
//       <CustomerModal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         onSelect={(c) => setSelectedCustomer(c)}
//       />
//     </Container>
//   );
// };

// export default Ledger;



import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Table, Button, Pagination } from "react-bootstrap";
import axios from "../../Config/axios";
import CustomerModal from "./CustomerModal";

const Ledger = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [showModal, setShowModal] = useState(true);

  // Refs for keyboard navigation
  const customerInputRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const getLedgerBtnRef = useRef(null);
  const searchBtnRef = useRef(null);

  // ---------- Arrow / Enter Navigation ----------
  const handleKeyDown = (e, currentRef) => {
    switch (e.key) {
      case "ArrowRight":
        if (currentRef === "inputCustomer") startDateRef.current.focus();
        else if (currentRef === "startDate") endDateRef.current.focus();
        else if (currentRef === "endDate") getLedgerBtnRef.current.focus();
        break;

      case "ArrowLeft":
        if (currentRef === "startDate") customerInputRef.current.focus();
        else if (currentRef === "endDate") startDateRef.current.focus();
        else if (currentRef === "getLedger") endDateRef.current.focus();
        break;

      case "Enter":
        if (currentRef === "searchBtn") setShowModal(true);
        else if (currentRef === "getLedger") fetchLedger();
        break;

      default:
        break;
    }
  };

  // ---------- Fetch Ledger ----------
  const fetchLedger = async () => {
    if (!selectedCustomer) return alert("Please select a customer");
    try {
      const res = await axios.get("/ledger", {
        params: { customerId: selectedCustomer._id, startDate, endDate },
      });
      setLedgerEntries(res.data || []);
    } catch (error) {
      console.error("Error fetching ledger:", error);
      alert("Failed to fetch ledger data");
    }
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Customer Ledger</h2>
      <Row className="mb-4">
        {/* Customer */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>Customer</Form.Label>
            <div className="d-flex">
              <Form.Control
                ref={customerInputRef}
                value={selectedCustomer ? selectedCustomer.name : ""}
                placeholder="Select customer"
                readOnly
                onKeyDown={(e) => handleKeyDown(e, "inputCustomer")}
              />
              <Button
                ref={searchBtnRef}
                variant="secondary"
                className="ms-2"
                onClick={() => setShowModal(true)}
                onKeyDown={(e) => handleKeyDown(e, "searchBtn")}
              >
                Search
              </Button>
            </div>
          </Form.Group>
        </Col>

        {/* Start Date */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              ref={startDateRef}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "startDate")}
            />
          </Form.Group>
        </Col>

        {/* End Date */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              ref={endDateRef}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "endDate")}
            />
          </Form.Group>
        </Col>

        {/* Get Ledger */}
        <Col md={3} className="d-flex align-items-end">
          <Button
            ref={getLedgerBtnRef}
            variant="primary"
            onClick={fetchLedger}
            onKeyDown={(e) => handleKeyDown(e, "getLedger")}
          >
            Get Ledger
          </Button>
        </Col>
      </Row>

      {/* Ledger Table */}
      <Table striped bordered hover responsive size="sm">
        <thead className="">
          <tr>
            <th>Date</th>
            <th>Ref Type</th>
            <th>Ref ID</th>
            <th>Narration</th>
            <th>Debit Account</th>
            <th>Credit Account</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {ledgerEntries.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No records found
              </td>
            </tr>
          ) : (
            ledgerEntries.map((entry) => (
              <tr key={entry._id}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.refType}</td>
                <td>{entry.refId}</td>
                <td>{entry.narration}</td>
                <td>{entry.debitAccount}</td>
                <td>{entry.creditAccount}</td>
                <td>₹ {Number(entry.amount || 0).toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Customer Modal */}
      <CustomerModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSelect={(c) => {
          setSelectedCustomer(c);
          setShowModal(false);

          // ✅ Focus start date automatically after selecting customer
          setTimeout(() => startDateRef.current?.focus(), 100);
        }}
        autoFocus
      />
    </Container>
  );
};

export default Ledger;
