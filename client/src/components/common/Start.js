import {
  faStar,
  faStarHalf,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Start({ rating }) {
  return (
    <span>
      {rating == 5 ? (
        <span>
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
        </span>
      ) : rating >= 4.5 ? (
        <span className="text-yellow-400">
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon
            className="text-yellow-400"
            icon={faStarHalfStroke}
          />
        </span>
      ) : rating >= 4 ? (
        <span>
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
        </span>
      ) : rating >= 3.5 ? (
        <span>
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon
            className="text-yellow-400 "
            icon={faStarHalfStroke}
          />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
        </span>
      ) : rating >= 3 ? (
        <span>
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
        </span>
      ) : rating >= 2.5 ? (
        <span>
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon
            className="text-yellow-400"
            icon={faStarHalfStroke}
          />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
        </span>
      ) : rating >= 2 ? (
        <span>
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
        </span>
      ) : rating >= 1.5 ? (
        <span>
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon
            className="text-yellow-400"
            icon={faStarHalfStroke}
          />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
        </span>
      ) : rating >= 1 ? (
        <span>
          <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon />
        </span>
      ) : (
        <span>
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
          <FontAwesomeIcon className="text-gray-500" icon={faStar} />
        </span>
      )}
    </span>
  );
}
