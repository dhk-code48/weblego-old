import React, { useContext } from "react";
import { MdGrid3X3, MdOutlineSegment } from "react-icons/md";

import { AppContext } from "../../context";

import AdditionalCss from "./Components/AdditionalCss";
import Delete from "./Components/Delete";
import Color from "./Components/Color";
import Spacing from "./Components/Spacing";
import { Typography } from "./Components/Typography";
import Effects from "./Components/Effects";
import Size from "./Components/Size";
import { Image } from "./Components/Image";

const Inspect = () => {
  const { selected } = useContext(AppContext);

  return (
    <div className="overflow-y-scroll overflow-x-visible bg-white h-[calc(100vh-80px)] border-l border-gray-200 pt-5 px-5 pb-0 max-w-xs">
      {selected ? (
        <>
          <div className="pb-4 border-b border-gray-200">
            <p className="text-gray-600 font-medium tracking-wide">Selector</p>
            <div className=" bg-gray-100 rounded-lg flex items-center px-5 mt-3 py-2 w-[100%]">
              {typeof selected.children !== "string" ? (
                <MdGrid3X3 size={19} />
              ) : (
                <MdOutlineSegment size={19} />
              )}
              <p className="ml-3  font-medium text-gray-800">
                {selected.sectionName}
              </p>
            </div>
          </div>
          <Size />
          <Image />
          {/* Typography */}
          <Typography />
          {/* Spacing */}

          <Spacing />

          {/* Color */}
          <Color />
          <Effects />
          {/* Additional CSS */}
          <AdditionalCss />
          {/* Delet Element */}
          <Delete />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Inspect;
