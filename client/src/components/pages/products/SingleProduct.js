import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../common/Loading";
import Review from "./Review";
import Start from "../../common/Start";
import { addToCart } from "../../../redux/actions/cartAction";

export default function SingleProduct() {
  const { product } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.products);
  const cartloading = useSelector((state) => state.cart.loading);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    const data = {
      productId: product._id,
      userId: user._id,
      quantity: 1,
    };
    dispatch(addToCart(data));
  };
  return (
    <div className="h-auto  w-full mt-[65px] overflow-y-scroll">
      {loading || cartloading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className="flex bg-cgreen flex-col justify-center items-center w-full h-auto md:h-full md:flex-row ">
            <div className="w-[95%] md:w-[90%] lg:w-[80%]  my-8 2xl:my-15 bg-gray-50 h-auto md:h-[80%]  border shadow-md rounded-none md:rounded-lg ">
              <div className=" text-sm md:text-lg 2xl:text-xl flex  flex-col md:flex-row">
                <div className=" h-auto w-full  md:p-8 md:w-1/3">
                  <img
                    src={product.image.url}
                    alt="product here"
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className=" md:w-2/3 px-[8%]  h-auto font-neon flex items-start justify-between flex-col py-[4%]">
                  <div className="flex py-4  gap-2 flex-row">
                    <h3 className="uppercase font-neon text-base font-semibold underline underline-offset-4">
                      Title{" "}
                    </h3>
                    <p className="text-[1.2rem] md:text-[1.5rem] 2xl:text-[2rem] font-merri uppercase font-semibold">
                      {" "}
                      {product.title}
                    </p>
                  </div>
                  <div className="flex  gap-2 flex-row">
                    <Start rating={product.avgRating} />
                  </div>
                  <div className="flex py-4 gap-2 font-bold flex-row">
                    <h3 className="uppercase text-base font-semibold ">
                      RS :{" "}
                    </h3>
                    <p>{product.price}</p>
                  </div>

                  <div className="flex py-4 gap-2 flex-row">
                    <h3 className="uppercase underline underline-offset-4 text-base font-semibold ">
                      Category:{" "}
                    </h3>

                    <p>{product.category}</p>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="bg-navy text-white/90 py-2 shadow-sm font-semibold  hover:bg-cgreen  px-4"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="h-auto ">
                <div className="border-t p-4">
                  <div className="grid gap-4 flex-row">
                    <h3 className="uppercase font-neon underline text-base font-semibold  underline-offset-4">
                      Discription:{" "}
                    </h3>
                    <p className="md:px-4">{product.discription}</p>
                  </div>
                </div>
              </div>
              <div className="border-t p-4 h-auto">
                <Review product={product} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
