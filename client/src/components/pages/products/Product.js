import Star from "../../common/Start.js";
import React from "react";

export default function Product({ product }) {
  return (
    <div className="max-w-md w-full h-full ">
      <div className="bg-white h-full border border-lightgrey shadow-lg rounded-0 overflow-hidden">
        <div className="h-[60%] md:h-[70%] ">
          <img
            src={product.image.url}
            alt="product showing here"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="px-4  text-sm lg:text-base xl:text-xl text-start">
          <div className="grid h-full ">
            <p className="font-semibold  text-zinc">
              {product.title.substring(0, 30)}
            </p>

            <p className="xl:py-2">RS: {product.price}</p>
            <p>
              <Star rating={product.avgRating} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
