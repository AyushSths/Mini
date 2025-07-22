"use client";
import React, { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import { clear } from "console";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const CheckoutForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (): boolean => {
  if (
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.address
  ) {
    alert("Please fill in all fields");
    return false;
  }
  
  const existingData = localStorage.getItem("formData");
  let formDataArray: FormData[] = [];

  try {
    const parsed = JSON.parse(existingData || "[]");
    formDataArray = Array.isArray(parsed) ? parsed : [parsed];
  } catch (err) {
    formDataArray = []; 
  }

  formDataArray.push(formData);

  localStorage.setItem("formData", JSON.stringify(formDataArray));

  console.log("Form submitted:", formData);
  return true;
};

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-3 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded-md"
            required
          />
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="border p-3 rounded-md"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-3 rounded-md"
            required
          />
        </form>
      </div>
      <OrderSummary onSubmit={handleSubmit} />
    </>
  );
};

export default CheckoutForm;
