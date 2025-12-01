// import React, { useState, useEffect, useRef } from "react";
// import {
//   Modal,
//   Button,
//   Form,
//   Table,
//   Pagination,
//   Row,
//   Col,
// } from "react-bootstrap";
// import { fetchCustomers } from "../../redux/features/customer/customerThunks";
// import { useSelector, useDispatch } from "react-redux";

// const CustomerModal = ({ show, onHide, onSelect }) => {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const dispatch = useDispatch();
//   const customers = useSelector((state) => state.customer.customers);

//   const tableContainerRef = useRef(null);
//   const rowRefs = useRef([]);

//   useEffect(() => {
//     dispatch(fetchCustomers());
//   }, [dispatch]);

//   const filtered = customers.filter((c) =>
//     c.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filtered.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const currentData = filtered.slice(startIndex, startIndex + rowsPerPage);

//   console.log(currentData, "asdfghjk");

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       setActiveIndex(0);
//     }
//   };

//   // Focus table container when modal opens
//   useEffect(() => {
//     if (show) {
//       setActiveIndex(0);
//       setTimeout(() => {
//         tableContainerRef.current?.focus();
//       }, 100); // slight delay to ensure modal fully rendered
//     }
//   }, [show, currentPage, search]);

//   // Scroll active row into view whenever activeIndex changes
//   useEffect(() => {
//     if (rowRefs.current[activeIndex]) {
//       rowRefs.current[activeIndex].scrollIntoView({ block: "nearest" });
//     }
//   }, [activeIndex, currentData]);

//   const handleKeyDown = (e) => {
//     if (currentData.length === 0) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setActiveIndex((prev) => (prev + 1) % currentData.length);
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setActiveIndex(
//         (prev) => (prev - 1 + currentData.length) % currentData.length
//       );
//     } else if (e.key === "Enter") {
//       e.preventDefault();
//       onSelect(currentData[activeIndex]);
//       onHide();
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide} size="lg" centered scrollable>
//       <Modal.Header closeButton>
//         <Modal.Title>Select Customer </Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Row className="align-items-center mb-3">
//           <Col>
//             <Form.Control
//               type="text"
//               placeholder="Search customer..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//                 setActiveIndex(0);
//               }}
//             />
//           </Col>

//           <Col xs="auto" className="text-end">
//             <div className="d-flex align-items-center justify-content-end">
//               <Form.Label className="mb-0 me-2 fw-semibold">
//                 Rows per page:
//               </Form.Label>
//               <Form.Select
//                 size="sm"
//                 style={{ width: "90px" }}
//                 value={rowsPerPage}
//                 onChange={(e) => {
//                   setRowsPerPage(Number(e.target.value));
//                   setCurrentPage(1);
//                   setActiveIndex(0);
//                 }}
//               >
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="20">20</option>
//                 <option value="50">50</option>
//               </Form.Select>
//             </div>
//           </Col>
//         </Row>

//         {/* Table container */}
//         <div
//           style={{ maxHeight: "300px", overflowY: "auto" }}
//           ref={tableContainerRef}
//           tabIndex={0}
//           onKeyDown={handleKeyDown}
//         >
//           <Table bordered hover size="sm" className="mb-0">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Mobile</th>
//                 <th>Email</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentData.map((c, idx) => (
//                 <tr
//                   key={c._id}
//                   ref={(el) => (rowRefs.current[idx] = el)}
//                   className={idx === activeIndex ? "table-primary" : ""}
//                   onClick={() => {
//                     onSelect(c);
//                     onHide();
//                   }}
//                 >
//                   <td>{c.ledger}</td>
//                   <td>{c.mobile || "-"}</td>
//                   <td>{c.area || "-"}</td>
//                   <td>
//                     <Button
//                       variant="primary"
//                       size="sm"
//                       onClick={() => {
//                         onSelect(c);
//                         onHide();
//                       }}
//                     >
//                       Select
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//               {currentData.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="text-center">
//                     No customer found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         <div className="d-flex justify-content-center mt-2">
//           <Pagination className="mb-0">
//             <Pagination.Prev
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             />
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
//               <Pagination.Item
//                 key={item}
//                 active={item === currentPage}
//                 onClick={() => handlePageChange(item)}
//               >
//                 {item}
//               </Pagination.Item>
//             ))}
//             <Pagination.Next
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             />
//           </Pagination>
//         </div>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default CustomerModal;




//previous code end here




// import React, { useState, useEffect, useRef } from "react";
// import { Modal, Button, Form, Table, Pagination, Row, Col } from "react-bootstrap";
// import { fetchCustomers } from "../../redux/features/customer/customerThunks";
// import { useSelector, useDispatch } from "react-redux";

