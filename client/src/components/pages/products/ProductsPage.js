import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  getSingleProduct,
} from "../../../redux/actions/productsAction";
import Loading from "../../common/Loading";

export default function ProductsPage() {
  const { products } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.products);

  const [page, setPage] = useState(1);
  const [pageSize, setPageize] = useState(8);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rating, category } = useSelector((state) => state.products);
  const handleSingleProduct = (id) => {
    dispatch(getSingleProduct(id));
    navigate(`/single/${id}`, { state: { id: id } });
  };
  const handlePrev = () => {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  };
  const handleNext = () => {
    setPage((p) => {
      if (p === pageSize) return p;
      return p + 1;
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getProducts({ page: page, pageSize: pageSize }));
  }, [dispatch, page, pageSize]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="py-4">
            <Filter page={page} pageSize={pageSize} />
          </div>
          <div className="flex items-center w-full">
            <div className=" justify-center px-[15px] items-center gap-2 xl:gap-8 flex  spacce-evenly  flex-wrap my-4">
              {products.length != 0 ? (
                products.map((product) => {
                  return (
                    <div
                      className="hover:translate-x-1 hover:translate-y-1 hover:shadow-sm min-w-[8rem] max-w-[30rem] w-[8rem] h-[16rem] md:h-[20rem] md:w-[15rem] lg:w-[15rem] lg:h-[20rem] xl:h-[30rem] xl:w-[19rem] 2xl:w-[30rem] 2xl:h-[35rem] flex gap-2 md:gap-4"
                      onClick={() => {
                        handleSingleProduct(product._id);
                      }}
                    >
                      <Product product={product} />
                    </div>
                  );
                })
              ) : (
                <div className="py-2  w-full bg-red-800 text-center text-white  font-lora ">
                  <p>Opps! no products found yet</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {rating != 0 || category !== "" ? null : (
        <div className="flex justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="bg-navy text-white hover:text-cgreen p-2"
          >
            Previous
          </button>
          <button
            className="bg-navy text-white hover:text-cgreen p-2"
            onClick={handleNext}
            disabled={page === pageSize}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
