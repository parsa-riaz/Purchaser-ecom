import React from "react";
import { useSelector } from "react-redux";

import HeroSection from "./HeroSection";
import { Link } from "react-router-dom";

import CarouselComponent from "../../common/CarouselComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import CategorySec from "./CategorySec";
import Loading from "../../common/Loading.js";

export default function HomeBody() {
  const { products } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.products);

  return (
    <div className="w-full h-full overflow-hidden">
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className=" ">
            <HeroSection />
          </div>
          <div className="md:mt-[3%] text-navy font-neon uppercase mt-[20%] lg:mt-[4%] px-4 md:px-8 ">
            <h2 className="py-4 text-center text-lg xl:text-[3.5rem]">
              {" "}
              <FontAwesomeIcon icon={faAward} className="text-red-800 mx-2 " />
              Feature Products
            </h2>

            <p className="text-end xl:py-4 py-2 xl:text-lg">
              <span className="italic  underline underline-offset-4 hover:text-sky text-navy ">
                {" "}
                <Link to="/products">see all</Link>
              </span>
            </p>

            <CarouselComponent products={products} />
          </div>
          <div className="md:my-[5%] font-neon my-[20%] lg:my-[7%] px-4 md:px-8">
            <CategorySec />
          </div>
        </>
      )}
    </div>
  );
}
