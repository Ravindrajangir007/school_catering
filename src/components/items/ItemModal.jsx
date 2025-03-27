import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline";

const ItemModal = ({ isOpen, onClose, onSubmit, categories, item = null }) => {
  const [imagePreview, setImagePreview] = useState(item?.image || "");
  const [isAvailable, setIsAvailable] = useState(item?.isAvailable ?? true);
  const [selectedCategory, setSelectedCategory] = useState(
    item?.categoryId || ""
  );

  useEffect(() => {
    if (item) {
      setImagePreview(item.image);
      setIsAvailable(item.isAvailable);
      setSelectedCategory(item.categoryId);
    } else {
      setImagePreview("");
      setIsAvailable(true);
      setSelectedCategory("");
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      categoryId: parseInt(formData.get("categoryId")),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      outletPrice: parseFloat(formData.get("outletPrice")),
      type: formData.get("type"),
      stock: parseInt(formData.get("stock")),
      minStock: parseInt(formData.get("minStock")),
      unit: formData.get("unit"),
      isAvailable,
      image:
        imagePreview ||
        `https://source.unsplash.com/random/400x300/?${formData
          .get("name")
          .toLowerCase()}`,
    };

    // Add preparation time for prepared items
    if (data.type === "prepared") {
      data.preparationTime = parseInt(formData.get("preparationTime"));
    }

    onSubmit(data);
  };

  const selectedCategoryType = categories.find(
    (c) => c.id === selectedCategory
  )?.type;

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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  {item ? "Edit Item" : "Add New Item"}
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Item Name
                          <input
                            type="text"
                            name="name"
                            defaultValue={item?.name}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Category
                          <select
                            name="categoryId"
                            value={selectedCategory}
                            onChange={(e) =>
                              setSelectedCategory(parseInt(e.target.value))
                            }
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                          >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.icon} {category.name}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Type
                          <select
                            name="type"
                            defaultValue={item?.type || "packaged"}
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                          >
                            <option value="packaged">Packaged</option>
                            <option value="prepared">Prepared</option>
                          </select>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                          <textarea
                            name="description"
                            defaultValue={item?.description}
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Cost Price (₹)
                            <input
                              type="number"
                              name="price"
                              defaultValue={item?.price}
                              required
                              min="0"
                              step="0.01"
                              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            />
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Outlet Price (₹)
                            <input
                              type="number"
                              name="outletPrice"
                              defaultValue={item?.outletPrice}
                              required
                              min="0"
                              step="0.01"
                              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Current Stock
                            <input
                              type="number"
                              name="stock"
                              defaultValue={item?.stock}
                              required
                              min="0"
                              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            />
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Min Stock Level
                            <input
                              type="number"
                              name="minStock"
                              defaultValue={item?.minStock}
                              required
                              min="0"
                              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Unit
                          <input
                            type="text"
                            name="unit"
                            defaultValue={item?.unit || "pieces"}
                            required
                            placeholder="e.g., pieces, bottles, packets"
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                          />
                        </label>
                      </div>

                      {selectedCategoryType === "prepared" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Preparation Time (minutes)
                            <input
                              type="number"
                              name="preparationTime"
                              defaultValue={item?.preparationTime || 15}
                              required
                              min="1"
                              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            />
                          </label>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Image URL
                          <input
                            type="url"
                            name="image"
                            value={imagePreview}
                            onChange={(e) => setImagePreview(e.target.value)}
                            placeholder="Enter image URL"
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                          />
                        </label>
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-2 h-32 w-full object-cover rounded-md"
                          />
                        ) : (
                          <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                              <p className="text-xs text-gray-500">
                                Enter URL to preview image
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Availability Toggle */}
                  <div className="mt-6">
                    <Switch.Group>
                      <div className="flex items-center">
                        <Switch
                          checked={isAvailable}
                          onChange={setIsAvailable}
                          className={`${
                            isAvailable ? "bg-indigo-600" : "bg-gray-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              isAvailable ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                        <Switch.Label className="ml-4 text-sm text-gray-700">
                          Available for Sale
                        </Switch.Label>
                      </div>
                    </Switch.Group>
                  </div>

                  {/* Form Actions */}
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
                      {item ? "Update" : "Create"} Item
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

export default ItemModal;
