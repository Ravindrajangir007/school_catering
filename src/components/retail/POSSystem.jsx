import { useState } from "react";
import { toast } from "react-hot-toast";

const POSSystem = () => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleAddToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const handleCheckout = async () => {
    try {
      // Process payment and generate receipt
      toast.success("Order processed successfully!");
    } catch (error) {
      toast.error("Failed to process order");
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-screen">
      {/* Product Catalog */}
      <div className="col-span-8 bg-white p-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Product cards */}
        </div>
      </div>

      {/* Cart */}
      <div className="col-span-4 bg-gray-50 p-6">
        {/* Cart items */}
        {/* Payment section */}
        {/* Checkout button */}
      </div>
    </div>
  );
};

export default POSSystem;
