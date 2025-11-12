// import React, { useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";
// import dayjs from "dayjs";

// const FilterModal = ({
//   show,
//   onHide,
//   onSubmit,
//   selectedType,
//   setSelectedType,
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
// }) => {
//   useEffect(() => {
//     if (!endDate) {
//       const today = dayjs().format("YYYY-MM-DD");
//       setEndDate(today);
//     }
//   }, [endDate, setEndDate]);

//   return (
//     <Modal show={show} onHide={onHide} backdrop="static" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Select Type & Date </Modal.Title>
//       </Modal.Header>
//       <form onSubmit={onSubmit}>
//         <Modal.Body>
//           <div className="mb-3">
//             <label className="form-label">Type</label>
//             <div className="d-flex gap-2">
//               <Button
//                 variant={
//                   selectedType === "mrwise" ? "primary" : "outline-primary"
//                 }
//                 onClick={() => setSelectedType("mrwise")}
//               >
//                 MR Wise
//               </Button>
//               <Button
//                 variant={
//                   selectedType === "areawise" ? "primary" : "outline-primary"
//                 }
//                 onClick={() => setSelectedType("areawise")}
//               >
//                 Area Wise
//               </Button>
//             </div>
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Start Date (Optional)</label>
//             <input
//               type="date"
//               className="form-control"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">End Date (Optional)</label>
//             <input
//               type="date"
//               className="form-control"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={onHide}>
//             Close
//           </Button>
//           <Button variant="primary" type="submit">
//             Next
//           </Button>
//         </Modal.Footer>
//       </form>
//     </Modal>
//   );
// };

// export default FilterModal;

import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import dayjs from "dayjs";

const FilterModal = ({
  show,
  onHide,
  onSubmit,
  selectedType,
  setSelectedType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const mrButtonRef = useRef(null);
  const areaButtonRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const closeButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const [focusStage, setFocusStage] = useState("type"); // type | start | end | buttons

  useEffect(() => {
    if (!endDate) {
      const today = dayjs().format("YYYY-MM-DD");
      setEndDate(today);
    }
  }, [endDate, setEndDate]);

  // Auto-focus type button when modal opens
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        mrButtonRef.current?.focus();
        setFocusStage("type");
      }, 100);
    }
  }, [show]);

  const handleKeyDown = (e) => {
    switch (focusStage) {
      case "type":
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          if (document.activeElement === mrButtonRef.current) {
            areaButtonRef.current?.focus();
          } else {
            mrButtonRef.current?.focus();
          }
        }
        if (e.key === "Enter") {
          e.preventDefault();
          // move focus to Start Date
          startDateRef.current?.focus();
          setFocusStage("start");
        }
        break;

      case "start":
        if (e.key === "Enter") {
          e.preventDefault();
          endDateRef.current?.focus();
          setFocusStage("end");
        }
        break;

      case "end":
        if (e.key === "Enter") {
          e.preventDefault();
          closeButtonRef.current?.focus();
          setFocusStage("buttons");
        }
        break;

      case "buttons":
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          if (document.activeElement === closeButtonRef.current) {
            nextButtonRef.current?.focus();
          } else {
            closeButtonRef.current?.focus();
          }
        }
        if (e.key === "Enter") {
          e.preventDefault();
          if (document.activeElement === closeButtonRef.current) {
            onHide();
          } else if (document.activeElement === nextButtonRef.current) {
            onSubmit();
          }
        }
        break;

      default:
        break;
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered onKeyDown={handleKeyDown}>
      <Modal.Header closeButton>
        <Modal.Title>Select Type & Date</Modal.Title>
      </Modal.Header>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // prevent page reload
          onSubmit();
        }}
      >
        <Modal.Body>
          {/* Type Buttons */}
          <div className="mb-3">
            <label className="form-label">Type</label>
            <div className="d-flex gap-2">
              <Button
                ref={mrButtonRef}
                variant={selectedType === "mrwise" ? "primary" : "outline-primary"}
                onClick={() => setSelectedType("mrwise")}
              >
                MR Wise
              </Button>
              <Button
                ref={areaButtonRef}
                variant={selectedType === "areawise" ? "primary" : "outline-primary"}
                onClick={() => setSelectedType("areawise")}
              >
                Area Wise
              </Button>
            </div>
          </div>

          {/* Start Date */}
          <div className="mb-3">
            <label className="form-label">Start Date (Optional)</label>
            <input
              ref={startDateRef}
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* End Date */}
          <div className="mb-3">
            <label className="form-label">End Date (Optional)</label>
            <input
              ref={endDateRef}
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button ref={closeButtonRef} variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button ref={nextButtonRef} variant="primary" type="submit">
            Next
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FilterModal;