// const CustomerModal = ({ show, onHide, onSelect }) => {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [activeIndex, setActiveIndex] = useState(-1); // -1 = search input

//   const dispatch = useDispatch();
//   const customers = useSelector((state) => state.customer.customers);

//   const searchRef = useRef(null);
//   const rowRefs = useRef([]);

//   useEffect(() => {
//     dispatch(fetchCustomers());
//   }, [dispatch]);

//   const filtered = customers.filter((c) =>
//     c.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filtered.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const currentData = filtered.slice(startIndex, startIndex + rowsPerPage);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       setActiveIndex(-1);
//     }
//   };

//   // Focus search input when modal opens
//   useEffect(() => {
//     if (show) {
//       setActiveIndex(-1);
//       setTimeout(() => searchRef.current?.focus(), 100);
//     }
//   }, [show]);

//   // Scroll active row into view
//   useEffect(() => {
//     if (activeIndex >= 0 && rowRefs.current[activeIndex]) {
//       rowRefs.current[activeIndex].scrollIntoView({ block: "nearest" });
//     }
//   }, [activeIndex, currentData]);

//   const handleKeyDown = (e) => {
//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       if (activeIndex === -1 && currentData.length > 0) {
//         setActiveIndex(0); // move from input to first row
//       } else if (activeIndex < currentData.length - 1) {
//         setActiveIndex(activeIndex + 1);
//       }
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       if (activeIndex === 0) {
//         setActiveIndex(-1); // move back to search input
//         searchRef.current?.focus();
//       } else if (activeIndex > 0) {
//         setActiveIndex(activeIndex - 1);
//       }
//     } else if (e.key === "Enter") {
//       e.preventDefault();
//       if (activeIndex >= 0) {
//         onSelect(currentData[activeIndex]);
//         onHide();
//       }
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide} size="lg" centered scrollable>
//       <Modal.Header closeButton>
//         <Modal.Title>Select Customer</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Row className="align-items-center mb-3">
//           <Col>
//             <Form.Control
//               ref={searchRef}
//               type="text"
//               placeholder="Search customer..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//                 setActiveIndex(-1);
//               }}
//               onKeyDown={(e) => {
//                 // ArrowDown: move focus to first customer row
//                 if (e.key === "ArrowDown" && currentData.length > 0) {
//                   e.preventDefault();
//                   setActiveIndex(0);
//                 }
//                 // ArrowUp: do nothing (stay in input)
//                 // Enter: if activeIndex >=0 select row else do nothing
//                 else if (e.key === "Enter") {
//                   e.preventDefault();
//                   if (activeIndex >= 0) {
//                     onSelect(currentData[activeIndex]);
//                     onHide();
//                   }
//                 }
//               }}
//             />
//           </Col>

//           <Col xs="auto" className="text-end">
//             <div className="d-flex align-items-center justify-content-end">
//               <Form.Label className="mb-0 me-2 fw-semibold">Rows per page:</Form.Label>
//               <Form.Select
//                 size="sm"
//                 style={{ width: "90px" }}
//                 value={rowsPerPage}
//                 onChange={(e) => {
//                   setRowsPerPage(Number(e.target.value));
//                   setCurrentPage(1);
//                   setActiveIndex(-1);
//                 }}
//               >
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="20">20</option>
//                 <option value="50">50</option>
//               </Form.Select>
//             </div>
//           </Col>
//         </Row>

//         <div style={{ maxHeight: "300px", overflowY: "auto" }}>
//           <Table bordered hover size="sm" className="mb-0">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Mobile</th>
//                 <th>Email</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentData.map((c, idx) => (
//                 <tr
//                   key={c._id}
//                   ref={(el) => (rowRefs.current[idx] = el)}
//                   className={idx === activeIndex ? "table-primary" : ""}
//                   tabIndex={0}
//                   onMouseEnter={() => setActiveIndex(idx)}
//                   onClick={() => {
//                     onSelect(c);
//                     onHide();
//                   }}
//                   onKeyDown={(e) => {
//                     if (e.key === "ArrowDown") {
//                       e.preventDefault();
//                       if (activeIndex < currentData.length - 1) setActiveIndex(activeIndex + 1);
//                     } else if (e.key === "ArrowUp") {
//                       e.preventDefault();
//                       if (activeIndex === 0) {
//                         setActiveIndex(-1);
//                         searchRef.current?.focus();
//                       } else if (activeIndex > 0) setActiveIndex(activeIndex - 1);
//                     } else if (e.key === "Enter") {
//                       e.preventDefault();
//                       onSelect(currentData[activeIndex]);
//                       onHide();
//                     }
//                   }}
//                 >
//                   <td>{c.ledger}</td>
//                   <td>{c.mobile || "-"}</td>
//                   <td>{c.area || "-"}</td>
//                   <td>
//                     <Button
//                       variant="primary"
//                       size="sm"
//                       onClick={() => {
//                         onSelect(c);
//                         onHide();
//                       }}
//                     >
//                       Select
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//               {currentData.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="text-center">
//                     No customer found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>

