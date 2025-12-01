// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   Button,
//   Form,
//   Table,
//   Pagination,
//   Row,
//   Col,
// } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchVendors } from "../../redux/features/vendor/VendorThunks";

// const VendorModal = ({ show, onHide, onSelect }) => {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const dispatch = useDispatch();
//   const vendors = useSelector((state) => state.vendor.vendors || []);

//   useEffect(() => {
//     if(show) {
//       setTimeout(() => {
//         inputRef?.current?.focus();
//       }, 200);
//     }
//   },[show]);

//   useEffect(() => {
//     dispatch(fetchVendors());
//   }, [dispatch]);

//   // ✅ Filter by search
//   const filtered = vendors.filter((v) =>
//     v?.firm?.toLowerCase().includes(search.toLowerCase())
//   );

//   // ✅ Pagination logic
//   const totalEntries = filtered.length;
//   const totalPages =
//     rowsPerPage === "all" ? 1 : Math.ceil(totalEntries / rowsPerPage);

//   const startIndex =
//     rowsPerPage === "all" ? 0 : (currentPage - 1) * rowsPerPage;
//   const endIndex =
//     rowsPerPage === "all" ? filtered.length : startIndex + Number(rowsPerPage);

//   const currentEntries =
//     rowsPerPage === "all" ? filtered : filtered.slice(startIndex, endIndex);

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
//       <Pagination className="justify-content-center mt-3">
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
//     <Modal show={show} onHide={onHide} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Select Vendor hemlal</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Row className="align-items-center mb-3">
//           <Col md={8}>
//             <Form.Control
//               type="text"
//               placeholder="Search vendor..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </Col>
//           <Col md={4} className="text-end">
//             {/* ✅ Rows per page dropdown */}
//             <Form.Select
//               size="sm"
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               style={{ width: "130px", display: "inline-block" }}
//             >
//               <option value="5">5 rows</option>
//               <option value="10">10 rows</option>
//               <option value="15">15 rows</option>
//               <option value="20">20 rows</option>
//               <option value="all">All</option>
//             </Form.Select>
//           </Col>
//         </Row>

//         <Table bordered hover responsive size="sm">
//           <thead className="table-dark">
//             <tr>
//               <th className="text-black">Name</th>
//               <th className="text-black">Mobile</th>
//               <th className="text-black">City</th>
//               <th className="text-black" style={{ width: "90px" }}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentEntries.length > 0 ? (
//               currentEntries.map((v) => (
//                 <tr key={v._id}>
//                   <td>{v.firm}</td>
//                   <td>{v.mobile || "-"}</td>
//                   <td>{v.city || "-"}</td>
//                   <td>
//                     <Button
//                       variant="primary"
//                       size="sm"
//                       onClick={() => {
//                         onSelect(v);
//                         onHide();
//                       }}
//                     >
//                       Select
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center">
//                   No vendor found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>

//         {/* ✅ Pagination */}
//         {renderPagination()}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default VendorModal;




// import React, { useState, useEffect, useRef } from "react";
// import {
//   Modal,
//   Button,
//   Form,
//   Table,
//   Row,
//   Col,
// } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchVendors } from "../../redux/features/vendor/VendorThunks";

// const VendorModal = ({ show, onHide, onSelect }) => {
//   const [search, setSearch] = useState("");
//   const [focusedIndex, setFocusedIndex] = useState(-1);

//   const inputRef = useRef(null);
//   const modalRef = useRef(null);
//   const rowRefs = useRef([]);

//   const dispatch = useDispatch();
//   const vendors = useSelector((state) => state.vendor.vendors || []);

//   useEffect(() => {
//     dispatch(fetchVendors());
//   }, [dispatch]);

//   // Focus input when modal opens
//   useEffect(() => {
//     if (show) {
//       setTimeout(() => {
//         inputRef.current?.focus();
//       }, 200);
//       setFocusedIndex(-1);
//     }
//   }, [show]);

//   const filtered = vendors.filter((v) =>
//     v?.firm?.toLowerCase().includes(search.toLowerCase())
//   );

//   // 🔥 Keyboard navigation handler
//   const handleKeyDown = (e) => {
//     // If input is active and ArrowDown pressed → move to table
//     if (inputRef.current === document.activeElement && e.key === "ArrowDown") {
//       e.preventDefault();
//       setFocusedIndex(0);

