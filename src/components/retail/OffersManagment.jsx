const OfferTypes = {
  PERCENTAGE: "percentage",
  FIXED: "fixed",
  BUYXGETY: "buyxgety",
};

const SampleOffer = {
  id: 1,
  title: "Weekend Special",
  type: OfferTypes.PERCENTAGE,
  value: 15,
  minPurchase: 200,
  validFrom: "2025-03-27",
  validTo: "2025-03-31",
  applicableItems: ["snacks", "beverages"],
  userTypes: ["student", "staff"],
  maxDiscount: 100,
};

// Component implementation...
