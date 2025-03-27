import { useState } from "react";
import {
  ShoppingBagIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const RetailDashboard = () => {
  const [stats] = useState({
    dailySales: {
      amount: 25000,
      count: 156,
      growth: 12.5,
    },
    activeSubscribers: {
      total: 450,
      withRetailPurchases: 280,
    },
    popularItems: [
      { name: "Lays Chips", sales: 89 },
      { name: "Coca Cola", sales: 76 },
      { name: "Dairy Milk", sales: 65 },
    ],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Today's Sales"
          value={`₹${stats.dailySales.amount}`}
          subValue={`${stats.dailySales.count} orders`}
          icon={<CurrencyRupeeIcon className="h-6 w-6" />}
          trend={stats.dailySales.growth}
        />
        {/* Add more stat cards */}
      </div>

      {/* Charts and Reports Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add charts and reports components */}
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, subValue, icon, trend }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-indigo-100 rounded-lg">{icon}</div>
      {trend && (
        <span
          className={`text-sm font-medium ${
            trend >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend >= 0 ? "+" : ""}
          {trend}%
        </span>
      )}
    </div>
    <h3 className="text-lg font-semibold text-gray-900">{value}</h3>
    <p className="text-sm text-gray-500">{title}</p>
    {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
  </div>
);

export default RetailDashboard;
