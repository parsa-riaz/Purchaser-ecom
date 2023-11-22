import React from "react";
import Products from "../products/Products.js";
import ProductsPage from "../products/ProductsPage.js";

export default function AllProducts() {
  return (
    <div className="flex justify-end items-center w-full min-h-screen h-full">
      <div className="bg-red-800 w-[80%] h-100 text-white">
        <ProductsPage />
      </div>
    </div>
  );
}
