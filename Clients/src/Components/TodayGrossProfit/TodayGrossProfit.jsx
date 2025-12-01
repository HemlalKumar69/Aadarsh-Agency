// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TodayGrossProfit = () => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // API URL (yaha apna real API URL daalna)
//     const API_URL = "https://your-api.com/gross-profit";

//     useEffect(() => {
//         axios.get(API_URL)
//             .then((response) => {
//                 setData(response.data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.log("API Error:", error);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return (
//             <div className="w-full text-center mt-10 text-xl font-semibold">
//                 Loading...
//             </div>
//         );
//     }

//     if (!data) {
//         return (
//             <div className="w-full text-center mt-10 text-xl text-red-500 font-semibold">
//                 Error: Data Not Found 🚫
//             </div>
//         );
//     }

//     return (
//         <div className="w-[90%] mx-auto p-5">
//             <h2 className="text-center font-bold mb-6 text-3xl">
//                 Today Topic: Gross Profit
//             </h2>

//             <table className="w-full border-collapse border border-black">
//                 <tbody>
//                     <tr>
//                         <th className="border border-black p-3 font-semibold">Meaning</th>
//                         <td className="border border-black p-3">{data.meaning}</td>
//                     </tr>
//                     <tr>
//                         <th className="border border-black p-3 font-semibold">Formula</th>
//                         <td className="border border-black p-3">{data.formula}</td>
//                     </tr>
//                     <tr>
//                         <th className="border border-black p-3 font-semibold">Purpose</th>
//                         <td className="border border-black p-3">{data.purpose}</td>
//                     </tr>
//                 </tbody>
//             </table>

//             <h3 className="font-bold text-xl mt-6 mb-2">Example:</h3>

//             <table className="w-full border-collapse border border-black">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="border border-black p-3 font-semibold">Particulars</th>
//                         <th className="border border-black p-3 font-semibold">Amount (₹)</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td className="border border-black p-3">Total Sales</td>
//                         <td className="border border-black p-3">{data.sales}</td>
//                     </tr>
//                     <tr>
//                         <td className="border border-black p-3">Cost of Goods Sold</td>
//                         <td className="border border-black p-3">{data.cogs}</td>
//                     </tr>
//                     <tr className="bg-green-50">
//                         <th className="border border-black p-3 font-bold">Gross Profit</th>
//                         <th className="border border-black p-3 font-bold">
//                             {data.grossProfit}
//                         </th>
//                     </tr>
//                 </tbody>
//             </table>

//             <div className="bg-blue-100 mt-6 p-4 border-l-4 border-blue-600">
//                 <b>Note:</b> {data.note}
//             </div>

//             <p className="mt-4 font-semibold">👉 {data.footerText}</p>
//         </div>
//     );
// };

// export default TodayGrossProfit;





// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TodayGrossProfit = () => {
//     const [data, setData] = useState(null);

//     // ⚠️ Replace API URL
//     const API_URL = "";

//     useEffect(() => {
//         axios
//             .get(API_URL)
//             .then((res) => setData(res.data))
//             .catch(() =>
//                 setData({
//                     meaning:
//                         "Gross Profit is the profit after deducting the cost of goods sold.",
//                     formula: "Gross Profit = Total Sales – Cost of Goods Sold (COGS)",
//                     purpose:
//                         "It shows how efficiently a company produces and sells goods.",
//                     sales: 50000,
//                     cogs: 30000,
//                     grossProfit: 20000,
//                     note:
//                         "Gross Profit helps in measuring business profitability.",
//                     footerText:
//                         "This is an important concept in business accounting."
//                 })
//             );
//     }, []);

//     if (!data) {
//         return (
//             <div className="text-center mt-10 text-xl text-red-500 font-semibold">
//                 Error: Data Not Found 🚫
//             </div>
//         );
//     }

//     return (
//         <div className="w-full p-6 bg-gray-100 min-h-screen">

//             {/* Title */}
//             <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//                 Today <span className="text-blue-700">Gross Profit</span>
//             </h1>

//             {/* Details Table */}
//             <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mb-8">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-blue-100">
//                             <th className="border p-3 text-left font-bold text-gray-700 w-1/3">
//                                 Particular
//                             </th>
//                             <th className="border p-3 text-left font-bold text-gray-700">
//                                 Details
//                             </th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         <tr>
//                             <td className="border p-3 font-semibold">Meaning</td>
//                             <td className="border p-3">{data.meaning}</td>
//                         </tr>
//                         <tr>
//                             <td className="border p-3 font-semibold">Formula</td>
//                             <td className="border p-3">{data.formula}</td>
//                         </tr>
//                         <tr>
//                             <td className="border p-3 font-semibold">Purpose</td>
//                             <td className="border p-3">{data.purpose}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>

//             {/* Example Section */}
//             <h2 className="text-2xl font-bold mb-3 max-w-4xl mx-auto">Example:</h2>

//             <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-green-100">
//                             <th className="border p-3 font-bold text-left text-gray-700">
//                                 Particulars
//                             </th>
//                             <th className="border p-3 font-bold text-left text-gray-700">
//                                 Amount (₹)
//                             </th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         <tr>
//                             <td className="border p-3">Total Sales</td>
//                             <td className="border p-3">{data.sales}</td>
//                         </tr>
//                         <tr>
//                             <td className="border p-3">Cost of Goods Sold</td>
//                             <td className="border p-3">{data.cogs}</td>
//                         </tr>
//                         <tr className="bg-green-50">
//                             <td className="border p-3 font-bold">Gross Profit</td>
//                             <td className="border p-3 font-bold">{data.grossProfit}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>

