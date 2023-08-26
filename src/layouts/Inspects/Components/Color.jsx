import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import { updateStyle } from "../utils";

const Color = () => {
  const { selected } = useContext(AppContext);

  const [bg, setBg] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    setBg(selected?.styles?.background ?? "inherit");
    setColor(selected?.styles?.color ?? "inherit");
  }, [selected]);

  useEffect(() => {
    updateStyle(selected, { background: bg, color: color });
    // eslint-disable-next-line
  }, [bg, color]);

  return (
    <div className="py-4 border-b border-gray-200">
      <p className="text-gray-800 font-medium">Color</p>
      <div className="flex items-center border rounded-lg px-1 border-gray-400 w-[50%] mt-1">
        <input
          type="color"
          placeholder="Colors for element"
          value={color}
          color={color}
          className="w-6 h-6 outline-none shadow-none"
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="text"
          className="font-medium uppercase text-sm outline-none border-l border-gray-400 text-gray-700 h-full w-[75%] pl-2 ml-3"
          placeholder="Colors for element "
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <p className="text-gray-800 font-medium pt-3">Background</p>
      <div className="flex items-center border border-gray-400 group w-[50%] rounded-lg px-1 mt-1">
        <input
          type="color"
          value={bg}
          className="w-6 h-6 bordre-none outline-none shadow-none"
          placeholder="Background for element "
          onChange={(e) => setBg(e.target.value)}
        />
        <input
          type="text"
          value={bg}
          placeholder="Background for element "
          onChange={(e) => setBg(e.target.value)}
          className="font-medium uppercase text-sm outline-none border-l border-gray-400 text-gray-700 h-full w-[75%] pl-2 ml-3"
        />
      </div>
    </div>
  );
};

export default Color;
