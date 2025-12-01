// // src/components/stockStatus/stockstatus.jsx
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const StockStatus = () => {
// //     const [stockData, setStockData] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         fetchStock();
// //     }, []);

// //     const fetchStock = async () => {
// //         try {
// //             const res = await axios.get("https://YOUR_API_URL/stocks");
// //             console.log("API Response:", res.data); 
// //             setStockData(res.data);
// //         } catch (err) {
// //             console.error("Error fetching stock:", err);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const getStatus = (qty, reorderLevel = 10) => {
// //         if (qty <= 0) return { text: "Out of Stock", style: "bg-red-500 text-white" };
// //         if (qty <= reorderLevel) return { text: "Low Stock", style: "bg-yellow-400 text-black" };
// //         return { text: "In Stock", style: "bg-green-500 text-white" };
// //     };

// //     if (loading) return <div className="text-center mt-10">Loading stock data...</div>;

// //     return (
// //         <div className="max-w-6xl mx-auto p-4 mt-10">
// //             <h1 className="text-3xl font-bold text-center mb-6">📦 Stock Status</h1>
// //             <div className="overflow-x-auto">
// //                 <table className="w-full border border-gray-300 text-center">
// //                     <thead className="bg-gray-800 text-white">
// //                         <tr>
// //                             <th className="p-2 border">Sr.No</th>
// //                             <th className="p-2 border">Product Name</th>
// //                             <th className="p-2 border">Code</th>
// //                             <th className="p-2 border">Supplier</th>
// //                             <th className="p-2 border">Opening</th>
// //                             <th className="p-2 border">Stock In</th>
// //                             <th className="p-2 border">Stock Out</th>
// //                             <th className="p-2 border">Current</th>
// //                             <th className="p-2 border">Reorder Level</th>
// //                             <th className="p-2 border">Status</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {stockData.map((item, index) => {
// //                             const status = getStatus(item.currentStock, item.reorderLevel);
// //                             return (
// //                                 <tr key={item.id} className="hover:bg-gray-100">
// //                                     <td className="border p-2">{index + 1}</td>
// //                                     <td className="border p-2">{item.name}</td>
// //                                     <td className="border p-2">{item.code}</td>
// //                                     <td className="border p-2">{item.supplier}</td>
// //                                     <td className="border p-2">{item.openingStock}</td>
// //                                     <td className="border p-2">{item.stockIn}</td>
// //                                     <td className="border p-2">{item.stockOut}</td>
// //                                     <td className="border p-2 font-bold">{item.currentStock}</td>
// //                                     <td className="border p-2">{item.reorderLevel}</td>
// //                                     <td className={`border p-2 rounded font-bold ${status.style}`}>{status.text}</td>
// //                                 </tr>
// //                             );
// //                         })}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     );
// // };

// // export default StockStatus;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const StockStatus = () => {
//     const [stockData, setStockData] = useState([]);
//     const [error, setError] = useState(false);

//     // const API_URL = "https://YOUR_API_URL/stocks";

//     useEffect(() => {
//         fetchStock();
//     }, []);

//     const fetchStock = async () => {
//         try {
//             const res = await axios.get(API_URL);
//             setStockData(res.data);
//         } catch (err) {
//             console.error("API error:", err);
//             setError(true);

//             // fallback data
//             setStockData([
//                 {
//                     id: 1,
//                     name: "Product A",
//                     code: "PA001",
//                     supplier: "Supplier X",
//                     openingStock: 50,
//                     stockIn: 20,
//                     stockOut: 10,
//                     currentStock: 60,
//                     reorderLevel: 10,
//                 },
//                 {
//                     id: 2,
//                     name: "Product B",
//                     code: "PB001",
//                     supplier: "Supplier Y",
//                     openingStock: 30,
//                     stockIn: 15,
//                     stockOut: 5,
//                     currentStock: 40,
//                     reorderLevel: 10,
//                 },
//             ]);
//         }
//     };

//     const getStatus = (qty, reorderLevel = 10) => {
//         if (qty <= 0) return { text: "Out of Stock", style: "bg-red-500 text-white" };
//         if (qty <= reorderLevel) return { text: "Low Stock", style: "bg-yellow-400 text-black" };
//         return { text: "In Stock", style: "bg-green-500" };
//     };

// return (
//     <div className="w-screen min-h-screen p-4 ">
//         <h1 className="text-3xl font-bold text-center mb-6">Stock Status</h1>

//         <div className="overflow-x-auto ">
//             <table className="mt-3 w-full border-collapse">
//                 <thead>
//                     <tr>
//                         <th>Sr.No</th>
//                         <th>Product Name</th>
//                         <th>Code</th>
//                         <th>Supplier</th>
//                         <th>Opening</th>
//                         <th>Stock In</th>
//                         <th>Stock Out</th>
//                         <th>Current</th>
//                         <th>Reorder Level</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {stockData.map((item, index) => {
//                         const status = getStatus(item.currentStock, item.reorderLevel);

//                         return (
//                             <tr key={item.id} className="hover:bg-gray-100">
//                                 <td className="border p-2">{index + 1}</td>
//                                 <td className="border p-2">{item.name}</td>
//                                 <td className="border p-2">{item.code}</td>
//                                 <td className="border p-2">{item.supplier}</td>
//                                 <td className="border p-2">{item.openingStock}</td>
//                                 <td className="border p-2">{item.stockIn}</td>
//                                 <td className="border p-2">{item.stockOut}</td>
//                                 <td className="border p-2 font-bold">{item.currentStock}</td>
//                                 <td className="border p-2">{item.reorderLevel}</td>
//                                 <td className={`border p-2 font-semibold ${status.style}`}>
//                                     {status.text}
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         </div>

//         {error && (
//             <div className="text-center text-red-500 mt-4 font-semibold">
//                 ⚠️ API not available. Showing fallback data.
//             </div>
//         )}
//     </div>
// );

// };

// export default StockStatus;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../stockStatus/StockStatus.css"; // <-- Added CSS file

// const StockStatus = () => {
//     const [stockData, setStockData] = useState([]);
//     const [error, setError] = useState(false);

//     // const API_URL = "https://YOUR_API_URL/stocks";

//     useEffect(() => {
//         fetchStock();
//     }, []);

//     const fetchStock = async () => {
//         try {
//             const res = await axios.get(API_URL);
//             setStockData(res.data);
//         } catch (err) {
//             console.error("API error:", err);
//             setError(true);

//             // fallback data
//             setStockData([
//                 {
//                     id: 1,
//                     name: "Product A",
//                     code: "PA001",
//                     supplier: "Supplier X",
//                     openingStock: 50,
//                     stockIn: 20,
//                     stockOut: 10,
//                     currentStock: 60,
//                     reorderLevel: 10,
//                 },
//                 {
//                     id: 2,
//                     name: "Product B",
//                     code: "PB001",
//                     supplier: "Supplier Y",
//                     openingStock: 30,
//                     stockIn: 15,
//                     stockOut: 5,
//                     currentStock: 40,
//                     reorderLevel: 10,
//                 },
//             ]);
//         }
//     };

//     const getStatus = (qty, reorderLevel = 10) => {
//         if (qty <= 0) return { text: "Out of Stock", style: "status-red" };
//         if (qty <= reorderLevel) return { text: "Low Stock", style: "status-yellow" };
//         return { text: "In Stock", style: "status-green" };
//     };

//     return (
//         <div className="stock-page">

//             <h1 className="title">Stock Status</h1>

//             {/* Full width table container */}
//             <div className="table-wrapper">
//                 <table className="stock-table">
//                     <thead>
//                         <tr>
//                             <th>Sr.No</th>
//                             <th>Product Name</th>
//                             <th>Code</th>
//                             <th>Supplier</th>
//                             <th>Opening</th>
//                             <th>Stock In</th>
//                             <th>Stock Out</th>
//                             <th>Current</th>
//                             <th>Reorder Level</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {stockData.map((item, index) => {
//                             const status = getStatus(item.currentStock, item.reorderLevel);

//                             return (
//                                 <tr key={item.id}>
//                                     <td>{index + 1}</td>
//                                     <td>{item.name}</td>
//                                     <td>{item.code}</td>
//                                     <td>{item.supplier}</td>
//                                     <td>{item.openingStock}</td>
//                                     <td>{item.stockIn}</td>
//                                     <td>{item.stockOut}</td>
//                                     <td>{item.currentStock}</td>
//                                     <td>{item.reorderLevel}</td>
//                                     <td className={status.style}>{status.text}</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//             {/* {error && (
//                 <div className="error-message">
//                     ⚠️ API not available. Showing fallback data.
//                 </div>
//             )} */}
//         </div>
//     );
// };

// export default StockStatus;






import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stockStatus/StockStatus.css";

const StockStatus = () => {
    const [stockData, setStockData] = useState([]);
    const [error, setError] = useState(false);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    // const API_URL = "https://YOUR_API_URL/stocks";

    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        try {
            const res = await axios.get(API_URL);
            setStockData(res.data);
        } catch (err) {
            console.error("API error:", err);
            setError(true);

            // fallback data
            setStockData([
                {
                    id: 1,
                    name: "Product A",
                    code: "PA001",
                    supplier: "Supplier X",
                    openingStock: 50,
                    stockIn: 20,
                    stockOut: 10,
                    currentStock: 60,
                    reorderLevel: 10,
                },
                {
                    id: 2,
                    name: "Product B",
                    code: "PB001",
                    supplier: "Supplier Y",
                    openingStock: 30,
                    stockIn: 15,
                    stockOut: 5,
                    currentStock: 40,
                    reorderLevel: 10,
                },
            ]);
        }
    };

    const getStatus = (qty, reorderLevel = 10) => {
        if (qty <= 0) return { text: "Out of Stock", style: "status-red" };
        if (qty <= reorderLevel) return { text: "Low Stock", style: "status-yellow" };
        return { text: "In Stock", style: "status-green" };
    };

    // ===== MODAL HANDLERS =====
    const openEditModal = (item) => {
        setEditItem({ ...item }); // copy to avoid direct mutation
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditItem(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditItem((prev) => ({
            ...prev,
            [name]: name === "reorderLevel" || name === "openingStock" || name === "stockIn" || name === "stockOut" || name === "currentStock" ? Number(value) : value,
        }));
    };

    const handleSave = () => {
        // Validate if you want here

        // Update stockData array with edited item
        setStockData((prev) =>
            prev.map((item) => (item.id === editItem.id ? editItem : item))
        );

        closeModal();
    };

    // ===== DELETE FUNCTIONALITY =====
    const handleDelete = (id) => {
        if (!window.confirm("Do you really want to delete?")) return;
        setStockData(stockData.filter((item) => item.id !== id));
    };

    return (
        <div className="stock-page">
            <h1 className="title">Stock Status</h1>

            <div className="table-wrapper">
                <table className="stock-table">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Product Name</th>
                            <th>Code</th>
                            <th>Supplier</th>
                            <th>Opening</th>
                            <th>Stock In</th>
                            <th>Stock Out</th>
                            <th>Current</th>
                            <th>Reorder Level</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {stockData.map((item, index) => {
                            const status = getStatus(item.currentStock, item.reorderLevel);
                            return (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.code}</td>
                                    <td>{item.supplier}</td>
                                    <td>{item.openingStock}</td>
                                    <td>{item.stockIn}</td>
                                    <td>{item.stockOut}</td>
                                    <td>{item.currentStock}</td>
                                    <td>{item.reorderLevel}</td>
                                    <td className={status.style}>{status.text}</td>
                                    <td style={{ textAlign: "center" }}>
                                        {/* <button className="btn-edit" onClick={() => openEditModal(item)}>Edit</button> */}
                                        <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* ===== MODAL ===== */}


            {showModal && (
    <div className="modal-overlay-new">
        <div className="modal-box-new">

            {/* Close Button */}
            <button className="modal-close-btn" onClick={closeModal}>×</button>

            <h2 className="modal-title">Edit Product</h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
                className="modal-form"
            >
                <div className="form-grid">
                    <label>
                        Product Name:
                        <input
                            type="text"
                            name="name"
                            value={editItem.name}
                            onChange={handleEditChange}
                        />
                    </label>

                    <label>
                        Code:
                        <input
                            type="text"
                            name="code"
                            value={editItem.code}
                            onChange={handleEditChange}
                        />
                    </label>

                    <label>
                        Supplier:
                        <input
                            type="text"
                            name="supplier"
                            value={editItem.supplier}
                            onChange={handleEditChange}
                        />
                    </label>

                    <label>
                        Opening Stock:
                        <input
                            type="number"
                            name="openingStock"
                            value={editItem.openingStock}
                            onChange={handleEditChange}
                        />
                    </label>

                    <label>
                        Stock In:
                        <input
                            type="number"
                            name="stockIn"
                            value={editItem.stockIn}
                            onChange={handleEditChange}
                        />
                    </label>

                    <label>
                        Stock Out:
                        <input
                            type="number"
                            name="stockOut"
                            value={editItem.stockOut}
                            onChange={handleEditChange}
                        />
                    </label>

                    <label>
                        Current Stock:
                        <input
                            type="number"
                            name="currentStock"
                            value={editItem.currentStock}
                            onChange={handleEditChange}
                        />
                    </label>

                    <label>
                        Reorder Level:
                        <input
                            type="number"
                            name="reorderLevel"
                            value={editItem.reorderLevel}
                            onChange={handleEditChange}
                        />
                    </label>
                </div>

                <div className="modal-buttons">
                    <button type="submit" className="btn-save">Save</button>
                    <button type="button" className="btn-cancel" onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
)}

            {/* {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit Product</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSave();
                            }}
                        >
                            <label>
                                Product Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={editItem.name}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>
                            <label>
                                Code:
                                <input
                                    type="text"
                                    name="code"
                                    value={editItem.code}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>
                            <label>
                                Supplier:
                                <input
                                    type="text"
                                    name="supplier"
                                    value={editItem.supplier}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>
                            <label>
                                Opening Stock:
                                <input
                                    type="number"
                                    name="openingStock"
                                    value={editItem.openingStock}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>
                            <label>
                                Stock In:
                                <input
                                    type="number"
                                    name="stockIn"
                                    value={editItem.stockIn}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>
                            <label>
                                Stock Out:
                                <input
                                    type="number"
                                    name="stockOut"
                                    value={editItem.stockOut}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>
                            <label>
                                Current Stock:
                                <input
                                    type="number"
                                    name="currentStock"
                                    value={editItem.currentStock}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>
                            <label>
                                Reorder Level:
                                <input
                                    type="number"
                                    name="reorderLevel"
                                    value={editItem.reorderLevel}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>

                            <div style={{ marginTop: "1rem" }}>
                                <button type="submit" className="btn-edit">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="btn-delete"
                                    style={{ marginLeft: "10px" }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default StockStatus;
