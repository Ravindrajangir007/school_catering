import { useState, useEffect } from "react";
import {
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  UserIcon,
  QrCodeIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  CreditCardIcon,
  BanknotesIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

// Mock categories and products - will be replaced with API data
const categories = [
  { id: "all", name: "All Items" },
  { id: "snacks", name: "Snacks" },
  { id: "beverages", name: "Beverages" },
  { id: "chocolates", name: "Chocolates" },
  { id: "chips", name: "Chips" },
  { id: "biscuits", name: "Biscuits" },
  { id: "stationery", name: "Stationery" },
];

const products = [
  {
    id: 1,
    name: "Lays Classic",
    category: "chips",
    price: 20,
    image: "https://source.unsplash.com/400x300/?chips",
    stock: 50,
  },
  {
    id: 2,
    name: "Coca Cola",
    category: "beverages",
    price: 40,
    image: "https://source.unsplash.com/400x300/?cola",
    stock: 100,
  },
  // Add more products...
];

export default function POSSystem() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [customerInfo, setCustomerInfo] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountReceived, setAmountReceived] = useState("");
  const currentDateTime = "2025-03-27 09:16:14";
  const currentUser = "Ravindrajangir007";

  // Filter products based on category and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart operations
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const product = products.find((p) => p.id === productId);
    if (newQuantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }

    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCustomerInfo(null);
  };

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  // Process payment
  const handlePayment = () => {
    if (!customerInfo) {
      setShowCustomerModal(true);
      return;
    }
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    // Here you would integrate with your payment processing system
    const order = {
      orderId: `ORD${Date.now()}`,
      items: cart,
      subtotal,
      tax,
      total,
      customer: customerInfo,
      paymentMethod,
      timestamp: currentDateTime,
      cashier: currentUser,
    };

    console.log("Processing order:", order);

    // Clear cart and reset state
    clearCart();
    setShowPaymentModal(false);
    setAmountReceived("");
    toast.success("Payment processed successfully!");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Products Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search and Categories */}
        <div className="p-4 bg-white border-b">
          <div className="mx-auto">
            <div className="mb-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="aspect-w-1 aspect-h-1 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-indigo-600">
                      ₹{product.price}
                    </p>
                    <p className="text-xs text-gray-500">
                      Stock: {product.stock}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 flex flex-col bg-white border-l">
        {/* Cart Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Clear Cart
              </button>
            )}
          </div>
          <button
            onClick={() => setShowCustomerModal(true)}
            className="mt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-500"
          >
            <UserIcon className="h-5 w-5 mr-1" />
            {customerInfo ? customerInfo.name : "Add Customer"}
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ₹{item.price} each
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-500"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                      <span className="mx-2 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                      <span className="ml-auto font-medium">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="border-t bg-gray-50 p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>GST (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-medium text-gray-900">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handlePayment}
            disabled={cart.length === 0}
            className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* Customer Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Customer Details</h3>
              <button onClick={() => setShowCustomerModal(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer Type
                </label>
                <div className="mt-1 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="customerType"
                      value="student"
                      className="form-radio"
                    />
                    <span className="ml-2">Student</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="customerType"
                      value="staff"
                      className="form-radio"
                    />
                    <span className="ml-2">Staff</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ID Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    className="block w-full pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter ID number"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <QrCodeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setCustomerInfo({
                      name: "John Doe",
                      id: "STU123",
                      type: "student",
                    });
                    setShowCustomerModal(false);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Payment</h3>
              <button onClick={() => setShowPaymentModal(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  ₹{total.toFixed(2)}
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => setPaymentMethod("cash")}
                    className={`w-full flex items-center p-4 border-2 rounded-lg ${
                      paymentMethod === "cash"
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200"
                    }`}
                  >
                    <BanknotesIcon className="h-6 w-6 text-gray-400" />
                    <span className="ml-3">Cash</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`w-full flex items-center p-4 border-2 rounded-lg ${
                      paymentMethod === "card"
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200"
                    }`}
                  >
                    <CreditCardIcon className="h-6 w-6 text-gray-400" />
                    <span className="ml-3">Card</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("upi")}
                    className={`w-full flex items-center p-4 border-2 rounded-lg ${
                      paymentMethod === "upi"
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200"
                    }`}
                  >
                    <QrCodeIcon className="h-6 w-6 text-gray-400" />
                    <span className="ml-3">UPI</span>
                  </button>
                </div>

                {paymentMethod === "cash" && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Amount Received
                    </label>
                    <input
                      type="number"
                      value={amountReceived}
                      onChange={(e) => setAmountReceived(e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {amountReceived && (
                      <div className="mt-2 text-sm text-gray-500">
                        Change: ₹
                        {(parseFloat(amountReceived) - total).toFixed(2)}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={processPayment}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Complete Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
