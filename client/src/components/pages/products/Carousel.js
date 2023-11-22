import React, { useEffect } from "react";
import Slider from "react-slick";
import sale from "../../../asserts/Product/sale.png";
import bags from "../../../asserts/Product/Bags.png";
import fragrence from "../../../asserts/Product/Fragrences.png";
import womenfasion from "../../../asserts/Product/Womwnfasion.png";
import mencollection from "../../../asserts/Product/mencollection.png";
import furniture from "../../../asserts/Product/Furniture.png";
import shoes from "../../../asserts/Product/Shoes.png";

export default function Carousel() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div>
      <div>
        <Slider {...settings}>
          <div className="h-[150px] md:h-[250px] lg:h-[350px] 2xl:h-[700px]">
            <img
              src={sale}
              alt="sale banner"
              className="object-cover  w-full h-full"
            />
          </div>
          <div className="h-[150px] md:h-[250px] lg:h-[350px] 2xl:h-[700px]">
            <img
              src={mencollection}
              className="object-cover  w-full h-full"
              alt="sale banner"
            />
          </div>
          <div className="h-[150px] md:h-[250px] lg:h-[350px] 2xl:h-[700px]">
            <img
              src={womenfasion}
              alt="sale banner"
              className="object-cover  w-full h-full"
            />
          </div>
          <div className="h-[150px] md:h-[250px] lg:h-[350px] 2xl:h-[700px]">
            <img
              src={bags}
              alt="sale banner"
              className="object-cover  w-full h-full"
            />
          </div>
          <div className="h-[150px] md:h-[250px] lg:h-[350px] 2xl:h-[700px]">
            <img
              src={fragrence}
              alt="sale banner"
              className="object-cover  w-full h-full"
            />
          </div>
          <div className="h-[150px] md:h-[250px] lg:h-[350px] 2xl:h-[700px]">
            <img
              src={shoes}
              alt="sale banner"
              className="object-cover  w-full h-full"
            />
          </div>
          <div className="h-[150px] md:h-[250px] lg:h-[350px] 2xl:h-[700px]">
            <img
              src={furniture}
              alt="sale banner"
              className="object-cover  w-full h-full"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}
