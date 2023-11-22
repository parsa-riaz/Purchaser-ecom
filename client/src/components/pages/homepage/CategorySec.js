import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fragrences from "../../../asserts/Home/fragrences.jpg";
import jwellery from "../../../asserts/Home/jwellery.jpg";
import shoes from "../../../asserts/Home/shoes.jpg";
import watches from "../../../asserts/Home/watches.jpg";
import React from "react";
import { Link } from "react-router-dom";

export default function CategorySec() {
  return (
    <div className="grid h-auto md:h-[60rem] 2xl:h-[100rem] w-full  justify-items-center gap-4 md:grid-cols-4 md:grid-rows-2">
      <div className="md:text-start   text-center md:w-[60%]  md:col-start-1 md:col-span-2 md:row-start-1 ">
        <div className="w-full xxl:w-[60%] ">
          <h2 className="text-[2rem] text-cgreen  lg:text-[3rem] 2xl:text-[6rem] font-neon uppercase xl:text-[4rem] ">
            Top categories
          </h2>
          <p className="font-playpan  xl:text-[1.3rem] 2xl:text-[2rem]">
            Our curated top categories feature a wide range of choices, ensuring
            there's something for everyone.
          </p>
        </div>
        <Link to="/products">
          <button className="border  hover:text-white 2xl:text-[2rem] text-navy hover:bg-navy font-neon text-base  lg:text-lg xxl:text-2xl border-navy px-[12px]  py-[53px] lg:py-[60px] 2xl:px-[20px] 2xl:py-[120px] rounded-full my-2">
            Browse More <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </Link>
      </div>
      <div className="relative  group md:col-start-3 md:col-span-2 md:row-start-1  ">
        <img
          src={fragrences}
          alt="fragrances category"
          className=" object-cover h-full w-full "
        />
        <div className="absolute w-full text-center  top-0 h-full text-white  bg-black/20 flex transition duration-300 flex-col ease-in-out opacity-0 group-hover:opacity-100 items-center justify-center">
          <div className="w-[60%] bg-cgreen py-4">
            <h4 className="uppercase text-xl lg:text-4xl  text-neon">
              Fragrances
            </h4>
            <p className="text-paypan p-2 text-sm md:text-base xl:text-xl">
              Elevate your online shopping with our curated fragrances
              collection, offering a wide range of scents for every occasion.
            </p>
            <Link to="/products">
              <button className="uppercase border-2 hover:bg-navy text-white border-navy p-2 my-2">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative group  md:col-start-1  md:row-start-2 ">
        <img
          src={jwellery}
          alt="jwellery category"
          className=" object-cover h-full w-full"
        />
        <div className="absolute w-full text-center top-0 h-full text-white  bg-black/20 flex transition duration-300 flex-col ease-in-out opacity-0 group-hover:opacity-100 items-center justify-center">
          <div className="w-[90%] bg-cgreen py-4">
            <h4 className="uppercasetext-xl lg:text-4xl  text-neon">
              Jwellery
            </h4>
            <p className="text-paypan p-2 text-sm md:text-base xl:text-xl">
              Elevate yo ur style with our exquisite jewelry collection.
            </p>
            <Link to="/products">
              <button className="uppercase border-2 hover:bg-navy text-white border-navy p-2 my-2">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative group md:col-start-2 md:col-span-2 md:row-start-2 ">
        <img
          src={shoes}
          alt="shoes category"
          className=" object-cover h-full "
        />
        <div className="absolute text-center w-full top-0 h-full text-white  bg-black/20 flex transition duration-300 flex-col ease-in-out opacity-0 group-hover:opacity-100 items-center justify-center">
          <div className="w-[90%] md:w-[60%] bg-cgreen py-4">
            <h4 className="uppercase text-xl lg:text-4xl text-neon">Shoes</h4>
            <p className="text-paypan p-2 text-sm md:text-base xl:text-xl">
              Step into fashion and comfort with our stunning shoe collection.
            </p>
            <Link to="/products">
              <button className="uppercase border-2 hover:bg-navy text-white border-navy p-2 my-2">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative group md:col-start-4 md:row-start-2">
        <img
          src={watches}
          alt="watches category"
          className=" object-cover h-full w-full"
        />
        <div className="absolute w-full top-0 h-full text-white text-center  bg-black/20 flex transition duration-300 flex-col ease-in-out opacity-0 group-hover:opacity-100 items-center justify-center">
          <div className="w-[90%] bg-cgreen py-4">
            <h4 className="uppercase text-xl lg:text-4xl text-neon">Watches</h4>
            <p className="text-paypan text-sm md:text-base xl:text-xl p-2">
              Timeless elegance, just a click away - discover our exceptional
              watch collection.
            </p>
            <Link to="/products">
              <button className="uppercase border-2 hover:bg-navy text-white border-navy p-2 my-2">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
