import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import MenuModal from "./MenuModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { toast } from "react-hot-toast";

const MenuList = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      day: "Monday",
      mealType: "Breakfast",
      mainCourse: "Poha",
      sideDishes: "Boiled Eggs, Mixed Fruits",
      dessert: "Banana Shake",
      notes: "Egg-free option available",
    },
    {
      id: 2,
      day: "Monday",
      mealType: "Lunch",
      mainCourse: "Rice, Roti, Dal",
      sideDishes: "Mixed Vegetables, Salad",
      dessert: "Sweet",
      notes: "All vegetables are organic",
    },
    // Add more items as needed
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAdd = (data) => {
    // Create a menu item for each selected day
    const newItems = data.days.map((day) => ({
      id: Date.now() + Math.random(), // Ensure unique IDs
      day,
      mealType: data.mealType,
      mainCourse: data.mainCourse,
      sideDishes: data.sideDishes,
      dessert: data.dessert,
      notes: data.notes,
    }));

    setMenuItems([...menuItems, ...newItems]);
    setIsAddModalOpen(false);
    toast.success(`Menu items added for ${data.days.length} days!`);
  };

  const handleEdit = (data) => {
    // If editing, update all instances of this menu item across selected days
    const updatedItems = menuItems.filter(
      (item) => item.id !== selectedItem.id
    );

    const newItems = data.days.map((day) => ({
      id: Date.now() + Math.random(),
      day,
      mealType: data.mealType,
      mainCourse: data.mainCourse,
      sideDishes: data.sideDishes,
      dessert: data.dessert,
      notes: data.notes,
    }));

    setMenuItems([...updatedItems, ...newItems]);
    setIsEditModalOpen(false);
    toast.success(`Menu items updated for ${data.days.length} days!`);
  };
  const handleDelete = () => {
    setMenuItems(menuItems.filter((item) => item.id !== selectedItem.id));
    setIsDeleteModalOpen(false);
    toast.success("Menu item deleted successfully!");
  };

  const filteredMenuItems = menuItems.filter(
    (item) => item.day === selectedDay
  );

  return (
    <div className="">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Menu Item
          </button>
        </div>

        {/* Day Selection Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    selectedDay === day
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                {day}
              </button>
            ))}
          </nav>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.map((item) => (
            <div
              key={item.id}
              className="rounded-lg bg-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.mealType}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setIsEditModalOpen(true);
                      }}
                      className="p-1.5 text-gray-600  bg-indigo-100 rounded-full cursor-pointer"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-1.5 text-red-600 bg-red-100 rounded-full cursor-pointer"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Main Course
                    </h4>
                    <p className="text-gray-900">{item.mainCourse}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Side Dishes
                    </h4>
                    <p className="text-gray-900">{item.sideDishes}</p>
                  </div>

                  {item.dessert && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Dessert/Beverages
                      </h4>
                      <p className="text-gray-900">{item.dessert}</p>
                    </div>
                  )}

                  {item.notes && (
                    <div className="pt-2">
                      <p className="text-sm text-gray-500 italic">
                        {item.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <MenuModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Menu Item"
        onSubmit={handleAdd}
      />

      <MenuModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Menu Item"
        menuItem={selectedItem}
        onSubmit={handleEdit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={`${selectedItem?.mealType} - ${selectedItem?.mainCourse}`}
      />
    </div>
  );
};

export default MenuList;
