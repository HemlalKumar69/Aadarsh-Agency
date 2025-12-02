// import React, { useState, useEffect, useRef } from "react";
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
// import CustomerModal from "./CustomerModal";

// const Ledger = () => {
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [ledgerEntries, setLedgerEntries] = useState([]);
//   const [showModal, setShowModal] = useState(true);

//   // Refs for keyboard navigation
//   const customerInputRef = useRef(null);
//   const startDateRef = useRef(null);
//   const endDateRef = useRef(null);
//   const getLedgerBtnRef = useRef(null);
//   const searchBtnRef = useRef(null);

//   // ---------- Arrow / Enter Navigation ----------
//   const handleKeyDown = (e, currentRef) => {
//     switch (e.key) {
//       case "ArrowRight":
//         if (currentRef === "inputCustomer") startDateRef.current.focus();
//         else if (currentRef === "startDate") endDateRef.current.focus();
//         else if (currentRef === "endDate") getLedgerBtnRef.current.focus();
//         break;

//       case "ArrowLeft":
//         if (currentRef === "startDate") customerInputRef.current.focus();
//         else if (currentRef === "endDate") startDateRef.current.focus();
//         else if (currentRef === "getLedger") endDateRef.current.focus();
//         break;

//       case "Enter":
//         if (currentRef === "searchBtn") setShowModal(true);
//         else if (currentRef === "getLedger") fetchLedger();
//         break;

//       default:
//         break;
//     }
//   };

//   // ---------- Fetch Ledger ----------
//   const fetchLedger = async () => {
//     if (!selectedCustomer) return alert("Please select a customer");
//     try {
//       const res = await axios.get("/ledger", {
//         params: { customerId: selectedCustomer._id, startDate, endDate },
//       });
//       setLedgerEntries(res.data || []);
//     } catch (error) {
//       console.error("Error fetching ledger:", error);
//       alert("Failed to fetch ledger data");
//     }
//   };

//   return (
//     <Container fluid className="p-4">
//       <h2 className="mb-4">Customer Ledger</h2>
//       <Row className="mb-4">
//         {/* Customer */}
//         <Col md={3}>
//           <Form.Group>
//             <Form.Label>Customer</Form.Label>
//             <div className="d-flex">
//               <Form.Control
//                 ref={customerInputRef}
//                 value={selectedCustomer ? selectedCustomer.name : ""}
//                 placeholder="Select customer"
//                 readOnly
//                 onKeyDown={(e) => handleKeyDown(e, "inputCustomer")}
//               />
//               <Button
//                 ref={searchBtnRef}
//                 variant="secondary"
//                 className="ms-2"
//                 onClick={() => setShowModal(true)}
//                 onKeyDown={(e) => handleKeyDown(e, "searchBtn")}
//               >
//                 Search
//               </Button>
//             </div>
//           </Form.Group>
//         </Col>

//         {/* Start Date */}
//         <Col md={3}>
//           <Form.Group>
//             <Form.Label>Start Date</Form.Label>
//             <Form.Control
//               type="date"
//               ref={startDateRef}
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               onKeyDown={(e) => handleKeyDown(e, "startDate")}
//             />
//           </Form.Group>
//         </Col>

//         {/* End Date */}
//         <Col md={3}>
//           <Form.Group>
//             <Form.Label>End Date</Form.Label>
//             <Form.Control
//               type="date"
//               ref={endDateRef}
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               onKeyDown={(e) => handleKeyDown(e, "endDate")}
//             />
//           </Form.Group>
//         </Col>

//         {/* Get Ledger */}
//         <Col md={3} className="d-flex align-items-end">
//           <Button
//             ref={getLedgerBtnRef}
//             variant="primary"
//             onClick={fetchLedger}
//             onKeyDown={(e) => handleKeyDown(e, "getLedger")}
//           >
//             Get Ledger
//           </Button>
//         </Col>
//       </Row>

//       {/* Ledger Table */}
//       <Table striped bordered hover responsive size="sm">
//         <thead className="">
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
//           {ledgerEntries.length === 0 ? (
//             <tr>
//               <td colSpan="7" className="text-center">
//                 No records found
//               </td>
//             </tr>
//           ) : (
//             ledgerEntries.map((entry) => (
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

//       {/* Customer Modal */}
//       <CustomerModal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         onSelect={(c) => {
//           setSelectedCustomer(c);
//           setShowModal(false);

//           // ✅ Focus start date automatically after selecting customer
//           setTimeout(() => startDateRef.current?.focus(), 100);
//         }}
//         autoFocus
//       />
//     </Container>
//   );
// };

// export default Ledger;






import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Button,
  Pagination,
} from "react-bootstrap";
import axios from "../../Config/axios";
import CustomerModal from "./CustomerModal";

const Ledger = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [showModal, setShowModal] = useState(true); // modal open on load

  // Refs for keyboard navigation
  const customerInputRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const getLedgerBtnRef = useRef(null);
  const searchBtnRef = useRef(null);

  // ---------- Arrow / Enter Navigation ----------
  const handleKeyDown = (e, currentRef) => {
    if (showModal) return;
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
      const res = await axios.get(`/ledger/${selectedCustomer._id}`, {
        params: { customerId: selectedCustomer._id, startDate, endDate },
      });

      console.log("API Response:", res.data);

      // FIX: Ensure we always get an array
      const entries = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
          ? res.data
          : [];

      setLedgerEntries(entries);
    } catch (error) {
      console.error("Error fetching ledger:", error);
      alert("Failed to fetch ledger data");
    }
  };

  
  //     setLedgerEntries(res.data || []);
  //   } catch (error) {
  //     console.error("Error fetching ledger:", error);
  //     alert("Failed to fetch ledger data");
  //   }
  // };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Customer Ledger </h2>
      <Row className="mb-4">
        {/* Customer */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>Customer</Form.Label>
            <div className="d-flex">
              <Form.Control
                ref={customerInputRef}
                value={selectedCustomer ? selectedCustomer.ledger || selectedCustomer.name || " " : " "}
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
        <thead>
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

          // focus start date after selecting customer
          setTimeout(() => startDateRef.current?.focus(), 100);
        }}
      />
    </Container>
  );
};

export default Ledger;
