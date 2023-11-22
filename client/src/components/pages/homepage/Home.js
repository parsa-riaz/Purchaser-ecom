import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../../redux/actions/productsAction.js";

import {
  setCategory,
  setRating,
} from "../../../redux/reducers/productsSlice.js";
import HomeBody from "./HomeBody.js";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());

    dispatch(setCategory(""));

    dispatch(setRating(0));
  }, []);

  return (
    <div>
      <HomeBody />
    </div>
  );
}
