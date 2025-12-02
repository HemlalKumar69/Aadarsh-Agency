import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../Layout/Layout";
import DashboardCards from "../Components/Dashbord/DashboardCards";
import CompanyDetail from "../Components/Productss/Company/CompanyDetail";
import CategoryDetail from "../Components/Productss/ProductCategory/CategoryDetail";
import SubCatDetail from "../Components/Productss/ProductSubCategory/SubCatDetail";
import Product from "../Components/Productss/CreateProduct/ProductTabs";
import AddSalesMan from "../Components/SalesMan/salesMan-Tabs/SalesmanTabs";
import DisplaySalesMan from "../Components/SalesMan/salesMan-Tabs/DisplaySalesMan";
import BillingReport from "../Components/Invoice/BillingReport";
import DisplayInvoice from "../Components/Invoice/DisplayInvoice";
import GenerateInvoice from "../Components/Invoice/GenerateInvoice";
import VendorReport from "../Components/SalesMan/vendorReport/vendorTabs";
import PurchaseForm from "../Components/SalesMan/PurchaseForm";
import CustomerDetail from "../Components/Customer/CustomerDetail";
import FirmDetail from "../Components/Firm/FirmDetail";
import PaymentVoucherForm from "../Components/payment/PaymentVoucherForm";
import Ledger from "../pages/customer-reciept/Ledger";
import CustomerForm from "../pages/customer-reciept/CustomerForm";
import VendorLedger from "../Components/payment/vendorLedger";
import Outstanding from "../pages/Outstanding";
import PurchaseTabs from "../pages/PurchaseTabs";
import SalesManWindow from "../Components/SalesmanWindow/SalesManWindow";
import ModifyBill from "../Components/ModifyBill";
import SalesReport from "../Components/Reports/report";
import Login from "../auth/Login";

import StockSaleAnalysis from "../Components/StockAndSales/StockSaleAnalysis";
import StockStatus from "../components/stockStatus/stockstatus";
import TodayGrossProfit from "../Components/TodayGrossProfit/TodayGrossProfit";

import DispatchSummary from "../Components/dispatchsummary/DispatchSummary";



// ✅ ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes inside Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardCards />} />
        <Route path="/add-company" element={<FirmDetail />} />
        <Route path="/brand" element={<CompanyDetail />} />
        <Route path="/pro-categories" element={<CategoryDetail />} />
        <Route path="/pro-SubCat" element={<SubCatDetail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/add-salesman" element={<AddSalesMan />} />
        <Route path="/add-salesman/:id" element={<AddSalesMan />} />
        <Route path="/display-salesman" element={<DisplaySalesMan />} />
        <Route path="/add-invoice" element={<BillingReport />} />
        <Route path="/edit-invoice/:id" element={<BillingReport />} />
        <Route path="/generate-invoice" element={<GenerateInvoice />} />
        <Route path="/display-invoice" element={<DisplayInvoice />} />
        <Route path="/generate-invoice/:id" element={<GenerateInvoice />} />
        <Route path="/Vendor-report" element={<VendorReport />} />
        <Route path="/purchase" element={<PurchaseTabs />} />
        <Route path="/add-customer" element={<CustomerDetail />} />
        <Route path="/test" element={<PaymentVoucherForm />} />
        <Route path="/report" element={<CustomerForm />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/vendor-ledger" element={<VendorLedger />} />
        <Route path="/outstanding" element={<Outstanding />} />
        <Route path="/purchase/:id" element={<PurchaseTabs />} />
        <Route path="/add-invoice/:id" element={<BillingReport />} />
        <Route path="/salesmanwindow" element={<SalesManWindow />} />
        <Route path="/modifyBill" element={<ModifyBill />} />
        <Route path="/reports" element={<SalesReport />} />
        <Route path="/stock-sale-analysis" element={<StockSaleAnalysis />} />
        <Route path="/stock-status" element={<StockStatus />} />
        <Route path="/today-gross-profit" element={<TodayGrossProfit />} />
        <Route path="/dispatch-summary" element={<DispatchSummary  />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
