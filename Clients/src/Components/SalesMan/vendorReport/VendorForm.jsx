import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const VendorForm = ({
  vendor,
  setVendor,
  handleSubmit,
  editId,
  handleKeyDown,
  inputRefs,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mt-3">
        <Col md={4}>
          <Form.Group controlId="vendorFirm">
            <Form.Label>
              Firm Name <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              ref={(el) => (inputRefs.current[0] = el)}
              onKeyDown={(e) => handleKeyDown(e, 0)}
              type="text"
              name="firm"
              value={vendor.firm}
              onChange={handleChange}
              placeholder="Enter Party firm"
              required
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="vendorMobile">
            <Form.Label>
              Mobile Number <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              ref={(el) => (inputRefs.current[1] = el)}
              onKeyDown={(e) => handleKeyDown(e, 1)}
              type="text"
              name="mobile"
              value={vendor.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="vendorTotalBalance">
            <Form.Label>Balance</Form.Label>
            <Form.Control
              ref={(el) => (inputRefs.current[2] = el)}
              onKeyDown={(e) => handleKeyDown(e, 2)}
              type="number"
              name="totalBalance"
              value={vendor.totalBalance}
              onChange={handleChange}
              placeholder="Balance"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={4}>
          <Form.Group controlId="vendorCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              ref={(el) => (inputRefs.current[3] = el)}
              onKeyDown={(e) => handleKeyDown(e, 3)}
              name="city"
              placeholder="City"
              value={vendor.city}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="vendorAddress">
            <Form.Label>
              Address <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              ref={(el) => (inputRefs.current[4] = el)}
              onKeyDown={(e) => handleKeyDown(e, 4)}
              type="text"
              name="address"
              value={vendor.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={4}>
          <Form.Group controlId="vendorGstNumber">
            <Form.Label>GST No.</Form.Label>
            <Form.Control
              ref={(el) => (inputRefs.current[5] = el)}
              onKeyDown={(e) => handleKeyDown(e, 5)}
              name="gstNumber"
              placeholder="GST No."
              value={vendor.gstNumber}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* <Button variant="primary" type="submit" className="mt-3">
        {editId ? "Update Party" : "Add Party"}
      </Button> */}

      <button
        type="submit"
        className="btn btn-primary mt-4"
        ref={(el) => (inputRefs.current[6] = el)}  // last index (adjust if needed)
        onKeyDown={(e) => handleKeyDown(e, 6)}     // same function use kar raha hai
      >
        {editId ? "Update Party" : "Add Party "}
      </button>

    </Form>
  );
};

export default VendorForm;


// import React, { useState, useEffect, useRef } from "react";
// import { Container, Tabs, Tab } from "react-bootstrap";
// import VendorForm from "./VendorForm";
// import VendorList from "./VendorList";
// import axios from "../../../Config/axios";
// import toast from "react-hot-toast";
// import Loader from "../../Loader";

// const VendorTabs = () => {
//   const [key, setKey] = useState("form");
//   const [vendor, setVendor] = useState({
//     firm: "",
//     mobile: "",
//     city: "",
//     address: "",
//     gstNumber: "",
//     totalBalance: "",
//     advanceBalance: "",
//   });
//   const [vendorList, setVendorList] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const formTabRef = useRef(null);
//   const listTabRef = useRef(null);
//   const inputRefs = useRef([]); // inputs inside VendorForm

//   const fetchVendors = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/vendor");
//       setVendorList(res.data || []);
//     } catch (error) {
//       toast.error("Error fetching vendors");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   // ✅ Auto focus on first input when Add Party tab opens
//   useEffect(() => {
//     if (key === "form") {
//       setTimeout(() => {
//         inputRefs.current[0]?.focus();
//       }, 150);
//     }
//   }, [key]);

//   // ✅ Handle Save
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (editId) {
//         await axios.put(`/vendor/${editId}`, vendor);
//         toast.success("Vendor updated");
//       } else {
//         await axios.post("/vendor", vendor);
//         toast.success("Vendor added");
//       }

//       setVendor({
//         firm: "",
//         mobile: "",
//         city: "",
//         address: "",
//         gstNumber: "",
//         totalBalance: "",
//         advanceBalance: "",
//       });
//       setEditId(null);

//       await fetchVendors();
//       setKey("list");

//       // focus back to Party List tab button
//       setTimeout(() => listTabRef.current?.focus(), 200);
//     } catch (error) {
//       toast.error("Error saving vendor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Edit handler
//   const handleEdit = (v) => {
//     setVendor(v);
//     setEditId(v._id);
//     setKey("form");
//     setTimeout(() => {
//       inputRefs.current[0]?.focus();
//     }, 200);
//   };

//   // ✅ Delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Confirm delete?")) return;
//     setLoading(true);
//     try {
//       await axios.delete(`/vendor/${id}`);
//       toast.success("Vendor deleted");
//       fetchVendors();
//     } catch {
//       toast.error("Error deleting vendor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Keyboard handling inside form inputs
//   const handleKeyDown = (e, index) => {
//     const total = inputRefs.current.length;

//     const next = () => {
//       const nextIndex = index + 1;
//       if (nextIndex < total) inputRefs.current[nextIndex]?.focus();
//     };

//     const prev = () => {
//       const prevIndex = index - 1;
//       if (prevIndex >= 0) inputRefs.current[prevIndex]?.focus();
//     };

//     switch (e.key) {
//       case "Enter":
//         e.preventDefault();
//         if (index === total - 2) {
//           inputRefs.current[total - 1]?.focus();
//         } else if (index === total - 1) {
//           handleSubmit(e);
//         } else {
//           next();
//         }
//         break;
//       case "ArrowDown":
//         e.preventDefault();
//         next();
//         break;
//       case "ArrowUp":
//         e.preventDefault();
//         prev();
//         break;
//       case "F10":
//         e.preventDefault();
//         handleSubmit(e);
//         break;
//       default:
//         break;
//     }
//   };

//   // ✅ Keyboard Left/Right for tab switching
//   const handleTabKeyDown = (e) => {
//     if (e.key === "ArrowRight") {
//       e.preventDefault();
//       if (key === "form") {
//         setKey("list");
//         setTimeout(() => listTabRef.current?.focus(), 150);
//       }
//     } else if (e.key === "ArrowLeft") {
//       e.preventDefault();
//       if (key === "list") {
//         setKey("form");
//         setTimeout(() => formTabRef.current?.focus(), 150);
//       }
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <Container className="my-4" onKeyDown={handleTabKeyDown}>
//       <Tabs activeKey={key} onSelect={(k) => setKey(k)} justify className="mb-3">
//         {/* ========== ADD PARTY TAB ========== */}
//         <Tab
//           eventKey="form"
//           title={
//             <span
//               ref={formTabRef}
//               tabIndex={0}
//               className="tab-title"
//               aria-controls="form-tab-panel"
//             >
//               {editId ? "Edit Party" : "Add Party"}
//             </span>
//           }
//         >
//           <VendorForm
//             vendor={vendor}
//             setVendor={setVendor}
//             handleSubmit={handleSubmit}
//             editId={editId}
//             inputRefs={inputRefs}
//             handleKeyDown={handleKeyDown}
//           />
//         </Tab>

//         {/* ========== PARTY LIST TAB ========== */}
//         <Tab
//           eventKey="list"
//           title={
//             <span
//               ref={listTabRef}
//               tabIndex={0}
//               className="tab-title"
//               aria-controls="list-tab-panel"
//             >
//               Party List
//             </span>
//           }
//         >
//           <VendorList
//             vendorList={vendorList}
//             handleEdit={handleEdit}
//             handleDelete={handleDelete}
//             loading={loading}
//           />
//         </Tab>
//       </Tabs>
//     </Container>
//   );
// };

// export default VendorTabs;
