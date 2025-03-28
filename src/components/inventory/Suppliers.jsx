import { useState } from "react";
import {
  PlusIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const suppliers = [
  {
    id: 1,
    name: "PepsiCo India",
    contactPerson: "Amit Kumar",
    email: "amit.kumar@pepsico.com",
    phone: "+91 98765 43210",
    address: "123, Industrial Area, Phase 1, New Delhi",
    category: ["snacks", "beverages"],
    status: "active",
    lastOrder: "2025-03-20",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Coca-Cola India",
    contactPerson: "Priya Singh",
    email: "priya.singh@coca-cola.com",
    phone: "+91 98765 43211",
    address: "456, Industrial Area, Phase 2, Mumbai",
    category: ["beverages"],
    status: "active",
    lastOrder: "2025-03-15",
    rating: 4.8,
  },
  // Add more suppliers...
];

export default function Suppliers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Suppliers</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage supplier relationships and details
          </p>
        </div>
        <div className="mt-4 flex md:mt-0">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Supplier
          </button>
        </div>
      </div>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {supplier.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {supplier.contactPerson}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <EnvelopeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  {supplier.email}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <PhoneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  {supplier.phone}
                </div>
                <div className="flex items-start text-sm text-gray-500">
                  <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  {supplier.address}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center">
                  <div className="text-sm text-gray-500">Categories:</div>
                  <div className="ml-2 flex flex-wrap gap-2">
                    {supplier.category.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">Last Order:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {supplier.lastOrder}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">Rating:</span>
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {supplier.rating}/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
