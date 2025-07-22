import React from "react";
import AddBtn from "../AddBtn";
import Quantity from "../Quantity";
import Link from "next/link";

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(
    `https://api.freeapi.app/api/v1/public/randomproducts/${params.id}`
  );
  const data = await res.json();
  const product = data.data;
  console.log(product);
  return (
    <div className="lg:px-15 px-5 pb-5 max-w-[1480px] m-auto">
      <p className="md:text-base text-sm font-semibold opacity-60">
        <Link href="/">Home</Link> {">"} product {">"} {product.title}
      </p>
      <div
        className="details grid lg:grid-cols-2 grid-rows-1
      gap-y-8 xl:gap-x-0 gap-x-10 mt-10"
      >
        <section className="img">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="xl:w-[70%] w-full object-contain rounded-md"
          />
        </section>
        <section className="product-info">
          <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold">
            {product.title}
          </h1>
          <p className="lg:text-xl md:text-lg text-base mt-3">
            {product.description}
          </p>
          <p className="lg:text-xl md:text-lg text-base opacity-70 font-medium mt-3">
            Brand : {product.brand}
          </p>
          <p className="my-5 py-5 border-y-2  lg:text-4xl md:text-3xl text-2xl text-red-600 font-semibold">
            Rs.{product.price}
          </p>
          <AddBtn
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              description:product.description,
              brand:product.brand,
              thumbnail: product.thumbnail,
            }}
            
          />
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
