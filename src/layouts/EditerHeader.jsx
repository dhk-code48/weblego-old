import React from "react";
import { FiMonitor, FiTablet, FiEye } from "react-icons/fi";
import { CiMobile1 } from "react-icons/ci";
import { Link } from "react-router-dom";

const EditerHeader = ({ id, page }) => {
  return (
    <div className="bg-white text-black items-center px-[74px] h-20 flex justify-between border-b border-gray-200">
      <h3 className="text-lg font-semibold tracking-wide text-gray-800">
        {id}
      </h3>
      <div className="flex text-2xl">
        <FiMonitor className="m-5" />
        <CiMobile1 className="m-5" />
        <FiTablet className="m-5" />
      </div>
      <div className="flex">
        <Link target="_blank" to={"/preview/" + id + "/" + page}>
          <button className="font-medium tracking-wide mr-6 items-center flex text-gray-900">
            Preview <FiEye className="text-base ml-3" />
          </button>
        </Link>
        <button className="bg-[#753AF2] px-4 py-1 rounded font-medium tracking-wide text-white">
          Publish
        </button>
      </div>
    </div>
  );
};

export default EditerHeader;
