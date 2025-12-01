// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { Modal, Button, Form, Table, Pagination } from "react-bootstrap";
// import { useModal } from "./global/ModalContext";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPurchaseBill } from "../redux/features/PurchaseBill/purchaseThunk";
// import { fetchCustomerBill } from "../redux/features/CustomerBill/customerThunk";
// import { useNavigate } from "react-router-dom";

// const ModifyBill = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [billType, setBillType] = useState("vendor");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [focusedRow, setFocusedRow] = useState(0);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { clodeModifyBill, modifyBill } = useModal();

//   const { PurchaseInvoice } = useSelector((state) => state.purchaseBillInvoice);
//   const { CustomerInvoice } = useSelector((state) => state.customerBillInvoice);

//   const searchInputRef = useRef(null); // ✅ Ref for search input
//   const tbodyRef = useRef(null);

//   // Fetch data when bill type changes
//   useEffect(() => {
//     if (billType === "vendor") dispatch(fetchPurchaseBill());
//     else dispatch(fetchCustomerBill());

//     setCurrentPage(1);
//     setFocusedRow(0);
//   }, [dispatch, billType]);

//   // Auto focus search input when modal opens
//   useEffect(() => {
//     if (modifyBill && searchInputRef.current) {
//       setTimeout(() => searchInputRef.current.focus(), 100); // small delay to ensure modal is rendered
//     }
//   }, [modifyBill]);

//   // Filter data based on search term
//   const filteredData = useMemo(() => {
//     const bills = billType === "vendor" ? PurchaseInvoice : CustomerInvoice;
//     if (!Array.isArray(bills)) return [];

//     return bills.filter((b) => {
//       if (billType === "vendor") {
//         return (
//           b.entryNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           b.vendorId?.firm?.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       } else {
//         return (
//           b.customer?.CustomerName?.toLowerCase().includes(
//             searchTerm.toLowerCase()
//           ) ||
//           b.customerId?.CustomerName?.toLowerCase().includes(
//             searchTerm.toLowerCase()
//           )
//         );
//       }
//     });
//   }, [billType, PurchaseInvoice, CustomerInvoice, searchTerm]);

//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const paginatedData = filteredData.slice(
//     startIndex,
//     startIndex + rowsPerPage
//   );

//   const handleEditInvoice = (id) => {
//     if (!id) return;
//     if (billType === "vendor") navigate(`/purchase/${id}`);
//     else navigate(`/add-invoice/${id}`);
//     clodeModifyBill();
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       setFocusedRow(0);
//     }
//   };

//   // Scroll focused row into view
//   useEffect(() => {
//     if (!tbodyRef.current) return;
//     const row = tbodyRef.current.querySelector(
//       `tr[data-index='${focusedRow}']`
//     );
//     if (row) row.scrollIntoView({ block: "nearest" });
//   }, [focusedRow, currentPage]);

//   // Keyboard navigation
//   const handleKeyDown = (e) => {
//     if (!paginatedData.length) return;

//     switch (e.key) {
//       case "ArrowDown":
//         e.preventDefault();
//         setFocusedRow((prev) => Math.min(prev + 1, paginatedData.length - 1));
//         break;
//       case "ArrowUp":
//         e.preventDefault();
//         setFocusedRow((prev) => Math.max(prev - 1, 0));
//         break;
//       case "Enter":
//         e.preventDefault();
//         handleEditInvoice(paginatedData[focusedRow]?._id);
//         break;
//       case "ArrowRight":
//         e.preventDefault();
//         handlePageChange(currentPage + 1);
//         break;
//       case "ArrowLeft":
//         e.preventDefault();
//         handlePageChange(currentPage - 1);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <Modal
//       show={modifyBill}
//       onHide={clodeModifyBill}
//       centered
//       size="lg"
//       onKeyDown={handleKeyDown} // ✅ Keyboard navigation
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Modify Bill </Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form className="mb-3 d-flex gap-2 align-items-center">
//           <Form.Control
//             type="text"
//             placeholder={
//               billType === "vendor"
//                 ? "Search by entry number or vendor name..."
//                 : "Search by customer name..."
//             }
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setFocusedRow(0);
//               setCurrentPage(1);
//             }}
//             ref={searchInputRef} // ✅ attach ref
//           />

