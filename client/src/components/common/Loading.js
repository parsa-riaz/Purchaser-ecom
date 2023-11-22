import React from "react";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <div className=" bg-navy/80  overflow-hidden top-0 z-20 flex justify-center items-center relative w-full opacity-100 h-screen ">
      <div className="  absolute">
        <div className="animate-spin">
          <FontAwesomeIcon
            icon={faCircleNotch}
            className=" h-[3rem] w-[3rem] text-white"
          />
        </div>
      </div>
    </div>
  );
}
