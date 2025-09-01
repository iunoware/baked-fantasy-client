import { useState } from "react";

export default function ProductDetails({ description, ingredients, shipping }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {["description", "ingredients", "shipping"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-lg font-medium ${
              activeTab === tab
                ? "border-b-2 border-pink-500 text-pink-500"
                : "text-gray-600"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="text-gray-700 leading-relaxed">
        {activeTab === "description" && <p>{description}</p>}
        {activeTab === "ingredients" && (
          <ul className="list-disc list-inside space-y-1">
            {ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
        {activeTab === "shipping" && <p>{shipping}</p>}
      </div>
    </div>
  );
}
