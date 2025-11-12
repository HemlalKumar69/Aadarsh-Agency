// // import React, { useState } from "react";
// // import { Tabs, Tab } from "react-bootstrap";
// // import AddSalesMan from "./AddSalesMan";
// // import DisplaySalesMan from "./DisplaySalesMan";

// // const SalesmanTabs = () => {
// //   const [key, setKey] = useState("form");
// //   const [editId, setEditId] = useState(null);
// //   const [refreshList, setRefreshList] = useState(false);

// //   const handleEdit = (id) => {
// //     setEditId(id);
// //     setKey("form");
// //   };

// //   const handleSuccess = () => {
// //     setEditId(null); // Clear edit mode
// //     setRefreshList((prev) => !prev); // Toggle to trigger list refresh
// //     setKey("list");
// //   };

// //   return (
// //     <div className="container mt-3">
// //       <Tabs
// //         activeKey={key}
// //         onSelect={(k) => setKey(k)}
// //         className="mb-3"
// //         justify
// //       >
// //         <Tab eventKey="form" title={editId ? "Edit Salesman" : "Add Salesman"}>
// //           <AddSalesMan idToEdit={editId} onSuccess={handleSuccess} />
// //         </Tab>
// //         <Tab eventKey="list" title="Salesman List">
// //           <DisplaySalesMan onEdit={handleEdit} refreshTrigger={refreshList} />
// //         </Tab>
// //       </Tabs>
// //     </div>
// //   );
// // };

// // export default SalesmanTabs;




// import React, { useState } from "react";
// import { Tabs, Tab } from "react-bootstrap";
// import AddSalesMan from "./AddSalesMan";
// import DisplaySalesMan from "./DisplaySalesMan";

// const SalesmanTabs = () => {
//   const [key, setKey] = useState("form");
//   const [editId, setEditId] = useState(null);
//   const [refreshList, setRefreshList] = useState(false);

//   const handleEdit = (id) => {
//     setEditId(id);
//     setKey("form");
//   };

//   const handleSuccess = () => {
//     setEditId(null);
//     setRefreshList((prev) => !prev);
//     setKey("list"); // Switch to Salesman List tab
//   };

  

//   return (
//     <div className="container mt-3">
//       <Tabs
//         activeKey={key}
//         onSelect={(k) => setKey(k)}
//         className="mb-3"
//         justify
//       >
//         <Tab eventKey="form" title={editId ? "Edit Salesman" : "Add Salesman"}>
//           <AddSalesMan idToEdit={editId} onSuccess={handleSuccess} />
//         </Tab>
//         <Tab eventKey="list" title="Salesman List">
//           <DisplaySalesMan onEdit={handleEdit} refreshTrigger={refreshList} />
//         </Tab>
//       </Tabs>
//     </div>
//   );
// };

// export default SalesmanTabs;




import React, { useState, useEffect, useRef } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AddSalesMan from "./AddSalesMan";
import DisplaySalesMan from "./DisplaySalesMan";

const SalesmanTabs = () => {
  const [key, setKey] = useState("form");
  const [editId, setEditId] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  // ✅ Refs
  const addSalesmanFirstInputRef = useRef(null);
  const listContainerRef = useRef(null); // for scrolling Salesman list only
  const listSearchInputRef = useRef(null); // ✅ ref for search input in DisplaySalesMan

  const handleEdit = (id) => {
    setEditId(id);
    setKey("form");
  };

  const handleSuccess = () => {
    setEditId(null);
    setRefreshList((prev) => !prev);
    setKey("list"); // Switch to Salesman List tab
  };

  // ✅ Keyboard navigation and scroll control
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Left/Right arrows to switch tabs
      if (e.key === "ArrowLeft") {
        setKey("form");
        setTimeout(() => addSalesmanFirstInputRef.current?.focus(), 100);
      } else if (e.key === "ArrowRight") {
        setKey("list");
      }

      // Up/Down arrows to scroll only the table
      if (["ArrowDown", "ArrowUp"].includes(e.key)) {
        if (key === "list" && listContainerRef.current) {
          e.preventDefault(); // prevent whole page scroll
          const scrollAmount = e.key === "ArrowDown" ? 50 : -50;
          listContainerRef.current.scrollBy({
            top: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key]);

  // ✅ Auto-focus first input on form tab switch
  useEffect(() => {
    if (key === "form") {
      setTimeout(() => addSalesmanFirstInputRef.current?.focus(), 100);
    } else if (key === "list") {
      setTimeout(() => listSearchInputRef.current?.focus(), 100); // auto-focus search input
    }
  }, [key]);

  return (
    <div className="container mt-3">
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        justify
      >
        <Tab eventKey="form" title={editId ? "Edit Salesman" : "Add Salesman"}>
          <AddSalesMan
            idToEdit={editId}
            onSuccess={handleSuccess}
            firstInputRef={addSalesmanFirstInputRef} // send ref for auto-focus
          />
        </Tab>

        <Tab eventKey="list" title="Salesman List">
          {/* Scrollable container for Salesman list */}
          <div
            ref={listContainerRef}
            style={{
              maxHeight: "65vh",
              overflowY: "auto",
              border: "1px solid #dee2e6",
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            <DisplaySalesMan
              onEdit={handleEdit}
              refreshTrigger={refreshList}
              searchInputRef={listSearchInputRef} // ✅ pass ref to DisplaySalesMan
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default SalesmanTabs;
