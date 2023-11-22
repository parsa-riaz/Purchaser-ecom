import React from "react";
import Hero1 from "../../../asserts/Hero1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import men from "../../../asserts/men.jpg";
import women from "../../../asserts/womenbag.jpg";
export default function HeroSection() {
  return (
    <div className="h-full w-full  overflow-hidden">
      <div className=" flex  flex-col text-center md:text-start md:flex-row lg:h-[45rem] bg-orange-50   h-auto md:h-[40rem] 2xl:h-[80rem]">
        <div className=" w-full md:w-1/2 mt-4 md:mt-0 flex   justify-center items-center">
          <div className=" w-[80%]  2xl:mt-8  md:text-start">
            <h1 className=" my-4 xl:text-4xl 2xl:text-5xl  md:my-0 text-2xl md:text-xl lg:text-3xl font-merri uppercase text-navy font-bold">
              Browse our premium products
            </h1>
            <p className="text-[2rem] lg:text-[4rem]  text-red-700 font-merri">
              Upto 50% off
            </p>
            <p className="my-3 xl:text-[1.3rem] 2xl:text-[2rem] 2xl:my-8 font-playpan ">
              Introducing our finest selection of premium products, meticulously
              crafted to enhance your lifestyle and cater to your most exquisite
              tastes. At Purchasers, we take pride in offering you only the
              best.{" "}
            </p>

            <button className="border  hover:text-white  text-navy 2xl:text-2xl hover:bg-navy font-neon text-base border-navy px-[15px] py-[60px] 2xl:px-[20px] 2xl:py-[90px] rounded-full my-2">
              Browse More <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </div>
        </div>
        <div className=" w-full  md:w-1/2 h-full ">
          <img
            src={Hero1}
            className="w-full h-full object-cover "
            alt="Hijabi women doing shoping"
          />
        </div>
      </div>
      <div className="static md:relative bg-sky  z-0 md:-top-28 md:flex flex-col  md:flex-row h-auto 2xl:h-[70rem] md:h-[35rem]">
        <div className=" bg-cgreen  w-full md:w-2/3  flex  justify-center items-center">
          <div className="w-[70%] text-center md:text-start">
            <h1 className=" my-4 xl:text-4xl 2xl:text-5xl  md:my-0 text-2xl md:text-xl lg:text-3xl font-merri uppercase text-white font-bold">
              Find best quality products
            </h1>
            <p className="text-[2rem]  lg:text-[4rem]  text-yellow-400 font-merri">
              Upto 30% off
            </p>
            <p className="my-10 xl:text-[1.5rem] 2xl:text-[2rem] 2xl:py-4 font-playpan text-white">
              Discovering the best quality products ensures lasting satisfaction
              and value for your investment.
            </p>

            <button className="border  hover:text-navy text-white hover:bg-white font-neon text-base py-[65px] px-[20px] rounded-full my-2">
              Browse More <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </div>
        </div>
        <div className="w-full h-full relative right-[6%] md:w-1/2    justify-center items-center gap-7 flex ">
          {" "}
          <div className=" w-[75%] h-[80%]">
            <img
              src={women}
              alt="women bag and products"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="  w-[75%] h-[80%]">
            <img
              src={men}
              alt="men knoting his shoes strap"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
