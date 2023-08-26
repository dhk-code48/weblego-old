import React, { useContext, useState } from "react";
import { addStyle, stylesList } from "../utils";
import { GrFormAdd } from "react-icons/gr";

import { AppContext } from "../../../context";

const AdditionalCss = () => {
  const { selected } = useContext(AppContext);

  const [cssSearch, setCssSearch] = useState("");
  return (
    <div className="py-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-800 font-medium">Add CSS Styles</p>
        <GrFormAdd size={20} />
      </div>
      <input
        value={cssSearch}
        onChange={(e) => setCssSearch(e.target.value)}
        className="w-full bg-blue-50 px-2 py-1 rounded-md outline-blue-200 border border-blue-200"
        placeholder="Search For Style ...."
      />
      <div>
        {stylesList.map((css) => {
          if (cssSearch.length > 0)
            if (
              css.label.toLowerCase().includes(cssSearch.toLowerCase()) ||
              css.keys.toLowerCase().includes(cssSearch.toLowerCase())
            ) {
              return (
                <div
                  onClick={() => addStyle(selected, css.style)}
                  className="bg-gray-100 my-3 py-2 px-5 rounded-lg cursor-pointer"
                >
                  <p>{css.label}</p>
                </div>
              );
            }
        })}
      </div>
    </div>
  );
};

export default AdditionalCss;
