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
//     totalBalance: " ",
//     advanceBalance: " ",
//   });

//   const [vendorList, setVendorList] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const formTabRef = useRef(null);
//   const listTabRef = useRef(null);

//   const inputRefs = useRef([]);

//   const fetchVendors = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/vendor");
//       setVendorList(res.data || []);
//     } catch (error) {
//       toast.error("Error fetching vendor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   useEffect(() => {
//   if (key === "form") {
//     // Tab switch hone ke baad thoda delay de focus hone ke liye
//     setTimeout(() => {
//       inputRefs.current[0]?.focus();
//     }, 100);
//   }
// }, [key]);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   try {
//     if (editId) {
//       await axios.put(`/vendor/${editId}`, vendor);
//       toast.success("Vendor updated");
//     } else {
//       await axios.post("/vendor", vendor);
//       toast.success("Vendor added");
//     }

//     setVendor({
//       firm: "",
//       mobile: "",
//       city: "",
//       address: "",
//       gstNumber: "",
//       totalBalance: "",
//       advanceBalance: " ",
//     });
//     setEditId(null);

//     // ✅ Wait for fresh list before switching
//     await fetchVendors();

//     // ✅ Switch tab after new data loaded
//     setKey("list");

//   } catch (error) {
//     toast.error("Error saving vendor");
//   } finally {
//     setLoading(false);
//   }
// };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   try {
//   //     if (editId) {
//   //       await axios.put(`/vendor/${editId}`, vendor);
//   //       toast.success("Vendor updated");
//   //     } else {
//   //       await axios.post("/vendor", vendor);
//   //       toast.success("Vendor added");
//   //     }
//   //     setVendor({
//   //       firm: "",
//   //       mobile: "",
//   //       city: "",
//   //       address: "",
//   //       gstNumber: "",
//   //       totalBalance: 0,
//   //     });
//   //     setEditId(null);
//   //     await fetchVendors();
//   //     setKey("list");
//   //   } catch (error) {
//   //     toast.error("Error saving vendor");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleEdit = (v) => {
//     setVendor(v);
//     setEditId(v._id);
//     setKey("form");
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Confirm delete?")) return;
//     setLoading(true);
//     try {
//       await axios.delete(`/vendor/${id}`);
//       toast.success("Vendor deleted");
//       fetchVendors();
//     } catch (err) {
//       toast.error("Error deleting vendor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e, index) => {
//   const input = inputRefs.current[index];
//   const total = inputRefs.current.length;

//   const next = () => {
//     const nextIndex = index + 1;
//     if (nextIndex < total) {
//       inputRefs.current[nextIndex]?.focus();
//     }
//   };

//   const prev = () => {
//     const prevIndex = index - 1;
//     if (prevIndex >= 0) {
//       inputRefs.current[prevIndex]?.focus();
//     }
//   };

//   switch (e.key) {
//     case "Enter":
//       e.preventDefault();

//       // ✅ agar current input last hai (button se pehle)
//       if (index === total - 2) {
//         // GST Number ke baad button pe focus kare
//         inputRefs.current[total - 1]?.focus();
//       }
//       // ✅ agar button (last element) pe Enter dabaya gaya
//       else if (index === total - 1) {
//         handleSubmit(e); // submit karo
//         setKey("list");  // aur Party List tab pe chale jao
//       }
//       else {
//         // otherwise normal next input
//         next();
//       }
//       break;

//     case "ArrowDown":
//       e.preventDefault();
//       next();
//       break;

//     case "ArrowUp":
//       e.preventDefault();
//       prev();
//       break;

//     case "F10":
//       e.preventDefault();
//       handleSubmit(e);
//       setKey("list");
//       break;

//     default:
//       break;
//   }
// };

//   // const handleKeyDown = (e, index) => {
//   //   const input = inputRefs.current[index];
//   //   const total = inputRefs.current.length;

//   //   const next = () => {
//   //     const nextIndex = index + 1;
//   //     if (nextIndex < total) {
//   //       inputRefs.current[nextIndex]?.focus();
//   //     }
//   //   };

//   //   const prev = () => {
//   //     const prevIndex = index - 1;
//   //     if (prevIndex >= 0) {
//   //       inputRefs.current[prevIndex]?.focus();
//   //     }
//   //   };

//   //   const isAtStart = () => {
//   //     try {
//   //       return input.selectionStart === 0;
//   //     } catch {
//   //       return true;
//   //     }
//   //   };

