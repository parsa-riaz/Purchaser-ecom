import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faSearch,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HighToLow,
  lowToHigh,
  setCategory,
  setRating,
} from "../../../redux/reducers/productsSlice";

import {
  getFilterByCategory,
  getFilterByRating,
  getProducts,
  searchProducts,
} from "../../../redux/actions/productsAction";

export default function Filter({ page, pageSize }) {
  const dropdownItems = [
    "all",
    "perfumes",
    "men",
    "women",
    "shoes",
    "jwellery",
    "furniture",
    "electronics",
    "mobiles",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isRating, setIsRating] = useState(false);

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { rating, category } = useSelector((state) => state.products);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleRating = () => {
    setIsRating(!isRating);
  };
  const handleRating = (rate) => {
    dispatch(setRating(rate));
  };
  const handleSearch = () => {
    if (search == "") {
      dispatch(getProducts({ page, pageSize }));
    } else {
      dispatch(searchProducts(search));
    }
  };
  const handleCategory = (category) => {
    setIsOpen(false);
    if (category == "all") {
      dispatch(getProducts({ page, pageSize }));
      dispatch(setCategory(""));
    } else {
      dispatch(setCategory(category));
      dispatch(getFilterByCategory({ category }));
    }
  };
  return (
    <div className="w-full font-lora">
      <div className="w-full flex  justify-center  flex-col items-center">
        <div className="flex items-center  justify-between md:w-[50%] border focus:outline-none focus:ring focus:border-navy overflow-hidden border-gray-300 rounded-lg ">
          <input
            type="text"
            className="  w-full px-2 py-2 "
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={handleSearch}
            className=" bg-navy px-4 py-2   hover:bg-cgreen text-white"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="flex w-full justify-between items-center py-4 md:w-[80%] gap-1 md:gap-4 text-sm md:text-base 2xl:text-xl">
          <div>
            <span>
              Price
              <FontAwesomeIcon
                icon={faArrowDown}
                onClick={() => {
                  dispatch(lowToHigh());
                }}
                className="px-1 md:px-2 active:text-cgreen hover:text-orange-700 focus:text-cgreen focus:outline "
              />
              <FontAwesomeIcon
                icon={faArrowUp}
                onClick={() => {
                  dispatch(HighToLow());
                }}
                className=" hover:text-orange-700"
              />
            </span>
          </div>
          <div>
            <div className="relative ">
              <button
                onClick={toggleDropdown}
                className="bg-gray-200 justify-between w-auto hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <span> category:{category}</span>
                <span>
                  {" "}
                  {isOpen ? (
                    <FontAwesomeIcon icon={faAngleUp} className="px-4" />
                  ) : (
                    <FontAwesomeIcon icon={faAngleDown} className="px-4" />
                  )}
                </span>
              </button>

              <ul
                className={`absolute w-full  ${
                  isOpen ? "block" : "hidden"
                } bg-white text-gray-800 pt-1`}
              >
                {dropdownItems.map((item, index) => (
                  <li
                    key={index}
                    className="bg-navy text-white/90 border py-2 px-4"
                    onClick={() => {
                      handleCategory(item);
                      setIsOpen(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <span onClick={toggleRating}>
              rating: <b>{rating} stars</b>
              {isRating ? (
                <FontAwesomeIcon icon={faAngleUp} className="px-4" />
              ) : (
                <FontAwesomeIcon icon={faAngleDown} className="px-4" />
              )}
            </span>
            <ul
              className={`absolute w-auto  ${
                isRating ? "block" : "hidden"
              } bg-white text-gray-800 pt-1`}
            >
              <li
                className="bg-navy text-yellow-200 border py-2 px-4"
                onClick={() => {
                  handleRating(0);
                  dispatch(getProducts({ page, pageSize }));
                }}
              >
                All
              </li>
              <li
                className="bg-navy text-yellow-200 border py-2 px-4"
                onClick={() => {
                  handleRating(1);

                  dispatch(getFilterByRating(1));
                }}
              >
                <FontAwesomeIcon icon={faStar} />
              </li>
              <li
                className="bg-navy text-yellow-200 border py-2 px-4"
                onClick={() => {
                  handleRating(2);
                  dispatch(getFilterByRating(2));
                }}
              >
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </li>
              <li
                className="bg-navy text-yellow-200 border py-2 px-4"
                onClick={() => {
                  handleRating(3);
                  dispatch(getFilterByRating(3));
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
                  dispatch(getFilterByRating(4));
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
                  dispatch(getFilterByRating(5));
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
        </div>
      </div>
    </div>
  );
}
