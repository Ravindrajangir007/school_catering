import { useState } from 'react';

const MenuForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Main Course',
    description: '',
    nutritionInfo: {
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
    },
    allergens: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Item Name
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option>Main Course</option>
            <option>Side Dish</option>
            <option>Dessert</option>
            <option>Beverage</option>
          </select>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows="3"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Calories
            <input
              type="number"
              value={formData.nutritionInfo.calories}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nutritionInfo: { ...formData.nutritionInfo, calories: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Protein (g)
            <input
              type="number"
              value={formData.nutritionInfo.protein}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nutritionInfo: { ...formData.nutritionInfo, protein: e.target.value },
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Save Menu Item
        </button>
      </div>
    </form>
  );
};

export default MenuForm;