//           <Form.Select
//             value={billType}
//             onChange={(e) => setBillType(e.target.value)}
//           >
//             <option value="vendor">Vendor Bill</option>
//             <option value="customer">Customer Bill</option>
//           </Form.Select>

//           <Form.Select
//             style={{ width: "120px" }}
//             value={rowsPerPage}
//             onChange={(e) => {
//               setRowsPerPage(Number(e.target.value));
//               setCurrentPage(1);
//               setFocusedRow(0);
//             }}
//           >
//             <option value="5">5 / page</option>
//             <option value="10">10 / page</option>
//             <option value="25">25 / page</option>
//           </Form.Select>
//         </Form>

//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               {billType === "vendor" ? (
//                 <th>Entry Number</th>
//               ) : (
//                 <th>Customer Name</th>
//               )}
//               <th>Total Amount</th>
//               <th>Pending</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody ref={tbodyRef}>
//             {paginatedData.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center text-muted">
//                   No bills found
//                 </td>
//               </tr>
//             ) : (
//               paginatedData.map((bill, index) => (
//                 <tr
//                   key={bill._id}
//                   data-index={index}
//                   onClick={() => handleEditInvoice(bill._id)}
//                   style={{
//                     cursor: "pointer",
//                     backgroundColor:
//                       index === focusedRow ? "#d0ebff" : "transparent",
//                   }}
//                 >
//                   <td>{startIndex + index + 1}</td>
//                   {billType === "vendor" ? (
//                     <td>{bill.entryNumber}</td>
//                   ) : (
//                     <td>
//                       {bill.customer?.CustomerName ||
//                         bill.customerId?.CustomerName}
//                     </td>
//                   )}
//                   <td>₹{Number(bill.finalAmount || 0).toFixed(2)}</td>
//                   <td>₹{Number(bill.pendingAmount || 0).toFixed(2)}</td>
//                   <td>
//                     {new Date(
//                       bill.date || bill.billDate || bill.customer?.Billdate
//                     ).toLocaleDateString("en-GB")}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </Table>

//         <div className="d-flex justify-content-between align-items-center mt-3">
//           <span>
//             Showing {startIndex + 1}–
//             {Math.min(startIndex + rowsPerPage, filteredData.length)} of{" "}
//             {filteredData.length}
//           </span>
//           <Pagination className="mb-0">
//             <Pagination.Prev
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//             />
//             {Array.from({ length: totalPages }, (_, i) => (
//               <Pagination.Item
//                 key={i + 1}
//                 active={currentPage === i + 1}
//                 onClick={() => handlePageChange(i + 1)}
//               >
//                 {i + 1}
//               </Pagination.Item>
//             ))}
//             <Pagination.Next
//               disabled={currentPage === totalPages}
//               onClick={() => handlePageChange(currentPage + 1)}
//             />
//           </Pagination>
//         </div>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={clodeModifyBill}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ModifyBill;







import React, { useState, useEffect, useMemo, useRef } from "react";
import { Modal, Button, Form, Table, Pagination } from "react-bootstrap";
import { useModal } from "./global/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchaseBill } from "../redux/features/PurchaseBill/purchaseThunk";
import { fetchCustomerBill } from "../redux/features/CustomerBill/customerThunk";
import { useNavigate } from "react-router-dom";

