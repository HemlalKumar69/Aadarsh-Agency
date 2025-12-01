// import React, { useEffect, useState } from "react";
// import { Container, Table } from "react-bootstrap";
// import axios from "../../Config/axios"; 
// const StockSaleAnalysis = () => {
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         try {
//             const res = await axios.get("/stock-sale-analysis");
//             setData(res.data.data);
//         } catch (err) {
//             console.log("Error:", err);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <Container className="mt-4">
//             <h3>Stock & Sale Analysis</h3>

//             <Table striped bordered hover className="mt-3">
//                 <thead>
//                     <tr>
//                         <th>Product Name</th>
//                         <th>HCL Code</th>
//                         <th>Available Qty</th>
//                         <th>Sale Qty</th>
//                         <th>Sale Amount</th>
//                         <th>Profit Amount</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {data.map((item, index) => (
//                         <tr key={index}>
//                             <td>{item.productName}</td>
//                             <td>{item.hclCode}</td>
//                             <td>{item.availableQty}</td>
//                             <td>{item.saleQty}</td>
//                             <td>{item.saleAmount}</td>
//                             <td>{item.profitAmount}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// export default StockSaleAnalysis;





import React, { useEffect, useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import axios from "../../Config/axios";

const StockSaleAnalysis = () => {
    const [data, setData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const fetchData = async () => {
        try {
            // Pass dates as query parameters
            const res = await axios.get("/stock-sale-analysis", {
                params: {
                    fromDate,
                    toDate,
                },
            });
            setData(res.data?.data || []);
        } catch (err) {
            console.log("Error:", err);
        }
    };

    const handleFilter = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <Container className="mt-4">
            <h3>Stock & Sale Analysis</h3>

            {/* From-To Date Filter */}
            <Form className="d-flex align-items-end gap-2 mt-3" onSubmit={handleFilter}>
                <Form.Group>
                    <Form.Label>From Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>To Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-2">
                    Filter
                </Button>
            </Form>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>HCL Code</th>
                        <th>Available Qty</th>
                        <th>Sale Qty</th>
                        <th>Sale Amount</th>
                        <th>Profit Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No Data Found
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.productName}</td>
                                <td>{item.hclCode}</td>
                                <td>{item.availableQty}</td>
                                <td>{item.saleQty}</td>
                                <td>{item.saleAmount}</td>
                                <td>{item.profitAmount}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default StockSaleAnalysis;