//         <div className="d-flex justify-content-center mt-2">
//           <Pagination className="mb-0">
//             <Pagination.Prev
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             />
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
//               <Pagination.Item
//                 key={item}
//                 active={item === currentPage}
//                 onClick={() => handlePageChange(item)}
//               >
//                 {item}
//               </Pagination.Item>
//             ))}
//             <Pagination.Next
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             />
//           </Pagination>
//         </div>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default CustomerModal;









// import React, { useState, useEffect, useRef } from "react";
// import {
//   Modal,
//   Button,
//   Form,
//   Table,
//   Pagination,
//   Row,
//   Col,
// } from "react-bootstrap";
// import { fetchCustomers } from "../../redux/features/customer/customerThunks";
// import { useSelector, useDispatch } from "react-redux";

// const CustomerModal = ({ show, onHide, onSelect }) => {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const dispatch = useDispatch();
//   const customers = useSelector((state) => state.customer.customers);

//   const tableContainerRef = useRef(null);
//   const rowRefs = useRef([]);

//   // Fetch customers only on load
//   useEffect(() => {
//     dispatch(fetchCustomers());
//   }, [dispatch]);

//   // Filter list
//   const filtered = customers.filter((c) =>
//     (c.ledger || c.name || "")
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filtered.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const currentData = filtered.slice(startIndex, startIndex + rowsPerPage);

//   // Reset focus on modal open
//   useEffect(() => {
//     if (show) {
//       setActiveIndex(0);
//       setTimeout(() => {
//         tableContainerRef.current?.focus();
//         tableContainerRef.current?.setAttribute("tabIndex", "0");
//       }, 150);
//     }
//   }, [show, currentPage, search]);

//   // Auto-scroll on active row
//   useEffect(() => {
//     if (rowRefs.current[activeIndex]) {
//       rowRefs.current[activeIndex].scrollIntoView({
//         block: "nearest",
//         behavior: "smooth",
//       });
//     }
//   }, [activeIndex, currentData]);

//   // Keyboard navigation
//   const handleKeyDown = (e) => {
//     e.stopPropagation();
//     if (currentData.length === 0) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setActiveIndex((prev) =>
//         prev + 1 < currentData.length ? prev + 1 : prev
//       );
//     }

//     if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
//     }

//     if (e.key === "Enter") {
//       e.preventDefault();
//       onSelect(currentData[activeIndex]);
//       onHide();
//     }
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       setActiveIndex(0);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide} size="lg" centered scrollable>
//       <Modal.Header closeButton>
//         <Modal.Title>Select Customer</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Row className="align-items-center mb-3">
//           <Col>
//             <Form.Control
//               type="text"
//               placeholder="Search customer..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//                 setActiveIndex(0);
//               }}
//             />
//           </Col>

//           <Col xs="auto" className="text-end">
//             <div className="d-flex align-items-center justify-content-end">
//               <Form.Label className="mb-0 me-2 fw-semibold">
//                 Rows per page:
//               </Form.Label>
//               <Form.Select
//                 size="sm"
//                 style={{ width: "90px" }}
//                 value={rowsPerPage}
//                 onChange={(e) => {
//                   setRowsPerPage(Number(e.target.value));
//                   setCurrentPage(1);
//                   setActiveIndex(0);
//                 }}
//               >
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="20">20</option>
//                 <option value="50">50</option>
//               </Form.Select>
//             </div>
//           </Col>
//         </Row>

