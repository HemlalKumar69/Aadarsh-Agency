// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const DispatchSummary = () => {
//     // Initial dummy data rakha, taaki table turant dikhe
//     const initialData = [
//         { id: 1, date: "2025-02-01", invoice: "INV-101", customer: "Sharma Traders", qty: 50, transport: "MH12 AB 2345", status: "Dispatched" },
//         { id: 2, date: "2025-02-02", invoice: "INV-102", customer: "Agarwal Hardware", qty: 75, transport: "MH14 XY 9988", status: "Pending" },
//         { id: 3, date: "2025-02-03", invoice: "INV-103", customer: "Super Cement Co.", qty: 120, transport: "UP78 DD 5566", status: "Delivered" }
//     ];

//     const [dispatchList, setDispatchList] = useState(initialData);

//     useEffect(() => {
//         const fetchDispatchData = async () => {
//             try {
//                 const res = await axios.get("http://localhost:5000/api/dispatch");

//                 if (res.data && res.data.length > 0) {
//                     setDispatchList(res.data); // Backend se aate hi update kar do
//                 }

//             } catch (error) {
//                 console.log("Backend not ready — keeping initial data...");
//             }
//         };

//         fetchDispatchData();
//     }, []);

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>🚚 Dispatch Summary</h2>
//             <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: "collapse", marginTop: "15px" }}>
//                 <thead style={{ background: "#e6e6e6" }}>
//                     <tr>
//                         <th>Date</th>
//                         <th>Invoice No.</th>
//                         <th>Customer</th>
//                         <th>Qty</th>
//                         <th>Transport</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {dispatchList.map((item) => (
//                         <tr key={item.id}>
//                             <td>{item.date}</td>
//                             <td>{item.invoice}</td>
//                             <td>{item.customer}</td>
//                             <td>{item.qty}</td>
//                             <td>{item.transport}</td>
//                             <td style={{ fontWeight: "bold" }}>{item.status}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default DispatchSummary;






import React, { useState, useEffect } from "react";
import axios from "axios";

const DispatchSummary = () => {

    const initialData = [
        {
            id: 1,
            invoice: "INV-10231",
            customer: "Shiv Traders",
            product: "Cement",
            qty: 40,
            vehicle: "MH04-4550",
            status: "Dispatched",
            
        },
        {
            id: 2,
            invoice: "INV-10232",
            customer: "Patel Hardware",
            product: "Steel Rod",
            qty: 20,
            vehicle: "-",
            status: "Pending",
            
        },
        {
            id: 3,
            invoice: "INV-10233",
            customer: "Raj Agency",
            product: "Paint",
            qty: 10,
            vehicle: "GJ05-2201",
            status: "Delivered",
            
        },
    ];

    const [dispatchList, setDispatchList] = useState(initialData);

    
    const totalQty = dispatchList.reduce((sum, i) => sum + Number(i.qty || 0), 0);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <h2 style={{ margin: "5px 0" }}>DISPATCH SUMMARY (Date: Today)</h2>
                
            </div>
            
            <table
                border="1"
                width="100%"
                cellPadding="10"
                style={{ borderCollapse: "collapse", fontSize: "16px" }}
            >
                <thead className="bg-gray-100 font-bold">
                    <tr>
                        <th>Invoice No</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Vehicle</th>
                        <th>Status</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {dispatchList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.invoice}</td>
                            <td>{item.customer}</td>
                            <td>{item.product}</td>
                            <td>{item.qty}</td>
                            <td>{item.vehicle}</td>
                            <td style={{ fontWeight: "600" }}>{item.status}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div style={{ marginTop: "25px", textAlign: "center" }}>
                
                <h3>
                    TOTAL DISPATCH: {dispatchList.length} &nbsp; | &nbsp;
                    TOTAL QTY: {totalQty} &nbsp; | &nbsp;
                    VALUE: ₹1,85,000
                </h3>
                
            </div>
        </div>
    );
};

export default DispatchSummary;
