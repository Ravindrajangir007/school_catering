import { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import SubscriptionModal from "./SubscriptionModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { toast } from "react-hot-toast";

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "Basic Plan",
      duration: "monthly",
      durationInDays: "30 Days",
      price: 2000,

      features: [
        "Basic meal options",
        "Weekly menu updates",
        "Email support",
        "Basic reporting",
      ],
      description: "Perfect for small schools starting with catering services",
      isActive: true,
      createdAt: "2025-03-26 07:40:53",
      updatedAt: "2025-03-26 07:40:53",
    },
    // Add more sample plans...
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPlan = {
      id: Date.now(),
      name: formData.get("name"),
      duration: formData.get("duration"),
      price: parseFloat(formData.get("price")),

      features: formData
        .get("features")
        .split("\n")
        .filter((f) => f.trim()),
      description: formData.get("description"),
      isActive: formData.get("isActive") === "on",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSubscriptions([...subscriptions, newPlan]);
    setIsAddModalOpen(false);
    toast.success("Subscription plan added successfully!");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedPlan = {
      ...selectedPlan,
      name: formData.get("name"),
      duration: formData.get("duration"),
      price: parseFloat(formData.get("price")),

      features: formData
        .get("features")
        .split("\n")
        .filter((f) => f.trim()),
      description: formData.get("description"),
      isActive: formData.get("isActive") === "on",
      updatedAt: new Date().toISOString(),
    };

    setSubscriptions(
      subscriptions.map((plan) =>
        plan.id === selectedPlan.id ? updatedPlan : plan
      )
    );
    setIsEditModalOpen(false);
    toast.success("Subscription plan updated successfully!");
  };

  const handleDelete = () => {
    setSubscriptions(
      subscriptions.filter((plan) => plan.id !== selectedPlan.id)
    );
    setIsDeleteModalOpen(false);
    toast.success("Subscription plan deleted successfully!");
  };

  const getDurationLabel = (duration) => {
    const labels = {
      monthly: "Monthly",
      quarterly: "Quarterly",
      half_yearly: "Half Yearly",
      yearly: "Yearly",
    };
    return labels[duration] || duration;
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions.map((plan) => (
          <div
            key={plan.id}
            className={`bg-gray-100 rounded-lg  overflow-hidden hover:shadow-lg transition-shadow duration-300 border-t-4 ${
              plan.isActive ? "border-green-500" : "border-gray-300"
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {getDurationLabel(plan.duration)} ({plan.durationInDays})
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setIsEditModalOpen(true);
                    }}
                    className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{plan.price}
                </span>
                <span className="text-gray-500">/{plan.duration}</span>
              </div>

              <ul className="mb-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-500">Status:</span>
                  <span
                    className={`flex items-center ${
                      plan.isActive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {plan.isActive ? (
                      <>
                        <CheckCircleIcon className="h-5 w-5 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-5 w-5 mr-1" />
                        Inactive
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <SubscriptionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Subscription Plan"
        onSubmit={handleAdd}
      />

      <SubscriptionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Subscription Plan"
        subscription={selectedPlan}
        onSubmit={handleEdit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Subscription Plan"
        message={`Are you sure you want to delete the "${selectedPlan?.name}" plan? This action cannot be undone.`}
      />
    </div>
  );
};

export default SubscriptionList;
