import { useState } from "react";
import {
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import EventModal from "./EventModal";
import OrderModal from "./OrderModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import eventCategories from "./EventCategories";
import { toast } from "react-hot-toast";

const EventList = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Day Function",
      categoryId: 1,
      date: "2025-04-15",
      time: "09:00",
      duration: 4,
      expectedGuests: 500,
      description: "Annual day celebration with cultural performances",
      venue: "School Auditorium",
      requirements: "Full catering service with breakfast and lunch",
      budget: 25000,
      status: "upcoming",
      createdAt: "2025-03-26 07:40:53",
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      eventId: 1,
      items: [
        { name: "Breakfast Package", quantity: 500, price: 100 },
        { name: "Lunch Package", quantity: 500, price: 150 },
      ],
      totalAmount: 125000,
      status: "pending",
      createdBy: "Ravindrajangir007",
      createdAt: "2025-03-26 11:22:33",
    },
  ]);

  const [activeTab, setActiveTab] = useState("events"); // 'events' or 'orders'
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleAddEvent = (formData) => {
    const newEvent = {
      id: Date.now(),
      ...formData,
      status: "upcoming",
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
    };
    setEvents([...events, newEvent]);
    setIsEventModalOpen(false);
    toast.success("Event added successfully!");
  };

  const handleAddOrder = (formData) => {
    const newOrder = {
      id: Date.now(),
      ...formData,
      status: "pending",
      createdBy: "Ravindrajangir007",
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
    };
    setOrders([...orders, newOrder]);
    setIsOrderModalOpen(false);
    toast.success("Order placed successfully!");
  };

  const getStatusColor = (status) => {
    const colors = {
      upcoming: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-600">Manage events and catering orders</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsEventModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Event
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("events")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "events"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "orders"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Orders
          </button>
        </nav>
      </div>

      {/* Events List */}
      {activeTab === "events" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {
                        eventCategories.find((c) => c.id === event.categoryId)
                          ?.name
                      }
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      event.status
                    )}`}
                  >
                    {event.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    <span>
                      {event.time} ({event.duration} hours)
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <UserGroupIcon className="h-5 w-5 mr-2" />
                    <span>{event.expectedGuests} guests</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Budget: ₹{event.budget}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsOrderModalOpen(true);
                      }}
                      className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      <ShoppingCartIcon className="h-4 w-4 mr-1" />
                      Add Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Orders List */}
      {activeTab === "orders" && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {orders.map((order) => {
              const event = events.find((e) => e.id === order.eventId);
              return (
                <li key={order.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-indigo-600 truncate">
                          {event?.title}
                        </p>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Created by {order.createdBy} on {order.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Item
                          </th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                            Qty
                          </th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                            Price
                          </th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {order.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-3 py-2 text-sm text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-900 text-right">
                              {item.quantity}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-900 text-right">
                              ₹{item.price}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-900 text-right">
                              ₹{item.quantity * item.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td
                            colSpan="3"
                            className="px-3 py-2 text-sm font-medium text-gray-900 text-right"
                          >
                            Total Amount:
                          </td>
                          <td className="px-3 py-2 text-sm font-medium text-gray-900 text-right">
                            ₹{order.totalAmount}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Modals */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={handleAddEvent}
        categories={eventCategories}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSubmit={handleAddOrder}
        event={selectedEvent}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          // Handle deletion
          setIsDeleteModalOpen(false);
          toast.success("Item deleted successfully!");
        }}
        title="Delete Confirmation"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </div>
  );
};

export default EventList;