//   //   const isAtEnd = () => {
//   //     try {
//   //       return input.selectionStart === input.value.length;
//   //     } catch {
//   //       return true;
//   //     }
//   //   };

//   //   switch (e.key) {
//   //     case "Enter":
//   //     case "ArrowDown":
//   //       e.preventDefault();
//   //       next();
//   //       break;

//   //     case "Escape":
//   //     case "ArrowUp":
//   //       e.preventDefault();
//   //       prev();
//   //       break;

//   //     case "ArrowRight":
//   //       if (isAtEnd()) {
//   //         e.preventDefault();
//   //         next();
//   //       }
//   //       break;

//   //     case "ArrowLeft":
//   //       if (isAtStart()) {
//   //         e.preventDefault();
//   //         prev();
//   //       }
//   //       break;

//   //     case "F10":
//   //       e.preventDefault();
//   //       handleSubmit(e);
//   //       break;

//   //     default:
//   //       break;
//   //   }
//   // };

//   if (loading) return <Loader />;

//   return (
//     <Container className="my-4">
//       <Tabs
//         activeKey={key}
//         onSelect={(k) => setKey(k)}
//         justify
//         className="mb-3"
//       >
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
//   const searchRef = useRef(null); // ✅ search input focus ref
//   const tableRef = useRef(null); // ✅ vendor list scroll ref
//   const inputRefs = useRef([]); // form inputs

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
//       setTimeout(() => inputRefs.current[0]?.focus(), 150);
//     } else if (key === "list") {
//       // ✅ Auto focus search input when Party List tab opens
//       setTimeout(() => searchRef.current?.focus(), 200);
//     }
//   }, [key]);

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
//       setTimeout(() => searchRef.current?.focus(), 200);
//     } catch (error) {
//       toast.error("Error saving vendor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (v) => {
//     setVendor(v);
//     setEditId(v._id);
//     setKey("form");
//     setTimeout(() => inputRefs.current[0]?.focus(), 200);
//   };

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

//   // ✅ Keyboard Left/Right for switching tabs
//   const handleTabKeyDown = (e) => {
//     if (e.key === "ArrowRight") {
//       e.preventDefault();
//       if (key === "form") {
//         setKey("list");
//         setTimeout(() => searchRef.current?.focus(), 200);
//       }
//     } else if (e.key === "ArrowLeft") {
//       e.preventDefault();
//       if (key === "list") {
//         setKey("form");
//         setTimeout(() => formTabRef.current?.focus(), 150);
//       }
//     }
//   };

//   // ✅ Scroll Party List with Arrow Up/Down
//   const handlePartyListScroll = (e) => {
//     if (key !== "list") return;
//     const container = tableRef.current;
//     if (!container) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       container.scrollBy({ top: 50, behavior: "smooth" });
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       container.scrollBy({ top: -50, behavior: "smooth" });
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <Container
//       className="my-4"
//       onKeyDown={(e) => {
//         handleTabKeyDown(e);
//         handlePartyListScroll(e);
//       }}
//     >
//       <Tabs activeKey={key} onSelect={(k) => setKey(k)} justify className="mb-3">
//         {/* ADD PARTY */}
//         <Tab
//           eventKey="form"
//           title={
//             <span ref={formTabRef} tabIndex={0} className="tab-title">
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

//         {/* PARTY LIST */}
//         <Tab
//           eventKey="list"
//           title={
//             <span ref={listTabRef} tabIndex={0} className="tab-title">
//               Party List
//             </span>
//           }
//         >
//           <VendorList
//             vendorList={vendorList}
//             handleEdit={handleEdit}
//             handleDelete={handleDelete}
//             loading={loading}
//             searchRef={searchRef} // ✅ pass search input ref
//             tableRef={tableRef} // ✅ pass scroll container ref
//           />
//         </Tab>
//       </Tabs>
//     </Container>
//   );
// };

// export default VendorTabs;

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
//   const searchRef = useRef(null);
//   const tableRef = useRef(null);
//   const inputRefs = useRef([]);

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

//   // Auto focus on tab change
//   useEffect(() => {
//     if (key === "form") {
//       setTimeout(() => inputRefs.current[0]?.focus(), 150);
//     } else if (key === "list") {
//       setTimeout(() => searchRef.current?.focus(), 200);
//     }
//   }, [key]);

