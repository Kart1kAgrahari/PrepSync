"use client";
import React from "react";

const plans = [
  {
    title: "Free",
    price: "0$",
    period: "/month",
    features: [
      "5 Course Generate",
      "Limited Support",
      "Email support",
      "Help center access",
    ],
    button: {
      text: "Current Plan",
      disabled: true,
    },
  },
  {
    title: "Montly",
    price: "9.99$",
    period: "/Monthly",
    features: [
      "Unlimited Course Generate",
      "Unlimited Flashcard, Quiz",
      "Email support",
      "Help center access",
    ],
    button: {
      text: "Get Started",
      disabled: false,
    },
  },
];

const Page = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Plans</h1>
      <p className="text-gray-600 mb-10">
        Update your plan to generate unlimited courses for your exam
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-sm p-8 flex flex-col items-start justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-1">{plan.title}</h2>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <ul className="mb-6 space-y-2 text-sm text-gray-700">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
            </div>
            <button
              disabled={plan.button.disabled}
              className={`px-6 py-2 text-sm rounded-md font-medium ${
                plan.button.disabled
                  ? "text-blue-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {plan.button.text}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
