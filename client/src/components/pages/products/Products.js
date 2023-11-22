import React from "react";
import Carousel from "./Carousel";

import ProductsPage from "./ProductsPage";

export default function Products() {
 
  return (
    <div className="mt-[4rem] h-auto w-full overflow-hidden">
      <div>
        <Carousel />
      </div>
      <ProductsPage />
    </div>
  );
}