//   // Submit vendor form
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
//       setTimeout(() => searchRef.current?.focus(), 200);
//     } catch (error) {
//       toast.error("Error saving vendor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Edit vendor
//   const handleEdit = (v) => {
//     setVendor(v);
//     setEditId(v._id);
//     setKey("form");
//     setTimeout(() => inputRefs.current[0]?.focus(), 200);
//   };

//   // Delete vendor
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

//   // Form input navigation
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

//   // ✅ Handle Arrow key tab switching (now Left works too)
//   const handleTabKeyDown = (e) => {
//     // Go to Party List
//     if (e.key === "ArrowRight") {
//       e.preventDefault();
//       if (key === "form") {
//         setKey("list");
//         setTimeout(() => searchRef.current?.focus(), 200);
//       }
//     }

//     // Go back to Add Party
//     if (e.key === "ArrowLeft") {
//       e.preventDefault();
//       if (key === "list") {
//         setKey("form");
//         setTimeout(() => inputRefs.current[0]?.focus(), 200);
//       }
//     }
//   };

//   // Scroll Party List with Arrow keys
//   const handlePartyListScroll = (e) => {
//     if (key !== "list") return;
//     const container = tableRef.current;
//     if (!container) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       container.scrollBy({ top: 50, behavior: "smooth" });
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       container.scrollBy({ top: -50, behavior: "smooth" });
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <Container
//       className="my-4"
//       // ✅ Keep this on root container so keys work globally
//       tabIndex={0}
//       onKeyDown={(e) => {
//         handleTabKeyDown(e);
//         handlePartyListScroll(e);
//       }}
//       style={{ outline: "none" }}
//     >
//       <Tabs activeKey={key} onSelect={(k) => setKey(k)} justify className="mb-3">
//         {/* ADD PARTY TAB */}
//         <Tab
//           eventKey="form"
//           title={
//             <span ref={formTabRef} tabIndex={-1} className="tab-title">
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

//         {/* PARTY LIST TAB */}
//         <Tab
//           eventKey="list"
//           title={
//             <span ref={listTabRef} tabIndex={-1} className="tab-title">
//               Party List
//             </span>
//           }
//         >
//           <VendorList
//             vendorList={vendorList}
//             handleEdit={handleEdit}
//             handleDelete={handleDelete}
//             loading={loading}
//             searchRef={searchRef}
//             tableRef={tableRef}
//           />
//         </Tab>
//       </Tabs>
//     </Container>
//   );
// };

// export default VendorTabs;

import React, { useState, useEffect, useRef } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import VendorForm from "./VendorForm";
import VendorList from "./VendorList";
import axios from "../../../Config/axios";
import toast from "react-hot-toast";
import Loader from "../../Loader";