const ModifyBill = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [billType, setBillType] = useState("vendor");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [focusedRow, setFocusedRow] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clodeModifyBill, modifyBill } = useModal();

  const { PurchaseInvoice } = useSelector((state) => state.purchaseBillInvoice);
  const { CustomerInvoice } = useSelector((state) => state.customerBillInvoice);

  // Refs for inputs
  const searchInputRef = useRef(null);
  const billTypeRef = useRef(null);
  const rowsPerPageRef = useRef(null);
  const inputRefs = [searchInputRef, billTypeRef, rowsPerPageRef];

  const tbodyRef = useRef(null);

  // Fetch data when bill type changes
  useEffect(() => {
    if (billType === "vendor") dispatch(fetchPurchaseBill());
    else dispatch(fetchCustomerBill());

    setCurrentPage(1);
    setFocusedRow(0);
  }, [dispatch, billType]);

  // Auto focus search input when modal opens
  useEffect(() => {
    if (modifyBill && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [modifyBill]);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    const bills = billType === "vendor" ? PurchaseInvoice : CustomerInvoice;
    if (!Array.isArray(bills)) return [];

    return bills.filter((b) => {
      if (billType === "vendor") {
        return (
          b.entryNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.vendorId?.firm?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return (
          b.customer?.CustomerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.customerId?.CustomerName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });
  }, [billType, PurchaseInvoice, CustomerInvoice, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleEditInvoice = (id) => {
    if (!id) return;
    if (billType === "vendor") navigate(`/purchase/${id}`);
    else navigate(`/add-invoice/${id}`);
    clodeModifyBill();
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setFocusedRow(0);
    }
  };

  // Scroll focused row into view
  useEffect(() => {
    if (!tbodyRef.current) return;
    const row = tbodyRef.current.querySelector(`tr[data-index='${focusedRow}']`);
    if (row) row.scrollIntoView({ block: "nearest" });
  }, [focusedRow, currentPage]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    const activeElement = document.activeElement;
    const isInputFocused = inputRefs.some((ref) => ref.current === activeElement);

    // Input navigation (Left / Right)
    if (isInputFocused) {
      const currentIndex = inputRefs.findIndex((ref) => ref.current === activeElement);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % inputRefs.length;
        inputRefs[nextIndex].current.focus();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + inputRefs.length) % inputRefs.length;
        inputRefs[prevIndex].current.focus();
      }
      return; // no further handling
    }

    // Table navigation (Up / Down / Enter)
    if (paginatedData.length) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedRow((prev) => Math.min(prev + 1, paginatedData.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedRow((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          handleEditInvoice(paginatedData[focusedRow]?._id);
          break;
        case "ArrowRight":
          e.preventDefault();
          handlePageChange(currentPage + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePageChange(currentPage - 1);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Modal show={modifyBill} onHide={clodeModifyBill} centered size="lg" onKeyDown={handleKeyDown}>
      <Modal.Header closeButton>
        <Modal.Title>Modify Bill</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form className="mb-3 d-flex gap-2 align-items-center">
          <Form.Control
            type="text"
            placeholder={
              billType === "vendor"
                ? "Search by entry number or vendor name..."
                : "Search by customer name..."
            }
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setFocusedRow(0);
              setCurrentPage(1);
            }}
            ref={searchInputRef}
          />

          <Form.Select value={billType} onChange={(e) => setBillType(e.target.value)} ref={billTypeRef}>
            <option value="vendor">Vendor Bill</option>
            <option value="customer">Customer Bill</option>
          </Form.Select>

          <Form.Select
            style={{ width: "120px" }}
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
              setFocusedRow(0);
            }}
            ref={rowsPerPageRef}
          >
            <option value="5">5 / page</option>
            <option value="10">10 / page</option>
            <option value="25">25 / page</option>
          </Form.Select>
        </Form>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              {billType === "vendor" ? <th>Entry Number</th> : <th>Customer Name</th>}
              <th>Total Amount</th>
              <th>Pending</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody ref={tbodyRef}>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No bills found
                </td>
              </tr>
            ) : (
              paginatedData.map((bill, index) => (
                <tr
                  key={bill._id}
                  data-index={index}
                  onClick={() => handleEditInvoice(bill._id)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: index === focusedRow ? "#d0ebff" : "transparent",
                  }}
                >
                  <td>{startIndex + index + 1}</td>
                  {billType === "vendor" ? <td>{bill.entryNumber}</td> : <td>{bill.customer?.CustomerName || bill.customerId?.CustomerName}</td>}
                  <td>₹{Number(bill.finalAmount || 0).toFixed(2)}</td>
                  <td>₹{Number(bill.pendingAmount || 0).toFixed(2)}</td>
                  <td>{new Date(bill.date || bill.billDate || bill.customer?.Billdate).toLocaleDateString("en-GB")}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span>
            Showing {startIndex + 1}–{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
          </span>
          <Pagination className="mb-0">
            <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item key={i + 1} active={currentPage === i + 1} onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
          </Pagination>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={clodeModifyBill}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModifyBill;
