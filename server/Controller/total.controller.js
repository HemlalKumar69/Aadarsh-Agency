const Customer = require("../Models/CustomerModel");
const Vendor = require("../Models/VendorModel");
const Purchase = require("../Models/PurchaseModel");
const Invoice = require("../Models/BillingModel");

// 📅 Helper — get start and end of today
const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

// 📅 Helper — get start and end of a month (0 = Jan, 11 = Dec)
const getMonthRange = (year, month) => {
  const start = new Date(year, month, 1, 0, 0, 0, 0);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
  return { start, end };
};

// 🧮 Main Controller
const getDashboardReport = async (req, res) => {
  try {
    // ----------------- Basic Counts -----------------
    const totalCustomers = await Customer.countDocuments();
    const totalVendors = await Vendor.countDocuments();
    const totalPurchaseInvoices = await Purchase.countDocuments();
    const totalSalesInvoices = await Invoice.countDocuments();

    // ----------------- Total Amounts -----------------
    const totalPurchaseAgg = await Purchase.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$finalAmount" } } },
    ]);
    const totalSalesAgg = await Invoice.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$finalAmount" } } },
    ]);

    const totalPurchaseAmount = totalPurchaseAgg[0]?.totalAmount || 0;
    const totalSalesAmount = totalSalesAgg[0]?.totalAmount || 0;

    // ----------------- Today's Range -----------------
    const { start: todayStart, end: todayEnd } = getTodayRange();

    const todayPurchaseAgg = await Purchase.aggregate([
      { $match: { date: { $gte: todayStart, $lte: todayEnd } } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalAmount: { $sum: "$finalAmount" },
        },
      },
    ]);

    const todaySalesAgg = await Invoice.aggregate([
      { $match: { billDate: { $gte: todayStart, $lte: todayEnd } } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalAmount: { $sum: "$finalAmount" },
        },
      },
    ]);

    // ----------------- This Month & Last Month Ranges -----------------
    const now = new Date();
    const { start: thisMonthStart, end: thisMonthEnd } = getMonthRange(
      now.getFullYear(),
      now.getMonth()
    );
    const { start: lastMonthStart, end: lastMonthEnd } = getMonthRange(
      now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear(),
      now.getMonth() === 0 ? 11 : now.getMonth() - 1
    );

    // 🔹 This Month Purchase & Sales
    const thisMonthPurchase = await Purchase.aggregate([
      { $match: { date: { $gte: thisMonthStart, $lte: thisMonthEnd } } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalAmount: { $sum: "$finalAmount" },
        },
      },
    ]);

    const thisMonthSales = await Invoice.aggregate([
      { $match: { billDate: { $gte: thisMonthStart, $lte: thisMonthEnd } } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalAmount: { $sum: "$finalAmount" },
        },
      },
    ]);

    // 🔹 Last Month Purchase & Sales
    const lastMonthPurchase = await Purchase.aggregate([
      { $match: { date: { $gte: lastMonthStart, $lte: lastMonthEnd } } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalAmount: { $sum: "$finalAmount" },
        },
      },
    ]);

    const lastMonthSales = await Invoice.aggregate([
      { $match: { billDate: { $gte: lastMonthStart, $lte: lastMonthEnd } } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalAmount: { $sum: "$finalAmount" },
        },
      },
    ]);

    // ----------------- Build Final Response -----------------
    res.status(200).json({
      success: true,
      totals: {
        customers: totalCustomers,
        vendors: totalVendors,
        purchaseInvoices: totalPurchaseInvoices,
        salesInvoices: totalSalesInvoices,
        purchaseAmount: totalPurchaseAmount,
        salesAmount: totalSalesAmount,
      },
      today: {
        sales: {
          count: todaySalesAgg[0]?.count || 0,
          totalAmount: todaySalesAgg[0]?.totalAmount || 0,
        },
        purchase: {
          count: todayPurchaseAgg[0]?.count || 0,
          totalAmount: todayPurchaseAgg[0]?.totalAmount || 0,
        },
      },
      thisMonth: {
        sales: {
          count: thisMonthSales[0]?.count || 0,
          totalAmount: thisMonthSales[0]?.totalAmount || 0,
        },
        purchase: {
          count: thisMonthPurchase[0]?.count || 0,
          totalAmount: thisMonthPurchase[0]?.totalAmount || 0,
        },
      },
      lastMonth: {
        sales: {
          count: lastMonthSales[0]?.count || 0,
          totalAmount: lastMonthSales[0]?.totalAmount || 0,
        },
        purchase: {
          count: lastMonthPurchase[0]?.count || 0,
          totalAmount: lastMonthPurchase[0]?.totalAmount || 0,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard report:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

module.exports = { getDashboardReport };
