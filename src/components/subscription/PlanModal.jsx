// components/subscription/PlanModal.jsx
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const PlanModal = ({ isOpen, onClose, onSubmit, plan = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "30 days",
    features: [""],
    description: "",
    isPopular: false,
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
        features: [...plan.features],
        description: plan.description,
        isPopular: plan.isPopular,
        isActive: plan.isActive,
      });
    } else {
      setFormData({
        name: "",
        price: "",
        duration: "30 days",
        features: [""],
        description: "",
        isPopular: false,
        isActive: true,
      });
    }
    setErrors({});
  }, [plan, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (formData.price && isNaN(formData.price))
      newErrors.price = "Price must be a number";
    if (!formData.duration) newErrors.duration = "Duration is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (formData.features.some((f) => !f))
      newErrors.features = "All features must be filled";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      features: formData.features.filter((f) => f),
      id: plan?.id || Date.now(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Ravindrajangir007",
    };

    onSubmit(submitData);
    onClose();
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, features: newFeatures }));
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="div" className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {plan
                        ? "Edit Subscription Plan"
                        : "Add New Subscription Plan"}
                    </h3>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Plan Name*
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className={`mt-1 block w-full rounded-md border p-2 ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price (₹)*
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              price: e.target.value,
                            }))
                          }
                          className={`mt-1 block w-full rounded-md border p-2 ${
                            errors.price ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.price && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.price}
                          </p>
                        )}
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Duration*
                        <select
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              duration: e.target.value,
                            }))
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 border p-2"
                        >
                          <option value="30 days">30 Days</option>
                          <option value="90 days">90 Days</option>
                          <option value="180 days">180 Days</option>
                          <option value="365 days">365 Days</option>
                        </select>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description*
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        rows="2"
                        className={`mt-1 block w-full rounded-md border p-2 ${
                          errors.description
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.description && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.description}
                        </p>
                      )}
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Features*
                      {formData.features.map((feature, index) => (
                        <div key={index} className="mt-2 flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) =>
                              handleFeatureChange(index, e.target.value)
                            }
                            className={`block w-full rounded-md border p-2 ${
                              errors.features
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addFeature}
                        className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        + Add Feature
                      </button>
                      {errors.features && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.features}
                        </p>
                      )}
                    </label>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isPopular}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isPopular: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Popular Plan
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isActive: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active</span>
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      {plan ? "Update" : "Create"} Plan
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PlanModal;
