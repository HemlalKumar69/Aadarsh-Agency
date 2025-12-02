import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Button,
  Pagination,
} from "react-bootstrap";
import axios from "../../Config/axios";
import VendorModel from "./VendorModel";

const VendorLedger = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Input refs for keyboard navigation
  const startRef = useRef(null);
  const endRef = useRef(null);
  const getBtnRef = useRef(null);

  // ✅ Open modal automatically on page load
  useEffect(() => {
    setShowModal(true);
  }, []);

  // ✅ Fetch ledger
  const fetchLedger = async () => {
    if (!selectedVendor) return alert("Please select a vendor");

    const res = await axios.get(`/ledger/${selectedVendor._id}`, {
      params: { startDate, endDate },
    });

    setLedgerEntries(res.data.data || []);
    setCurrentPage(1);
  }

  // ✅ Keyboard navigation among fields
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      if (document.activeElement === startRef.current) endRef.current.focus();
      else if (document.activeElement === endRef.current)
        getBtnRef.current.focus();
    }
    if (e.key === "ArrowLeft") {
      if (document.activeElement === getBtnRef.current) endRef.current.focus();
      else if (document.activeElement === endRef.current)
        startRef.current.focus();
    }
    if (e.key === "Enter" && document.activeElement === getBtnRef.current) {
      fetchLedger();
    }
  };

  // Pagination logic
  const totalEntries = ledgerEntries.length;
  const totalPages =
    rowsPerPage === "all" ? 1 : Math.ceil(totalEntries / rowsPerPage);

  const startIndex =
    rowsPerPage === "all" ? 0 : (currentPage - 1) * rowsPerPage;
  const endIndex =
    rowsPerPage === "all"
      ? ledgerEntries.length
      : startIndex + Number(rowsPerPage);

  const currentEntries =
    rowsPerPage === "all"
      ? ledgerEntries
      : ledgerEntries.slice(startIndex, endIndex);

  const handleRowsPerPageChange = (e) => {
    const value = e.target.value;
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const renderPagination = () => {
    if (rowsPerPage === "all" || totalPages <= 1) return null;

    return (
      <Pagination className="justify-content-end mt-3">
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

  return (
    <Container fluid className="p-4" onKeyDown={handleKeyDown} tabIndex={0}>
      <h2 className="mb-4">Vendor Ledger</h2>

      <Row className="mb-4">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Vendor</Form.Label>
            <div className="d-flex">
              <Form.Control
                value={selectedVendor ? selectedVendor.firm : ""}
                placeholder="Select vendor"
                readOnly
              />
              <Button
                variant="secondary"
                onClick={() => setShowModal(true)}
                className="ms-2"
              >
                Search
              </Button>
            </div>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              ref={startRef}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              ref={endRef}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={3} className="d-flex align-items-end justify-content-between">
          <Button variant="primary" ref={getBtnRef} onClick={fetchLedger}>
            Get Ledger
          </Button>

          <Form.Select
            size="sm"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            style={{ width: "120px" }}
          >
            <option value="5">5 rows</option>
            <option value="10">10 rows</option>
            <option value="15">15 rows</option>
            <option value="20">20 rows</option>
            <option value="all">All</option>
          </Form.Select>
        </Col>
      </Row>

      <Table striped bordered hover responsive size="sm">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Ref Type</th>
            <th>Ref ID</th>
            <th>Narration</th>
            <th>Debit Account</th>
            <th>Credit Account</th>
            <th>Debit</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No records found
              </td>
            </tr>
          ) : (
            currentEntries.map((entry) => (
              <tr key={entry._id}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.refType}</td>
                <td>{entry.refId}</td>
                <td>{entry.narration}</td>
                <td>{entry.debitAccount}</td>
                <td>{entry.creditAccount}</td>
                <td>₹ {Number(entry.debit || 0).toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {renderPagination()}

      <VendorModel
        show={showModal}
        onHide={() => setShowModal(false)}
        onSelect={(v) => {
          setSelectedVendor(v);
          setShowModal(false);
          setTimeout(() => startRef.current.focus(), 100);
        }}
      />
    </Container>
  );
};

export default VendorLedger;
