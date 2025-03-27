export const userTypes = {
  ADMIN: "admin",
  STAFF: "staff",
  STUDENT: "student",
  PARENT: "parent",
  KITCHEN_STAFF: "kitchen_staff",
  RETAIL_STAFF: "retail_staff",
};

export const userPermissions = {
  [userTypes.ADMIN]: [
    "manage_users",
    "manage_subscriptions",
    "manage_inventory",
    "manage_retail",
    "view_reports",
    "manage_offers",
  ],
  [userTypes.RETAIL_STAFF]: [
    "process_retail_orders",
    "view_inventory",
    "update_stock",
    "view_offers",
  ],
  [userTypes.KITCHEN_STAFF]: [
    "view_menu",
    "update_menu_status",
    "view_inventory",
    "update_stock",
  ],
};
