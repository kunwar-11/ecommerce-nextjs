"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function ProductCard({ children, product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const router = useRouter();
  const goToProduct = (e) => {
    if (
      e.target.id === "addToCartBtn" ||
      e.target.tagName === "LABEL" ||
      e.target.tagName === "INPUT" ||
      e.target.tagName === "svg"
    ) {
      return;
    }
    router.push(`/product/${"dd"}`);
  };

  const addToCart = (e) => {
    e.stopPropagation();
    if (product.size.length && !selectedSize) {
      alert("abe choose kr bsdk");
    }
    console.log(selectedSize);
    setSelectedSize("");
  };

  return (
    <div
      className="bg-black flex flex-col justify-between items-center w-[300px] border p-4 gap-6 hover:border hover:border-parrotGreen cursor-pointer"
      onClick={(e) => goToProduct(e)}
    >
      {children}
      <div className="w-full flex-grow flex flex-col ">
        <form className="flex items-center justify-between flex-grow pb-4">
          {!!product.size.length &&
            product.size.map((size, index) => (
              <div className="flex items gap-1" key={index}>
                <input
                  type="radio"
                  name="size"
                  value={size}
                  id={size}
                  className="accent-parrotGreen"
                  onChange={(e) => setSelectedSize(e.target.value)}
                />
                <label className="text-white">{size}</label>
              </div>
            ))}
        </form>
        <button
          className="bg-parrotGreen text-center text-black px-4 py-2 rounded-md w-full font-semibold"
          id="addToCartBtn"
          onClick={addToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