//             {/* Note Section */}
//             <div className="max-w-4xl mx-auto mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
//                 <b>Note:</b> {data.note}
//             </div>

//             {/* Footer */}
//             <p className="max-w-4xl mx-auto mt-4 font-semibold text-gray-700">
//                 👉 {data.footerText}
//             </p>
//         </div>
//     );
// };

// export default TodayGrossProfit;






// import React, { useEffect, useState } from "react";

// const TodayGrossProfit = () => {
//     const [rows, setRows] = useState([]);

//     useEffect(() => {
//         // 🔥 Dummy Data (API ke bina)
//         const data = [
//             {
//                 billNo: "S-1505",
//                 customer: "Lala",
//                 totalItem: 10,
//                 sales: 9000,
//                 purchase: 0
//             },
//             {
//                 billNo: "P-1215",
//                 customer: "Vijay",
//                 totalItem: 18,
//                 sales: 0,
//                 purchase: 8000
//             },
//             {
//                 billNo: "S-1506",
//                 customer: "karan",
//                 totalItem: 5,
//                 sales: 0,
//                 purchase: 15000
//             },
//             {
//                 billNo: "P-1216",
//                 customer: "umesh",
//                 totalItem: 9,
//                 sales: 12000,
//                 purchase: 0
//             }
//         ];

//         setRows(data);
//     }, []);

//     const totalSales = rows.reduce((sum, row) => sum + (row.sales || 0), 0);
//     const totalPurchase = rows.reduce((sum, row) => sum + (row.purchase || 0), 0);
//     const monthProfit = totalSales - totalPurchase;

//     return (
//         <div className=" p-6 bg-gray-100 min-h-screen">

//             <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//                 Today <span className="text-blue-700">Gross Profit</span>
//             </h1>

//             <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
//                 <table className="border-collapse text-left">
//                     <thead>
//                         <tr className="bg-gray-200 w-full">
//                             <th className="border p-3">Bill No.</th>
//                             <th className="border p-3">Customer Name</th>
//                             <th className="border p-3">Total Item</th>
//                             <th className="border p-3">Sales Price</th>
//                             <th className="border p-3">Purchase Price</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {rows.map((row, index) => (
//                             <tr key={index}>
//                                 <td className="border p-3">{row.billNo}</td>
//                                 <td className="border p-3">{row.customer}</td>
//                                 <td className="border p-3">{row.totalItem}</td>
//                                 <td className="border p-3">
//                                     {row.sales ? `₹${row.sales}` : "-"}
//                                 </td>
//                                 <td className="border p-3">
//                                     {row.purchase ? `₹${row.purchase}` : "-"}
//                                 </td>
//                             </tr>
//                         ))}

//                         {/* Total Row */}
//                         <tr className="bg-gray-100 font-bold">
//                             <td className="border p-3 text-center" colSpan={3}>
//                                 Total 
//                             </td>
//                             <td className="border p-3">₹{totalSales}</td>
//                             <td className="border p-3">₹{totalPurchase}</td>
//                         </tr>

//                         {/* This Month Profit */}
//                         <tr className="bg-green-100 font-bold text-green-900">
//                             <td className="border p-3 text-center" colSpan={3}>
//                                 This Month Profit 
//                             </td>
//                             <td className="border p-3 text-lg" colSpan={2}>
//                                 ₹ {monthProfit}
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     );
// };

// export default TodayGrossProfit;






import React, { useEffect, useState } from "react";
import "./TodayGrossProfit.css";  // <-- Custom CSS include

const TodayGrossProfit = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const data = [
            { billNo: "S-1505", customer: "Lala", totalItem: 10, sales: 15000, purchase: 0 },
            { billNo: "P-1215", customer: "Vijay", totalItem: 3, sales: 0, purchase: 8000 },
            { billNo: "S-1506", customer: "Karan", totalItem: 5, sales: 0, purchase: 15000 },
            { billNo: "P-1216", customer: "Umesh", totalItem: 9, sales: 12000, purchase: 0 }
        ];
        setRows(data);
    }, []);

    const totalSales = rows.reduce((sum, row) => sum + (row.sales || 0), 0);
    const totalPurchase = rows.reduce((sum, row) => sum + (row.purchase || 0), 0);
    const monthProfit = totalSales - totalPurchase;

    return (
        <div className="gp-container">

            <h1 className="gp-title">
                Today <span>Gross Profit</span>
            </h1>

            <div className="gp-box">
                <table className="gp-table">
                    <thead>
                        <tr>
                            <th className="text-center">Bill No.</th>
                            <th className="text-center">Customer Name</th>
                            <th className="text-center">Total Item</th>
                            <th className="text-center">Sales Price</th>
                            <th className="text-center">Purchase Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.billNo}</td>
                                <td>{row.customer}</td>
                                <td>{row.totalItem}</td>
                                <td>{row.sales ? `₹${row.sales}` : "-"}</td>
                                <td>{row.purchase ? `₹${row.purchase}` : "-"}</td>
                            </tr>
                        ))}

                        <tr className="gp-total">
                            <td colSpan={3} className="gp-center">Total</td>
                            <td>₹{totalSales}</td>
                            <td>₹{totalPurchase}</td>
                        </tr>

                        <tr className="gp-profit">
                            <td colSpan={3} className="gp-center">This Month Profit</td>
                            <td colSpan={2}>₹{monthProfit}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default TodayGrossProfit;
