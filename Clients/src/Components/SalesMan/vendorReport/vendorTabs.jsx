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
