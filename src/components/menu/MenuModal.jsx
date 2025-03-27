import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

const MenuModal = ({ isOpen, onClose, title, menuItem, onSubmit }) => {
  const [selectedDays, setSelectedDays] = useState(menuItem?.days || []);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const mealTypes = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  const handleDayToggle = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Add selected days to form data
    const data = {
      days: selectedDays,
      mealType: formData.get("mealType"),
      mainCourse: formData.get("mainCourse"),
      sideDishes: formData.get("sideDishes"),
      dessert: formData.get("dessert"),
      notes: formData.get("notes"),
    };

    onSubmit(data);
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
          <div className="fixed inset-0 bg-black/25" />
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  {title}
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  {/* Days Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Days
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                      {days.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleDayToggle(day)}
                          className={`inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium
                            ${
                              selectedDays.includes(day)
                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            } transition-colors duration-200`}
                        >
                          <span className="mr-2">{day.slice(0, 3)}</span>
                          {selectedDays.includes(day) && (
                            <CheckIcon className="h-4 w-4" />
                          )}
                        </button>
                      ))}
                    </div>
                    {selectedDays.length === 0 && (
                      <p className="mt-1 text-sm text-red-500">
                        Please select at least one day
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Meal Type
                      <select
                        name="mealType"
                        defaultValue={menuItem?.mealType || ""}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                      >
                        <option value="">Select Meal Type</option>
                        {mealTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Main Course
                      <input
                        type="text"
                        name="mainCourse"
                        defaultValue={menuItem?.mainCourse}
                        required
                        placeholder="e.g., Rice, Roti, Dal"
                        className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Side Dishes
                      <input
                        type="text"
                        name="sideDishes"
                        defaultValue={menuItem?.sideDishes}
                        required
                        placeholder="e.g., Mixed Vegetables, Salad"
                        className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Dessert/Beverages
                      <input
                        type="text"
                        name="dessert"
                        defaultValue={menuItem?.dessert}
                        placeholder="e.g., Fruit, Sweet, Juice"
                        className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Special Notes
                      <textarea
                        name="notes"
                        defaultValue={menuItem?.notes}
                        rows="2"
                        placeholder="Any special notes or allergen information"
                        className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                      />
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
                      disabled={selectedDays.length === 0}
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save
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

export default MenuModal;
