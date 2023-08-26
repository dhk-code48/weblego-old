import React, { useContext, useEffect, useState } from "react";
import { MdRotate90DegreesCcw, MdRoundedCorner } from "react-icons/md";

import { AppContext } from "../../../context";
import { db } from "../../../db/config";
import { ref, set } from "firebase/database";
import { updateStyle } from "../utils";

const Size = () => {
  const { selected } = useContext(AppContext);

  const [width, setWidth] = useState();
  const [br, setBr] = useState();
  const [height, setHeight] = useState();
  const [tarnsform, setTarnsform] = useState(0);

  useEffect(() => {
    setWidth(selected?.styles?.width ?? "auto");
    setBr(selected?.styles?.borderRadius ?? 0);
    setHeight(selected?.styles?.height ?? "auto");
    setTarnsform(selected?.styles?.transform ?? 0);
  }, [selected]);

  useEffect(() => {
    updateStyle(selected, {
      width: width ?? "auto",
      height: height ?? "auto",
      borderRadius: br ?? "0px",
      tarnsform: `rotate(${tarnsform ?? 0}deg)`,
    });
    // eslint-disable-next-line
  }, [width, height, br, tarnsform]);
  return (
    <div className="py-4 border-b border-gray-200">
      <div className="justify-between flex">
        <div className="bg-gray-100 rounded-3xl flex-1 h-10 items-center flex px-3 mr-3">
          W
          <input
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="flex h-full w-full rounded-md bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="bg-gray-100 rounded-3xl flex overflow-hidden items-center px-3 flex-1 ml-3">
          H
          <input
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-gray-100 w-[90%] outline-none pl-4"
          />
        </div>
      </div>
      <div className="justify-between w-full flex overflow-hidden mt-3">
        <div className="bg-gray-100 rounded-3xl flex-1 h-10 items-center flex px-3 mr-3">
          <MdRotate90DegreesCcw />
          <input
            value={tarnsform}
            onChange={(e) => setTarnsform(e.target.value)}
            className="bg-gray-100 rounded-3xl w-[90%] outline-none pl-4"
          />
        </div>
        <div className="bg-gray-100 rounded-3xl flex overflow-hidden items-center px-3 flex-1 ml-3">
          <MdRoundedCorner />
          <input
            value={br}
            onChange={(e) => setBr(e.target.value)}
            className="bg-gray-100 w-[90%] outline-none pl-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Size;
