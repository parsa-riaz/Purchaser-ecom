import {
  faAngleDown,
  faAngleUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addReview } from "../../../redux/actions/productsAction";
import Start from "../../common/Start";

export default function Review({ product }) {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isReview, setIsReview] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const toggleRating = () => {
    setIsRating(!isRating);
  };
  const handleRating = (val) => {
    setRating(val);
    toggleRating();
  };
  const handleReview = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = () => {
    setIsReview(false);
    let data = {
      productId: product._id,
      userId: user._id,
      rating,
      review,
    };
    dispatch(addReview(data));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className=" p-2">
        <div className="grid gap-4 flex-row">
          <h3 className="uppercase font-neon underline text-base font-semibold  underline-offset-4">
            Reviews:{" "}
          </h3>
          {product.reviews.length == 0 ? (
            <p className="text-center text-lg text-gray-500">
              Be the first to review
            </p>
          ) : (
            <div className="md:px-4  py-2">
              {product.reviews.map((rev) => {
                return (
                  <div className="border-b-2 py-2 font-playpan grid text-sm md:text-base 2xl:text-lg">
                    <span className="font-semibold"> @{rev.userName}</span>
                    <span className="text-sm 2xl:text-lg py-1 ">
                      <Start rating={rev.rating} />
                    </span>
                    <p>{rev.review}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          className={`bg-navy text-white/90 py-2 shadow-sm font-semibold  hover:bg-cgreen  px-4 ${
            !isReview ? "block" : "hidden"
          }`}
          onClick={() => {
            setIsReview(true);
          }}
        >
          Add Review
        </button>
      </div>

      {!token ? (
        navigate("/login")
      ) : isReview ? (
        <div className="p-4 font-lora ">
          <div className="py-2 text-lg uppercase text-navy font-semibold">
            <p>Time To Review</p>
          </div>
          <div className=" w-auto md:w-[30%]">
            <span onClick={toggleRating}>
              Rating: <b className="uppercase">{rating} stars</b>
              {isRating ? (
                <FontAwesomeIcon icon={faAngleUp} className="px-4" />
              ) : (
                <FontAwesomeIcon icon={faAngleDown} className="px-4" />
              )}
            </span>
            <ul
              className={`absolute w-[20%]  ${
                isRating ? "block" : "hidden"
              } bg-white text-gray-800 pt-1`}
            >
              <li
                className="bg-navy text-yellow-200 border py-2 px-4"
                onClick={() => {
                  handleRating(1);
                }}
              >
                <FontAwesomeIcon icon={faStar} />
              </li>
              <li
                className="bg-navy text-yellow-200 border py-2 px-4"
                onClick={() => {
                  handleRating(2);
                }}
              >
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </li>
              <li
                className="bg-navy text-yellow-200 border py-2 px-4"
                onClick={() => {
                  handleRating(3);
                }}
              >
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </li>
              <li
                className="bg-navy text-yellow-200 border py-2 px-4"
                onClick={() => {
                  handleRating(4);
                }}
              >
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </li>
              <li
                className="bg-navy text-yellow-200 border py-2 px-4"
                onClick={() => {
                  handleRating(5);
                }}
              >
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </li>
            </ul>
          </div>
          <div className="grid py-2 w-auto md:w-[50%]">
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              className="p-2 focus:outline-none focus:ring-1 focus:border-navy border border-cgreen"
              onChange={handleReview}
            />
          </div>
          <div>
            <button
              className="bg-navy text-white/90 py-2 shadow-sm font-semibold  hover:bg-cgreen  px-4 "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
