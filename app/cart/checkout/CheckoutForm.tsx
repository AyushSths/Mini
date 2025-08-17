// "use client";
// import React, { useEffect, useState } from "react";
// import OrderSummary from "./OrderSummary";

// type FormData = {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
// };

// const CheckoutForm = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

// const handleSubmit = (): boolean => {
//   const { name, email, phone, address } = formData;

//   if (!name || !email || !phone || !address) {
//     alert("Please fill in all fields");
//     return false;
//   }

//   if (phone.length !== 10) {
//     alert("Phone number must be exactly 10 digits");
//     return false;
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     alert("Please enter a valid email address (e.g., abc@gmail.com)");
//     return false;
//   }

//   const selectedItems = JSON.parse(localStorage.getItem("selectedItems") || "[]");
//   const order = JSON.parse(localStorage.getItem("checkout") || "{}");

//   const completeOrder = {
//     customer: formData,
//     order: order,
//     items: selectedItems,
//     date: new Date().toISOString(),
//   };

//   const existingOrders = JSON.parse(localStorage.getItem("allOrders") || "[]");
//   const updatedOrders = [...existingOrders, completeOrder];

//   localStorage.setItem("allOrders", JSON.stringify(updatedOrders));

//   console.log("New order saved:", completeOrder);
//   return true;
// };

//   return (
//     <>
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
//         <form
//           className="grid grid-cols-1 gap-4"
//           onSubmit={(e) => e.preventDefault()}
//         >
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             className="border p-3 rounded-md"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="border p-3 rounded-md"
//             required
//           />
//           <input
//             type="number"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Phone number"
//             className="border p-3 rounded-md"
//             required
//           />
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Address"
//             className="border p-3 rounded-md"
//             required
//           />
//         </form>
//       </div>
//       <OrderSummary onSubmit={handleSubmit} />
//     </>
//   );
// };

// export default CheckoutForm;

"use client";
import React, { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
  phone: z.string().min(10).max(10),
  address: z.string().min(1, "Address is required"),
});

type CheckoutForminputs = z.infer<typeof schema>;

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForminputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: CheckoutForminputs) => {
    const selectedItems = JSON.parse(
      localStorage.getItem("selectedItems") || "[]"
    );
    const order = JSON.parse(localStorage.getItem("checkout") || "{}");

    const completeOrder = {
      customer: data,
      order: order,
      items: selectedItems,
      date: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("allOrders") || "[]"
    );
    const updatedOrders = [...existingOrders, completeOrder];

    localStorage.setItem("allOrders", JSON.stringify(updatedOrders));

    console.log("New order saved:", completeOrder);
    return true;
  };

  const handleCheckout = async (): Promise<boolean> => {
    let success = false;

    await handleSubmit(async (data) => {
      success = await onSubmit(data);
    })(); 

    return success;
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("name")}
            type="text"
            name="name"
            placeholder="Full name"
            className="p-4 border rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm -mt-3">{errors.name.message}</p>
          )}
          <input
            {...register("email")}
            type="email"
            name="email"
            placeholder="Email"
            className="p-4 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm -mt-3">{errors.email.message}</p>
          )}
          <input
            {...register("phone")}
            type="number"
            name="phone"
            placeholder="Phone Number"
            className="p-4 border rounded-lg"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm -mt-3">{errors.phone.message}</p>
          )}
          <input
            {...register("address")}
            type="text"
            name="address"
            placeholder="Address"
            className="p-4 border rounded-lg"
          />
          {errors.address && (
            <p className="text-red-500 text-sm -mt-3">
              {errors.address.message}
            </p>
          )}
        </form>
      </div>
      <OrderSummary onSubmit={handleCheckout} />
    </>
  );
};

export default CheckoutForm;
