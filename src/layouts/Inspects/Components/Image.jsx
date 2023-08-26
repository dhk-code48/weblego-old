import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import { ref, set } from "firebase/database";
import { db } from "../../../db/config";
import { updateStyle } from "../utils";

export const Image = () => {
  const { selected } = useContext(AppContext);

  const [src, setSrc] = useState("");

  useEffect(() => {
    if (selected?.attributes?.src) {
      setSrc(selected.attributes.src);
    }
  }, [selected]);

  useEffect(() => {
    if (selected?.attributes?.src) {
      set(ref(db, selected.path + "/attributes/src/"), src);
    }
  }, [src]);

  return (
    <>
      {selected.tag === "img" && (
        <div className="py-4 border-b border-gray-200">
          <p className="text-gray-600 font-medium tracking-wide">
            Image Source
          </p>
          <input
            type="text"
            value={src}
            className="w-full bg-slate-50 px-2 my-2 py-1 rounded-md outline-slate-200 border border-slate-200"
            placeholder="source for the image"
            onChange={(e) => setSrc(e.target.value)}
          />
        </div>
      )}
    </>
  );
};
