import React, { useContext, useEffect, useState } from "react";
import defaultComps from "../utils/defautlComps";
import { AppContext } from "../../../context";

import { db } from "../../../db/config";
import { child, push, ref, update } from "firebase/database";

const Add = () => {
  const { selected } = useContext(AppContext);
  const [index, setIndex] = useState(selected?.children?.length ?? 0);
  useEffect(() => {
    setIndex(selected?.children?.length ?? 0);
    console.log("index", index);
  }, [selected]);

  function handleAdd(element) {
    const newPostKey = push(child(ref(db), `${selected.path}/children`)).key;

    console.log("lol", index);

    return update(ref(db, `${selected.path}/children/${index}`), {
      ...element,
      id: newPostKey,
      path: selected.path + "/children/" + index,
    });
  }
  return (
    <div className="mx-3 w-full">
      <p className="text-slate-600 font-medium my-5">Add</p>
      <div className="flex flex-col justify-center">
        {defaultComps.map((element) => {
          const TagName = element.properties.tag;
          return (
            <div
              key={element.label}
              className="py-3 px-4 border m-3 border-gray-100 shadow-sm cursor-pointer text-center"
              onClick={() => handleAdd(element.properties)}
            >
              {element.properties.tag === "img" ? (
                <TagName
                  src={element.properties.attributes.src}
                  style={{
                    ...element.properties.styles,
                  }}
                  {...element.attributes}
                />
              ) : (
                <TagName
                  style={{
                    ...element.properties.styles,
                  }}
                  {...element.attributes}
                >
                  {!element?.attributes?.scr && element.label}
                </TagName>
              )}
              <p className="text-slate-600 font-medium text-center border-t border-gray-200  mt-2">
                {element.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Add;