//       setTimeout(() => {
//         modalRef.current?.focus();
//       }, 50);
//       return;
//     }

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setFocusedIndex((prev) =>
//         prev < filtered.length - 1 ? prev + 1 : prev
//       );
//     }

//     if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
//     }

//     if (e.key === "Enter" && focusedIndex >= 0) {
//       e.preventDefault();
//       onSelect(filtered[focusedIndex]);
//       onHide();
//     }

//     if (e.key === "Escape") {
//       onHide();
//     }
//   };

//   // Auto scroll when highlight changes
//   useEffect(() => {
//     if (focusedIndex >= 0 && rowRefs.current[focusedIndex]) {
//       rowRefs.current[focusedIndex].scrollIntoView({
//         behavior: "smooth",
//         block: "nearest",
//       });
//     }
//   }, [focusedIndex]);

//   return (
//     <Modal show={show} onHide={onHide} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Select Vendor</Modal.Title>
//       </Modal.Header>

//       {/* ⭐ MUST HAVE: tabIndex + ref so modal can take keyboard input */}
//       <Modal.Body
//         ref={modalRef}
//         tabIndex={0}
//         onKeyDown={handleKeyDown}
//         style={{ outline: "none", maxHeight: "400px", overflowY: "auto" }}
//       >
//         <Row className="align-items-center mb-3">
//           <Col>
//             <Form.Control
//               ref={inputRef}
//               placeholder="Search vendor..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setFocusedIndex(-1);
//               }}
//             />
//           </Col>
//         </Row>

//         <Table bordered hover responsive size="sm">
//           <thead className="table-dark">
//             <tr>
//               <th>Name</th>
//               <th>Mobile</th>
//               <th>City</th>
//               <th style={{ width: "90px" }}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length > 0 ? (
//               filtered.map((v, index) => (
//                 <tr
//                   key={v._id}
//                   ref={(el) => (rowRefs.current[index] = el)}
//                   onClick={() => {
//                     setFocusedIndex(index);
//                     onSelect(v);
//                     onHide();
//                   }}
//                   style={{
//                     background:
//                       focusedIndex === index ? "#cce5ff" : "transparent",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <td>{v.firm}</td>
//                   <td>{v.mobile || "-"}</td>
//                   <td>{v.city || "-"}</td>
//                   <td>
//                     <Button
//                       size="sm"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onSelect(v);
//                         onHide();
//                       }}
//                     >
//                       Select
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center">
//                   No vendor found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default VendorModal;





import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Table, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchVendors } from "../../redux/features/vendor/VendorThunks";

const VendorModal = ({ show, onHide, onSelect }) => {
  const [search, setSearch] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const inputRef = useRef(null);
  const modalBodyRef = useRef(null);
  const rowRefs = useRef([]);

  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendor.vendors || []);

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  // Focus input when modal opens
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);

      setFocusedIndex(-1);
    }
  }, [show]);

  const filtered = vendors.filter((v) =>
    v?.firm?.toLowerCase().includes(search.toLowerCase())
  );

  // ⭐ KEYBOARD HANDLER
  const handleKeyDown = (e) => {
    // Input se table par move
    if (inputRef.current === document.activeElement && e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex(0);

      inputRef.current.blur();

      setTimeout(() => {
        modalBodyRef.current?.focus();
      }, 30);

      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < filtered.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      onSelect(filtered[focusedIndex]);
      onHide();
    }

    if (e.key === "Escape") onHide();
  };

  // Auto scroll selected row into view
  useEffect(() => {
    if (focusedIndex >= 0 && rowRefs.current[focusedIndex]) {
      rowRefs.current[focusedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedIndex]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Vendor </Modal.Title>
      </Modal.Header>

      {/* 🔥 Important: focus container + keyboard listener */}
      <Modal.Body
        ref={modalBodyRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{ maxHeight: "400px", overflowY: "auto", outline: "none" }}
      >
        <Row className="mb-3">
          <Col>
            <Form.Control
              ref={inputRef}
              placeholder="Search vendor..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setFocusedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
            />
          </Col>
        </Row>

        <Table bordered hover responsive size="sm">
          <thead className="table-dark">
            <tr>
              <th className="text-black">Name</th>
              <th className="text-black">Mobile</th>
              <th className="text-black">City</th>
              <th className="text-black" style={{ width: "90px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((v, index) => (
                <tr
                  key={v._id}
                  ref={(el) => (rowRefs.current[index] = el)}
                  tabIndex={-1} // ⬅ helps focus row
                  onMouseEnter={() => setFocusedIndex(index)}
                  onClick={() => {
                    onSelect(v);
                    onHide();
                  }}
                
                  style={{
                    background: focusedIndex === index ? "#e8f3ff" : "transparent",
                    cursor: "pointer",
                    // transition: "0.15s",
                    borderRadius: "4px",
                  }}

                >
                  <td>{v.firm}</td>
                  <td>{v.mobile || "-"}</td>
                  <td>{v.city || "-"}</td>
                  <td>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(v);
                        onHide();
                      }}
                    >
                      Select
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No vendor found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VendorModal;
