const prchaseInvoice = require("../Models/PurchaseModel");
const salesInvoice = require("../Models/BillingModel");

// async function getInventorySummaryCustomer(req, res) {
//   try {
//     // Fetch all invoices with full population of related data
//     const invoices = await salesInvoice
//       .find({})
//       .populate({
//         path: "salesmanId",
//         model: "Salesman",
//       })
//       .populate({
//         path: "customerId",
//         model: "Customer",
//       })
//       .populate({
//         path: "companyId",
//         model: "Company",
//       })
//       .populate({
//         path: "billing.productId",
//         model: "Product",
//       })
//       .populate({
//         path: "ledgerIds",
//         model: "CustomerLedger",
//       })
//       // populate nested embedded customer.selectedBeatId
//       .populate({
//         path: "customer.selectedCustomerId",
//         model: "Customer",
//       })
//       .populate({
//         path: "customer.selectedSalesmanId",
//         model: "Salesman",
//       });

//     console.log("Fetch reports", invoices);

//     res.status(200).json({
//       message: "Fetched all invoices with related data successfully",
//       invoices,
//     });
//   } catch (error) {
//     console.error("Error in getInventorySummaryCustomer:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

// const salesInvoice = require("../models/Invoice"); // Adjust your path

// ✅ Get all invoices with full details populated

async function getInventorySummaryCustomer(req, res) {
  try {
    const invoices = await salesInvoice
      .find({})
      // Basic populations
      .populate("salesmanId", "name email mobile") // pick only relevant fields
      .populate("customerId", "CustomerName mobile address")
      .populate("companyId", "CompanyName address GSTNumber")

      // Populate billing product details
      .populate({
        path: "billing.productId",
        model: "Product",
        select: "productName unit gst rate", // only select relevant fields
      })

      // Populate ledger (if linked)
      .populate({
        path: "ledgerIds",
        model: "CustomerLedger",
        select: "amount type date note",
      })

      .populate({
        path: "customer.selectedCustomerId",
        model: "Customer",
        select: "CustomerName mobile area",
      })
      .populate({
        path: "customer.selectedSalesmanId",
        model: "Salesman",
        select: "name email mobile",
      })
      .lean(); // convert to plain JSON for better performance

    res.status(200).json({
      success: true,
      message: "Fetched all invoices with related data successfully",
      total: invoices.length,
      invoices,
    });
  } catch (error) {
    console.error("❌ Error in getInventorySummaryCustomer:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = { getInventorySummaryCustomer };

async function getInventorySummaryVendor(req, res) {
  try {
    // Fetch all purchase invoices with full population of related data
    const purchases = await prchaseInvoice
      .find({})
      .populate({
        path: "vendorId",
        model: "Vendor",
      })
      .populate({
        path: "item.productId",
        model: "Product",
      })
      .populate({
        path: "ledgerIds",
        model: "Ledger",
      });
    console.log("Fetch vendor reports", purchases);

    res.status(200).json({
      message: "Fetched all purchase invoices with related data successfully",
      purchases,
    });
  } catch (error) {
    console.error("Error in getInventorySummaryVendor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getInventorySummaryVendor(req, res) {
  try {
    // Fetch all purchase invoices with full population of related data
    const purchases = await prchaseInvoice
      .find({})
      .populate({
        path: "vendorId",
        model: "Vendor",
      })
      .populate({
        path: "items.productId",
        model: "Product",
      })
      .populate({
        path: "ledgerIds",
        model: "Ledger",
      });
    console.log("Fetch vendor reports", purchases);

    res.status(200).json({
      message: "Fetched all purchase invoices with related data successfully",
      purchases,
    });
  } catch (error) {
    console.error("Error in getInventorySummaryVendor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getInventorySummaryCustomer,
  getInventorySummaryVendor,
};
