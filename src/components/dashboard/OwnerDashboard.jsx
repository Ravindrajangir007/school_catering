import { useState } from 'react';

const OwnerDashboard = () => {
  const [stats] = useState({
    activeSubscriptions: 245,
    pendingOrders: 12,
    todayEvents: 3,
    monthlyRevenue: 45000
  });

  const [recentOrders] = useState([
    { id: 1, school: 'ABC School', event: 'Annual Function', date: '2025-04-01', status: 'Pending' },
    { id: 2, school: 'XYZ School', event: 'Sports Day', date: '2025-04-03', status: 'Confirmed' },
  ]);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions}
          icon="UsersIcon"
          trend="+5%"
        />
        <StatsCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon="ShoppingCartIcon"
          trend="+2"
        />
        <StatsCard
          title="Today's Events"
          value={stats.todayEvents}
          icon="CalendarIcon"
          trend="0"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`₹${stats.monthlyRevenue}`}
          icon="CurrencyRupeeIcon"
          trend="+12%"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  School
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.school}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.event}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'Confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button className="text-indigo-600 hover:text-indigo-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow px-5 py-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-500">{title}</div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">{value}</div>
        </div>
        <div className={`text-sm ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;