//         {/* Table */}
//         <div
//           style={{ maxHeight: "300px", overflowY: "auto" }}
//           ref={tableContainerRef}
//           tabIndex={0}
//           onKeyDown={handleKeyDown}
//         >
//           <Table bordered hover size="sm" className="mb-0">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Mobile</th>
//                 <th>Area</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentData.map((c, idx) => (
//                 <tr
//                   key={c._id}
//                   ref={(el) => (rowRefs.current[idx] = el)}
//                   className={idx === activeIndex ? "table-primary" : ""}
//                   onClick={() => {
//                     onSelect(c);
//                     onHide();
//                   }}
//                 >
//                   <td>{c.ledger || c.name}</td>
//                   <td>{c.mobile || "-"}</td>
//                   <td>{c.area || "-"}</td>
//                   <td>
//                     <Button
//                       variant="primary"
//                       size="sm"
//                       onClick={() => {
//                         onSelect(c);
//                         onHide();
//                       }}
//                     >
//                       Select
//                     </Button>
//                   </td>
//                 </tr>
//               ))}

//               {currentData.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="text-center">
//                     No customer found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         <div className="d-flex justify-content-center mt-2">
//           <Pagination className="mb-0">
//             <Pagination.Prev
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             />
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//               (item) => (
//                 <Pagination.Item
//                   key={item}
//                   active={item === currentPage}
//                   onClick={() => handlePageChange(item)}
//                 >
//                   {item}
//                 </Pagination.Item>
//               )
//             )}
//             <Pagination.Next
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             />
//           </Pagination>
//         </div>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default CustomerModal;








import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Button,
  Form,
  Table,
  Pagination,
  Row,
  Col,
} from "react-bootstrap";
import { fetchCustomers } from "../../redux/features/customer/customerThunks";
import { useSelector, useDispatch } from "react-redux";

const CustomerModal = ({ show, onHide, onSelect }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);

  const searchRef = useRef(null);
  const rowRefs = useRef([]);

  // Fetch customers once
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const filtered = customers.filter((c) =>
    (c.ledger || c.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filtered.slice(startIndex, startIndex + rowsPerPage);

  // Focus input when modal opens
  useEffect(() => {
    if (show) {
      setActiveIndex(0);
      setTimeout(() => searchRef.current?.focus(), 150);
    }
  }, [show]);

  // Auto-scroll active row
  useEffect(() => {
    if (rowRefs.current[activeIndex]) {
      rowRefs.current[activeIndex].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex, currentData]);

  // SEARCH BOX key controls
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && currentData.length > 0) {
      e.preventDefault();
      onSelect(currentData[0]);
      onHide();
    }

    if (e.key === "ArrowDown" && currentData.length > 0) {
      e.preventDefault();
      setActiveIndex(0);
      rowRefs.current[0]?.focus();
    }
  };

  // TABLE ROW key controls
  const handleRowKeyDown = (e, idx) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (idx + 1 < currentData.length) {
        setActiveIndex(idx + 1);
        rowRefs.current[idx + 1]?.focus();
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (idx - 1 >= 0) {
        setActiveIndex(idx - 1);
        rowRefs.current[idx - 1]?.focus();
      }
    }

    // ENTER SELECT FIX — use activeIndex, not idx
    if (e.key === "Enter") {
        e.preventDefault();
        const selectedCustomer = currentData[activeIndex];
        if (selectedCustomer) {
            onSelect(selectedCustomer);
            onHide();
        }
    }
};


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setActiveIndex(0);
      setTimeout(() => rowRefs.current[0]?.focus(), 120);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Select Customer</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-3">
          <Col>
            <Form.Control
              ref={searchRef}
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
                setActiveIndex(0);
              }}
              onKeyDown={handleSearchKeyDown}
            />
          </Col>

          <Col xs="auto">
            <Form.Select
              size="sm"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
                setActiveIndex(0);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </Form.Select>
          </Col>
        </Row>

        {/* TABLE */}
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <Table hover size="sm" className="mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Area</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((c, idx) => (
                <tr
                  key={c._id}
                  tabIndex={0}               // REQUIRED FOR FOCUS
                  ref={(el) => (rowRefs.current[idx] = el)}
                  onClick={() => {
                    onSelect(c);
                    onHide();
                  }}
                onKeyDown={(e) => handleRowKeyDown(e, idx)}

                  style={{
                    background:
                      activeIndex === idx ? "#e8f3ff" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <td>{c.ledger || c.name}</td>
                  <td>{c.mobile}</td>
                  <td>{c.area}</td>
                  <td>
                    <Button
                      size="sm"
                      onClick={() => {
                        onSelect(c);
                        onHide();
                      }}
                    >
                      Select
                    </Button>
                  </td>
                </tr>
              ))}

              {currentData.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-3">
                    No customer found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* PAGINATION */}
        <div className="d-flex justify-content-center mt-2">
          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Pagination.Item
                key={p}
                active={p === currentPage}
                onClick={() => handlePageChange(p)}
              >
                {p}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerModal;









