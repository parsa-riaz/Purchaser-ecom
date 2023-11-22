import React from "react";
import Slider from "react-slick";
import Product from "../pages/products/Product.js";

export default function CarouselComponent({ products }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {!products ? (
        <div>Products not found....</div>
      ) : (
        <Slider {...settings}>
          {products.map((product) => {
            return (
              <div className="px-4 md:w-[80%]  xl:w-full h-[25rem] md:h-[25rem] lg:h-[25rem]  xl:h-[30rem] 2xl:h-[40rem]">
                <Product product={product} />
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
}
