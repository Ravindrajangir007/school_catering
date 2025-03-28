import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPassword from "./components/auth/ForgotPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/common/Layout";
import MenuPlanning from "./components/catering/MenuPlanning";

import MealSchedule from "./components/catering/MealSchedule";
import ProductCatalog from "./components/retail/ProductCatalog";
import OrderHistory from "./components/retail/OrderHistory";
import POSSystem from "./components/retail/POSSystem";
import StockManagement from "./components/inventory/StockManagement";
import Suppliers from "./components/inventory/Suppliers";
import PurchaseOrders from "./components/inventory/PurchaseOrders";
import InventoryReport from "./components/reports/InventoryReport";
import SalesReport from "./components/reports/SalesReport";
import SubscriptionReport from "./components/reports/SubscriptionReport";
import SubscriptionPlans from "./components/subscription/SubscriptionPlans";

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Catering Routes */}
      <Route
        path="/catering/menu"
        element={
          <ProtectedRoute>
            <Layout>
              <MenuPlanning />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscriptions/plan"
        element={
          <ProtectedRoute>
            <Layout>
              <SubscriptionPlans />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/catering/schedule"
        element={
          <ProtectedRoute>
            <Layout>
              <MealSchedule />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Retail Routes */}
      <Route
        path="/retail/products"
        element={
          <ProtectedRoute>
            <Layout>
              <ProductCatalog />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/retail/orders"
        element={
          <ProtectedRoute>
            <Layout>
              <OrderHistory />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/retail/pos"
        element={
          <ProtectedRoute>
            <Layout>
              <POSSystem />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Inventory Routes */}
      <Route
        path="/inventory/stock"
        element={
          <ProtectedRoute>
            <Layout>
              <StockManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory/suppliers"
        element={
          <ProtectedRoute>
            <Layout>
              <Suppliers />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory/purchase-orders"
        element={
          <ProtectedRoute>
            <Layout>
              <PurchaseOrders />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Report Routes */}
      <Route
        path="/reports/inventory"
        element={
          <ProtectedRoute>
            <Layout>
              <InventoryReport />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports/sales"
        element={
          <ProtectedRoute>
            <Layout>
              <SalesReport />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports/subscriptions"
        element={
          <ProtectedRoute>
            <Layout>
              <SubscriptionReport />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
