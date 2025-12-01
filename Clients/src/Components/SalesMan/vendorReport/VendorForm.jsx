// import React from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";

// const VendorForm = ({
//   vendor,
//   setVendor,
//   handleSubmit,
//   editId,
//   handleKeyDown,
//   inputRefs,
// }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVendor((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Row className="mt-3">
//         <Col md={4}>
//           <Form.Group controlId="vendorFirm">
//             <Form.Label>
//               Firm Name <span style={{ color: "red" }}>*</span>
//             </Form.Label>
//             <Form.Control
//               ref={(el) => (inputRefs.current[0] = el)}
//               onKeyDown={(e) => handleKeyDown(e, 0)}
//               type="text"
//               name="firm"
//               value={vendor.firm}
//               onChange={handleChange}
//               placeholder="Enter Party firm"
//               required
//             />
//           </Form.Group>
//         </Col>

//         <Col md={4}>
//           <Form.Group controlId="vendorMobile">
//             <Form.Label>
//               Mobile Number <span style={{ color: "red" }}>*</span>
//             </Form.Label>
//             <Form.Control
//               ref={(el) => (inputRefs.current[1] = el)}
//               onKeyDown={(e) => handleKeyDown(e, 1)}
//               type="Number"
//               name="mobile"
//               value={vendor.mobile}
//               onChange={handleChange}
//               placeholder="Enter mobile number"
//               required
//             />
//           </Form.Group>
//         </Col>

//         <Col md={4}>
//           <Form.Group controlId="vendorTotalBalance">
//             <Form.Label>Balance</Form.Label>
//             <Form.Control
//               ref={(el) => (inputRefs.current[2] = el)}
//               onKeyDown={(e) => handleKeyDown(e, 2)}
//               type="number"
//               name="totalBalance"
//               value={vendor.totalBalance}
//               onChange={handleChange}
//               placeholder="Balance"
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mt-3">
//         <Col md={4}>
//           <Form.Group controlId="vendorCity">
//             <Form.Label>City</Form.Label>
//             <Form.Control
//               ref={(el) => (inputRefs.current[3] = el)}
//               onKeyDown={(e) => handleKeyDown(e, 3)}
//               name="city"
//               placeholder="City"
//               value={vendor.city}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>

//         <Col md={4}>
//           <Form.Group controlId="vendorAddress">
//             <Form.Label>
//               Address <span style={{ color: "red" }}>*</span>
//             </Form.Label>
//             <Form.Control
//               ref={(el) => (inputRefs.current[4] = el)}
//               onKeyDown={(e) => handleKeyDown(e, 4)}
//               type="text"
//               name="address"
//               value={vendor.address}
//               onChange={handleChange}
//               placeholder="Enter address"
//               required
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mt-3">
//         <Col md={4}>
//           <Form.Group controlId="vendorGstNumber">
//             <Form.Label>GST No.</Form.Label>
//             <Form.Control
//               ref={(el) => (inputRefs.current[5] = el)}
//               onKeyDown={(e) => handleKeyDown(e, 5)}
//               name="gstNumber"
//               placeholder="GST No."
//               value={vendor.gstNumber}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <button
//         type="submit"
//         className="btn btn-primary mt-4"
//         ref={(el) => (inputRefs.current[6] = el)} // last index (adjust if needed)
//         onKeyDown={(e) => handleKeyDown(e, 6)} // same function use kar raha hai
//       >
//         {editId ? "Update Party" : "Add Party "}
//       </button>
//     </Form>
//   );
// };

// export default VendorForm;




import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const VendorForm = ({
  vendor,
  setVendor,
  handleSubmit,
  editId,
  handleKeyDown,
  inputRefs,
}) => {
  const [mobileError, setMobileError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 👉 Only for mobile field
    if (name === "mobile") {
      // allow only numbers
      if (!/^\d*$/.test(value)) return;

      // max 10 digits
      if (value.length > 10) return;

      setVendor((prev) => ({ ...prev, mobile: value }));

      // error handling
      if (value.length !== 10) {
        setMobileError("Mobile number must be exactly 10 digits.");
      } else {
        setMobileError("");
      }

      return;
    }

    // 👉 default handler (same as before)
    setVendor((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Form onSubmit={(e) => {
      if (vendor.mobile.length !== 10) {
        setMobileError("Mobile number must be exactly 10 digits.");
        e.preventDefault();
        return;
      }
      handleSubmit(e);
    }}>
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
              maxLength={10}
              required
            />

            {mobileError && (
              <p style={{ color: "red", marginTop: "5px" }}>{mobileError}</p>
            )}
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

      <button
        type="submit"
        className="btn btn-primary mt-4"
        ref={(el) => (inputRefs.current[6] = el)}
        onKeyDown={(e) => handleKeyDown(e, 6)}
      >
        {editId ? "Update Party" : "Add Party "}
      </button>
    </Form>
  );
};

export default VendorForm;
