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
    totalBalance: " ",
    advanceBalance: " ",
  });

  const [vendorList, setVendorList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const formTabRef = useRef(null);
  const listTabRef = useRef(null);

  const inputRefs = useRef([]);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/vendor");
      setVendorList(res.data || []);
    } catch (error) {
      toast.error("Error fetching vendor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
  if (key === "form") {
    // Tab switch hone ke baad thoda delay de focus hone ke liye
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  }
}, [key]);


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
      advanceBalance: " ",
    });
    setEditId(null);

    // ✅ Wait for fresh list before switching
    await fetchVendors();

    // ✅ Switch tab after new data loaded
    setKey("list");

  } catch (error) {
    toast.error("Error saving vendor");
  } finally {
    setLoading(false);
  }
};



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
  //       totalBalance: 0,
  //     });
  //     setEditId(null);
  //     await fetchVendors();
  //     setKey("list");
  //   } catch (error) {
  //     toast.error("Error saving vendor");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleEdit = (v) => {
    setVendor(v);
    setEditId(v._id);
    setKey("form");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm delete?")) return;
    setLoading(true);
    try {
      await axios.delete(`/vendor/${id}`);
      toast.success("Vendor deleted");
      fetchVendors();
    } catch (err) {
      toast.error("Error deleting vendor");
    } finally {
      setLoading(false);
    }
  };


  const handleKeyDown = (e, index) => {
  const input = inputRefs.current[index];
  const total = inputRefs.current.length;

  const next = () => {
    const nextIndex = index + 1;
    if (nextIndex < total) {
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const prev = () => {
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      inputRefs.current[prevIndex]?.focus();
    }
  };

  switch (e.key) {
    case "Enter":
      e.preventDefault();

      // ✅ agar current input last hai (button se pehle)
      if (index === total - 2) {
        // GST Number ke baad button pe focus kare
        inputRefs.current[total - 1]?.focus();
      } 
      // ✅ agar button (last element) pe Enter dabaya gaya
      else if (index === total - 1) {
        handleSubmit(e); // submit karo
        setKey("list");  // aur Party List tab pe chale jao
      } 
      else {
        // otherwise normal next input
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
      setKey("list");
      break;

    default:
      break;
  }
};


  // const handleKeyDown = (e, index) => {
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

  //   const isAtStart = () => {
  //     try {
  //       return input.selectionStart === 0;
  //     } catch {
  //       return true;
  //     }
  //   };

  //   const isAtEnd = () => {
  //     try {
  //       return input.selectionStart === input.value.length;
  //     } catch {
  //       return true;
  //     }
  //   };


  //   switch (e.key) {
  //     case "Enter":
  //     case "ArrowDown":
  //       e.preventDefault();
  //       next();
  //       break;

  //     case "Escape":
  //     case "ArrowUp":
  //       e.preventDefault();
  //       prev();
  //       break;

  //     case "ArrowRight":
  //       if (isAtEnd()) {
  //         e.preventDefault();
  //         next();
  //       }
  //       break;

  //     case "ArrowLeft":
  //       if (isAtStart()) {
  //         e.preventDefault();
  //         prev();
  //       }
  //       break;

  //     case "F10":
  //       e.preventDefault();
  //       handleSubmit(e);
  //       break;

  //     default:
  //       break;
  //   }
  // };

  if (loading) return <Loader />;

  return (
    <Container className="my-4">
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        justify
        className="mb-3"
      >
        <Tab
          eventKey="form"
          title={
            <span
              ref={formTabRef}
              tabIndex={0}
              className="tab-title"
              aria-controls="form-tab-panel"
            >
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
        <Tab
          eventKey="list"
          title={
            <span
              ref={listTabRef}
              tabIndex={0}
              className="tab-title"
              aria-controls="list-tab-panel"
            >
              Party List
            </span>
          }
        >
          <VendorList
            vendorList={vendorList}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            loading={loading}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default VendorTabs;
