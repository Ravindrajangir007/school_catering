const SubscriptionPlan = {
  id: 1,
  name: "Premium Plan",
  duration: 90, // days
  price: 12000,
  mealBenefits: {
    breakfast: true,
    lunch: true,
    dinner: false,
  },
  retailBenefits: {
    discount: 10, // percentage
    maxDiscount: 1000, // per month
    excludedCategories: ["stationery"],
  },
};
