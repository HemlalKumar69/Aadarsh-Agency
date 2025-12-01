// import React from "react";
// import { Modal, Button, Form, Row, Col } from "react-bootstrap";

// const PartyModal = ({ show, onHide, onSubmit }) => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     // Map form fields to backend expected names
//     const party = {
//       firm: formData.get("firm"),
//       mobile: formData.get("mobile"),
//       totalBalance: formData.get("totalBalance") || "0",
//       city: formData.get("city"),
//       gstNumber: formData.get("gstNumber"),
//       address: formData.get("address"),
//     };

//     onSubmit(party);
//   };

//   return (
//     <Modal show={show} onHide={onHide} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Add Party</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Row className="mb-3">
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Firm Name* </Form.Label>
//                 <Form.Control
//                   name="firm"
//                   required
//                   placeholder="Enter Party firm"
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Mobile Number *</Form.Label>
//                 <Form.Control
//                   name="mobile"
//                   required
//                   placeholder="Enter mobile number"
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={4}>
//               <Form.Group>
//                 <Form.Label>Balance</Form.Label>
//                 <Form.Control
//                   name="totalBalance"
//                   defaultValue="0"
//                   onInput={(e) => {
//                     let value = e.target.value;

//                     // Allow only numbers with up to 2 decimals
//                     if (!/^\d*\.?\d{0,2}$/.test(value)) {
//                       // Remove extra decimals
//                       value = value.slice(0, -1);
//                     }

//                     e.target.value = value;
//                   }}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>City</Form.Label>
//                 <Form.Control name="city" placeholder="City" />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Address *</Form.Label>
//                 <Form.Control
//                   name="address"
//                   required
//                   placeholder="Enter address"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>GST No.</Form.Label>
//                 <Form.Control name="gstNumber" placeholder="GST No." />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Button type="submit" variant="primary">
//             Add Party
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default PartyModal;




import React, { useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const PartyModal = ({ show, onHide, onSubmit }) => {
  const firmRef = useRef(null);
  const mobileRef = useRef(null);
  const balanceRef = useRef(null);
  const cityRef = useRef(null);
  const addressRef = useRef(null);
  const gstRef = useRef(null);
  const submitBtnRef = useRef(null);

  const inputs = [
    firmRef,
    mobileRef,
    balanceRef,
    cityRef,
    addressRef,
    gstRef,
  ];

  // Move focus to next or previous input
  const handleKeyNavigation = (e, index) => {
    if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      if (index < inputs.length - 1) {
        inputs[index + 1].current.focus();
      } else {
        submitBtnRef.current.focus(); // Last field → Move to button
      }
    }

    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) {
        inputs[index - 1].current.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const party = {
      firm: formData.get("firm"),
      mobile: formData.get("mobile"),
      totalBalance: formData.get("totalBalance") || "0",
      city: formData.get("city"),
      gstNumber: formData.get("gstNumber"),
      address: formData.get("address"),
    };

    onSubmit(party);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      onEntered={() => firmRef.current?.focus()} // Auto focus first input
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Party</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Firm Name*</Form.Label>
                <Form.Control
                  name="firm"
                  required
                  placeholder="Enter Party firm"
                  ref={firmRef}
                  onKeyDown={(e) => handleKeyNavigation(e, 0)}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Mobile Number *</Form.Label>
                <Form.Control
                  name="mobile"
                  required
                  placeholder="Enter mobile number"
                  ref={mobileRef}
                  onKeyDown={(e) => handleKeyNavigation(e, 1)}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Balance</Form.Label>
                <Form.Control
                  name="totalBalance"
                  defaultValue="0"
                  ref={balanceRef}
                  onInput={(e) => {
                    let value = e.target.value;
                    if (!/^\d*\.?\d{0,2}$/.test(value)) {
                      e.target.value = value.slice(0, -1);
                    }
                  }}
                  onKeyDown={(e) => handleKeyNavigation(e, 2)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  placeholder="City"
                  ref={cityRef}
                  onKeyDown={(e) => handleKeyNavigation(e, 3)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Address *</Form.Label>
                <Form.Control
                  name="address"
                  required
                  placeholder="Enter address"
                  ref={addressRef}
                  onKeyDown={(e) => handleKeyNavigation(e, 4)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>GST No.</Form.Label>
                <Form.Control
                  name="gstNumber"
                  placeholder="GST No."
                  ref={gstRef}
                  onKeyDown={(e) => handleKeyNavigation(e, 5)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            type="submit"
            ref={submitBtnRef}
            variant="primary"
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                gstRef.current.focus();
              }
            }}
          >
            Add Party
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PartyModal;
