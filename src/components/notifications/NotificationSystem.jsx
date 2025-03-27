const NotificationTypes = {
  OFFER: "offer",
  INVENTORY: "inventory",
  ORDER: "order",
  SUBSCRIPTION: "subscription",
};

const NotificationPriorities = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

class NotificationManager {
  static async sendNotification(
    type,
    message,
    users,
    priority = NotificationPriorities.MEDIUM
  ) {
    // Implementation
  }

  static async sendStockAlert(item) {
    if (item.stock <= item.minStock) {
      await this.sendNotification(
        NotificationTypes.INVENTORY,
        `Low stock alert: ${item.name} (${item.stock} ${item.unit} remaining)`,
        ["admin", "retail_staff"],
        NotificationPriorities.HIGH
      );
    }
  }

  static async sendOfferNotification(offer) {
    await this.sendNotification(
      NotificationTypes.OFFER,
      `New Offer: ${offer.title}`,
      offer.userTypes,
      NotificationPriorities.MEDIUM
    );
  }
}

// Component implementation...
