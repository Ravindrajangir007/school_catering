import { useState } from "react";
import { Tab } from "@headlessui/react";

const IntegratedInventory = () => {
  const [inventoryType, setInventoryType] = useState("all"); // all, retail, catering

  return (
    <div className="container mx-auto px-4 py-8">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? "bg-white text-blue-700 shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              }`
            }
          >
            All Items
          </Tab>
          <Tab>Retail Stock</Tab>
          <Tab>Catering Stock</Tab>
        </Tab.List>
        <Tab.Panels>{/* Inventory tables */}</Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default IntegratedInventory;
