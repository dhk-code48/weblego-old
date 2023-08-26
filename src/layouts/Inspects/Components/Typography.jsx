import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import { ref, set } from "firebase/database";
import { db } from "../../../db/config";
import { updateStyle } from "../utils";

export const Typography = () => {
  const { selected } = useContext(AppContext);

  const [content, setContent] = useState("");
  const [fontSize, setFontSize] = useState(14);
  const [fontWeight, setFontWeight] = useState(400);

  useEffect(() => {
    if (selected?.content) {
      setContent(selected.content);
      setFontSize(selected.styles?.fontSize ?? 14);
      setFontWeight(selected.styles?.fontWeight ?? 400);
    }
  }, [selected]);

  useEffect(() => {
    if (selected?.content) {
      set(ref(db, selected.path + "/content"), content);
    }
  }, [content]);

  useEffect(() => {
    updateStyle(selected, {
      fontSize: parseInt(fontSize) || 0,
      fontWeight: parseInt(fontWeight) || 0,
    });
  }, [fontSize, fontWeight]);

  return (
    <>
      {["h1", "h2", "h3", "h4", "h5", "h6", "p", "button", "li", "a"].includes(
        selected.tag
      ) && (
        <div className="py-4 border-b border-gray-200">
          <p className="text-gray-600 font-medium tracking-wide">Typography</p>
          <input
            type="text"
            value={content}
            className="w-full bg-slate-50 px-2 my-2 py-1 rounded-md outline-slate-200 border border-slate-200"
            placeholder="Text for you component ....."
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-1 flex justify-between">
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
              className="w-[45%] bg-slate-50 px-2 my-2 py-1 rounded-md outline-slate-200 border border-slate-200"
            >
              <option value={100}>Thin</option>
              <option value={200}>Extra Thin</option>
              <option value={300}>Light</option>
              <option value={400}>Regular</option>
              <option value={500}>Medium</option>
              <option value={600}>SemiBold</option>
              <option value={700}>Bold</option>
              <option value={800}>Extra Bold</option>
              <option value={900}>Black</option>
            </select>
            <input
              type="text"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-[45%] bg-slate-50 px-2 my-2 py-1 rounded-md outline-slate-200 border border-slate-200"
              placeholder="Font Size"
            />
          </div>
        </div>
      )}
    </>
  );
};
