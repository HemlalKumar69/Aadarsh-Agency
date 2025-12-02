require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// ---------- ROUTES ----------
const protectedRoutes = require("./middleware/auth.middleware");
const CompanyRoute = require("./Routes/CompanyRoute");
const CategoryRoute = require("./Routes/CategoryRoute");
const SubCategoryRoute = require("./Routes/SubCategoryRoute");
const ProductRoute = require("./Routes/ProductRoute");
const SalesManRoute = require("./Routes/SalesManRoute");
const BillingRoute = require("./Routes/ProductBillingRoute");
const VendorRoute = require("./Routes/VendorRoute");
const PurchaseRoute = require("./Routes/PurchaseRoute");
const customerRoutes = require("./Routes/CustomerRoute");
const auth = require("./Routes/auth.controller");
const CheckAuth = require("./Routes/CheckAuth");
const fetchShopName = require("./Routes/getShopName");
const addProductData = require("./Routes/addSalesmanProductData");
const Logout = require("./Routes/logoutSalesman.js");
const authAdmin = require("./Routes/auth.routes.js");
const total = require("./Routes/total.routes.js");
const reportsRoutes = require("./Routes/reports.routes");

const ledgerRoutes = require("./Routes/ledger.routes.js");


// ---------- MIDDLEWARE ----------
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      process.env.CORS_LOCAL,
      process.env.CORS_LOCAL_2,
      process.env.CORS_ORIGIN,
      process.env.CORS_ORIGIN_2,
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------- DATABASE ----------
mongoose
  .connect(process.env.dbUrl)
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// ---------- ROUTES ----------
app.use("/api/company", CompanyRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/customer", customerRoutes);
app.use("/api/product", ProductRoute);
app.use("/api/Subcategory", SubCategoryRoute);
app.use("/api/salesman", SalesManRoute);
app.use("/api/pro-billing", BillingRoute);
app.use("/api/vendor", VendorRoute);
app.use("/api/purchase", PurchaseRoute);
app.use("/api/login", auth);
app.use("/api/checksalesman", CheckAuth);
app.use("/api/fetchshopname", fetchShopName);
app.use("/api/addsalesmanproductdata", protectedRoutes, addProductData);
app.use("/api/logout", Logout);
app.use("/api/total", total);
app.use("/api/auth", authAdmin);
app.use("/api/reports", reportsRoutes);

app.use("/api/ledger", ledgerRoutes);


// ---------- 404 HANDLER ----------
app.use((req, res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

// ---------- GLOBAL ERROR HANDLER ----------
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// ---------- START SERVER ----------
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