const VendorTabs = () => {
  const [key, setKey] = useState("form");
  const [vendor, setVendor] = useState({
    firm: "",
    mobile: "",
    city: "",
    address: "",
    gstNumber: "",
    totalBalance: "",
    advanceBalance: "",
  });
  const [vendorList, setVendorList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const formTabRef = useRef(null);
  const listTabRef = useRef(null);
  const searchRef = useRef(null);
  const tableRef = useRef(null);
  const inputRefs = useRef([]);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/vendor");
      setVendorList(res.data || []);
    } catch (error) {
      toast.error("Error fetching vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  //arrow left/right
  useEffect(() => {
  const handleGlobalKey = (e) => {
    handleTabKeyDown(e);
    handlePartyListScroll(e);
  };

  window.addEventListener("keydown", handleGlobalKey);
  return () => window.removeEventListener("keydown", handleGlobalKey);
}, [key]);


  // Auto focus on tab change
  useEffect(() => {
    if (key === "form") {
      setTimeout(() => inputRefs.current[0]?.focus(), 150);
    } else if (key === "list") {
      setTimeout(() => searchRef.current?.focus(), 200);
    }
  }, [key]);

  // Submit vendor form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await axios.put(`/vendor/${editId}`, vendor);
        toast.success("Vendor updated");
      } else {
        await axios.post("/vendor", vendor);
        toast.success("Vendor added");
      }

      setVendor({
        firm: "",
        mobile: "",
        city: "",
        address: "",
        gstNumber: "",
        totalBalance: "",
        advanceBalance: "",
      });
      setEditId(null);
      await fetchVendors();
      setKey("list");
      setTimeout(() => searchRef.current?.focus(), 200);
    } catch (error) {
      toast.error("Error saving vendor");
    } finally {
      setLoading(false);
    }
  };

  // Edit vendor
  const handleEdit = (v) => {
    setVendor(v);
    setEditId(v._id);
    setKey("form");
    setTimeout(() => inputRefs.current[0]?.focus(), 200);
  };

  // Delete vendor
  const handleDelete = async (id) => {
    if (!window.confirm("Confirm delete?")) return;
    setLoading(true);
    try {
      await axios.delete(`/vendor/${id}`);
      toast.success("Vendor deleted");
      fetchVendors();
    } catch {
      toast.error("Error deleting vendor");
    } finally {
      setLoading(false);
    }
  };

  // Form input navigation
  const handleKeyDown = (e, index) => {
    const total = inputRefs.current.length;
    const next = () => {
      const nextIndex = index + 1;
      if (nextIndex < total) inputRefs.current[nextIndex]?.focus();
    };
    const prev = () => {
      const prevIndex = index - 1;
      if (prevIndex >= 0) inputRefs.current[prevIndex]?.focus();
    };

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (index === total - 2) {
          inputRefs.current[total - 1]?.focus();
        } else if (index === total - 1) {
          handleSubmit(e);
        } else {
          next();
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        next();
        break;
      case "ArrowUp":
        e.preventDefault();
        prev();
        break;
      case "F10":
        e.preventDefault();
        handleSubmit(e);
        break;
      default:
        break;
    }
  };

  // ✅ Handle Arrow key tab switching (now Left works too)
  // const handleTabKeyDown = (e) => {
  //   // Go to Party List
  //   if (e.key === "ArrowRight") {
  //     e.preventDefault();
  //     if (key === "form") {
  //       setKey("list");
  //       setTimeout(() => searchRef.current?.focus(), 200);
  //     }
  //   }

  //   // Go back to Add Party
  //   if (e.key === "ArrowLeft") {
  //     e.preventDefault();
  //     if (key === "list") {
  //       // <-- fix here
  //       setKey("form");
  //       setTimeout(() => inputRefs.current[0]?.focus(), 200);
  //     }
  //   }
  // };
  const handleTabKeyDown = (e) => {
  if (e.key === "ArrowRight" && key === "form") {
    e.preventDefault();
    setKey("list");
    setTimeout(() => searchRef.current?.focus(), 200);
  }

  if (e.key === "ArrowLeft" && key === "list") {
    e.preventDefault();
    setKey("form");
    setTimeout(() => inputRefs.current[0]?.focus(), 200);
  }
};

  // Scroll Party List with Arrow keys
  const handlePartyListScroll = (e) => {
    if (key !== "list") return;
    const container = tableRef.current;
    if (!container) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      container.scrollBy({ top: 50, behavior: "smooth" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      container.scrollBy({ top: -50, behavior: "smooth" });
    }
  };

  if (loading) return <Loader />;

  return (
    // <Container
    //   className="my-4"
    //   // ✅ Keep this on root container so keys work globally
    //   tabIndex={0}
    //   onKeyDown={(e) => {
    //     handleTabKeyDown(e);
    //     handlePartyListScroll(e);
    //   }}
    //   style={{ outline: "none" }}
    // >
    <Container
  tabIndex={0}
  onKeyDown={(e) => {
    handleTabKeyDown(e);
    handlePartyListScroll(e);
  }}
  style={{ outline: "none" }}
>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        justify
        className="mb-3"
      >
        {/* ADD PARTY TAB */}
        <Tab
          eventKey="form"
          title={
            <span ref={formTabRef} tabIndex={-1} className="tab-title">
              {editId ? "Edit Party" : "Add Party"}
            </span>
          }
        >
          <VendorForm
            vendor={vendor}
            setVendor={setVendor}
            handleSubmit={handleSubmit}
            editId={editId}
            inputRefs={inputRefs}
            handleKeyDown={handleKeyDown}
          />
        </Tab>

        {/* PARTY LIST TAB */}
        <Tab
          eventKey="list"
          title={
            <span ref={listTabRef} tabIndex={-1} className="tab-title">
              Party List
            </span>
          }
        >
          <VendorList
            vendorList={vendorList}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            loading={loading}
            searchRef={searchRef}
            tableRef={tableRef}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default VendorTabs;
