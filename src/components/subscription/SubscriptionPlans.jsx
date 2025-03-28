// Update imports
import { useState } from "react";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import PlanModal from "./PlanModal";
import ConfirmationModal from "../common/ConfirmationModal";

// Update your SubscriptionPlans component
export default function SubscriptionPlans() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic Plan",
      price: "2000",
      duration: "30 days",
      features: [
        "Daily Lunch",
        "Standard Menu",
        "Regular Portions",
        "Basic Support",
      ],
      description: "Perfect for students looking for regular lunch service.",
      isPopular: false,
      isActive: true,
      subscribers: 245,
      updatedAt: "2025-03-28 07:41:06",
      updatedBy: "Ravindrajangir007",
    },
    {
      id: 2,
      name: "Standard Plan",
      price: "3500",
      duration: "30 days",
      features: [
        "Daily Lunch & Snacks",
        "Premium Menu Options",
        "Extra Portions",
        "Priority Support",
        "Special Diet Options",
      ],
      description: "Ideal for students wanting complete meal coverage.",
      isPopular: true,
      isActive: true,
      subscribers: 245,
      updatedAt: "2025-03-28 07:41:06",
      updatedBy: "Ravindrajangir007",
    },
    {
      id: 3,
      name: "Premium Plan",
      price: "5000",
      duration: "30 days",
      features: [
        "All Meals Included",
        "Custom Menu Options",
        "Unlimited Portions",
        "24/7 Support",
        "Special Diet Options",
        "Weekend Coverage",
      ],
      description: "Complete coverage with premium benefits and flexibility.",
      isPopular: false,
      isActive: true,
      subscribers: 245,
      updatedAt: "2025-03-28 07:41:06",
      updatedBy: "Ravindrajangir007",
    },
  ]);

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    plan: null,
  });

  const handleAddPlan = (planData) => {
    setPlans((prev) => [...prev, { ...planData, subscribers: 0 }]);
    toast.success("Plan created successfully");
  };

  const handleEditPlan = (planData) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === planData.id ? { ...planData, subscribers: p.subscribers } : p
      )
    );
    toast.success("Plan updated successfully");
  };

  const handleDeletePlan = (planId) => {
    // Check if plan has subscribers
    const plan = plans.find((p) => p.id === planId);
    if (plan.subscribers > 0) {
      toast.error("Cannot delete plan with active subscribers");
      return;
    }

    setPlans((prev) => prev.filter((p) => p.id !== planId));
    toast.success("Plan deleted successfully");
  };

  const handleToggleActive = (planId) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, isActive: !p.isActive } : p))
    );
    toast.success("Plan status updated successfully");
  };

  return (
    <div className="">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Subscription Plans
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage catering subscription plans and pricing
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
            onClick={() => setIsPlanModalOpen(true)}
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add New Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-lg border ${
              plan.isPopular ? "border-indigo-600" : "border-gray-200"
            } bg-white p-6 shadow-sm ${!plan.isActive ? "opacity-60" : ""}`}
          >
            {/* Popular badge remains the same */}

            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
            </div>

            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold tracking-tight text-gray-900">
                ₹{plan.price}
              </span>
              <span className="ml-1 text-sm font-medium text-gray-500">
                /{plan.duration}
              </span>
            </div>

            <ul role="list" className="mt-6 space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex gap-x-3">
                  <CheckIcon
                    className="h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <div className="text-sm text-gray-500">
                Current Subscribers: {plan.subscribers}
              </div>
            </div>

            {/* Add Active/Inactive badge */}
            <div className="absolute top-4 right-4">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  plan.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {plan.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Rest of the plan card content remains the same */}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => handleToggleActive(plan.id)}
                className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset cursor-pointer ${
                  plan.isActive
                    ? "bg-yellow-50 text-yellow-700 ring-yellow-600/10 hover:bg-yellow-100"
                    : "bg-green-50 text-green-700 ring-green-600/10 hover:bg-green-100"
                }`}
              >
                {plan.isActive ? "Deactivate" : "Activate"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingPlan(plan);
                  setIsPlanModalOpen(true);
                }}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                <PencilIcon className="h-4 w-4 " />
              </button>
              <button
                type="button"
                onClick={() =>
                  setDeleteConfirmation({
                    isOpen: true,
                    plan: plan,
                  })
                }
                className="inline-flex items-center rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-600/10 hover:bg-red-100 cursor-pointer"
              >
                <TrashIcon className="h-4 w-4 " />
              </button>
            </div>
          </div>
        ))}
      </div>

      <PlanModal
        isOpen={isPlanModalOpen}
        onClose={() => {
          setIsPlanModalOpen(false);
          setEditingPlan(null);
        }}
        onSubmit={editingPlan ? handleEditPlan : handleAddPlan}
        plan={editingPlan}
      />

      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, plan: null })}
        onConfirm={() => {
          if (deleteConfirmation.plan) {
            handleDeletePlan(deleteConfirmation.plan.id);
            setDeleteConfirmation({ isOpen: false, plan: null });
          }
        }}
        title="Delete Subscription Plan"
        message={`Are you sure you want to delete "${deleteConfirmation.plan?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
