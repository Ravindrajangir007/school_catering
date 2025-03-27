import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import OwnerDashboard from "./components/dashboard/OwnerDashboard";
import MenuList from "./components/menu/MenuList";
import MenuForm from "./components/menu/MenuForm";
import { Toaster } from "react-hot-toast";
import SubscriptionList from "./components/subscription/SubscriptionList";
import EventList from "./components/events/EventList";
import ItemManagement from "./components/items/ItemManagement";
import RetailDashboard from "./components/retail/RetailDashboard";
import POSSystem from "./components/retail/POSSystem";
import IntegratedInventory from "./components/inventory/IntegratedInventory";
import IntegratedAnalytics from "./components/analytics/IntegratedAnalytics";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<OwnerDashboard />} />
            <Route path="/menu" element={<MenuList />} />
            <Route path="/menu/new" element={<MenuForm />} />
            <Route path="/subscriptions" element={<SubscriptionList />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/items" element={<ItemManagement />} />
            {/* Add more routes as needed */}
            <Route path="/retail" element={<RetailDashboard />} />
            <Route path="/pos" element={<POSSystem />} />
            <Route path="/inventory" element={<IntegratedInventory />} />
            <Route
              path="/subscriptions"
              element={<EnhancedSubscriptionPlans />}
            />
            <Route path="/offers" element={<OffersManagement />} />
            <Route path="/analytics" element={<IntegratedAnalytics />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
