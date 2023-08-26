import React, { Fragment, useState, useEffect, useContext } from "react";
import { updateStyle } from "../utils";
import { AppContext } from "../../../context";
import { MdAdd } from "react-icons/md";
import { Popover, Transition } from "@headlessui/react";
import { BiSun } from "react-icons/bi";

const Effects = () => {
  const { selected } = useContext(AppContext);

  const [effectType, setEffectType] = useState(
    selected?.styles?.boxShadow?.split(" ")[0] === "inset" ? "inset" : "drop"
  );

  const [x, setX] = useState(selected?.styles?.boxShadow?.split(" ")[1] ?? 0);
  const [y, setY] = useState(selected?.styles?.boxShadow?.split(" ")[2] ?? 0);
  const [blur, setBlur] = useState(
    selected?.styles?.boxShadow?.split(" ")[3] ?? 0
  );
  const [spread, setSpread] = useState(
    selected?.styles?.boxShadow?.split(" ")[4] ?? 0
  );
  const [color, setColor] = useState(
    selected?.styles?.boxShadow?.split(" ")[5] ?? ""
  );

  useEffect(() => {
    setEffectType(
      selected?.styles?.boxShadow?.split(" ")[0] === "inset" ? "inset" : "drop"
    );
    setX(selected?.styles?.boxShadow?.split(" ")[1] ?? 0);
    setY(selected?.styles?.boxShadow?.split(" ")[2] ?? 0);
    setBlur(selected?.styles?.boxShadow?.split(" ")[3] ?? 0);
    setSpread(selected?.styles?.boxShadow?.split(" ")[4] ?? 0);
    setColor(selected?.styles?.boxShadow?.split(" ")[5] ?? "");
  }, [selected]);

  useEffect(() => {
    updateStyle(selected, {
      boxShadow: `${effectType === "inset" ? effectType : ""} ${x ?? 0} ${
        y ?? 0
      } ${blur ?? 0} ${spread ?? 0} ${color}`,
    });
  }, [effectType, x, y, blur, spread, color]);

  return (
    <div className="py-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <p className="text-gray-700 font-medium tracking-wide">Effects</p>
        <MdAdd
          className="text-gray-700 cursor-pointer"
          size={19}
          onClick={() =>
            updateStyle(selected, {
              boxShadow: "2px 5px 10px 2px rgba(0,0,0,0.4)",
            })
          }
        />
      </div>
      {selected?.styles?.boxShadow && (
        <>
          <div className="flex justify-between items-center">
            <Popover className="z-50">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`hover:bg-gray-100 ${
                      open && "bg-gray-100"
                    } group px-3 py-2 inline-flex items-center outline-none rounded-lg`}
                  >
                    <BiSun />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="overflow-hidden z-50 fixed right-[300px] bottom-10 mt-3 w-56 px-4 py-2 bg-white rounded border-2 border-gray-200">
                      <p className="text-gray-800 font-semibold">Shadow</p>
                      <p className="text-sm font-medium text-gray-800">
                        Add shadow to your element
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="flex-1 text-sm font-medium text-gray-800">
                          X :
                        </p>
                        <input
                          className="focus:shadow-blue-100 focus:shadow-md focus:border-blue-200 text-slate-800 flex-1 bg-slate-100 border border-slate-200 pl-3 py-1 rounded bg-transparent outline-none w-full"
                          value={x}
                          onChange={(e) => setX(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="flex-1 text-sm font-medium text-gray-800">
                          Y :
                        </p>
                        <input
                          className="focus:shadow-blue-100 focus:shadow-md focus:border-blue-200 text-slate-800 flex-1 bg-slate-100 border border-slate-200 pl-3 py-1 rounded bg-transparent outline-none w-full"
                          value={y}
                          onChange={(e) => setY(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="flex-1 text-sm font-medium text-gray-800">
                          Blur :
                        </p>
                        <input
                          className="focus:shadow-blue-100 focus:shadow-md focus:border-blue-200 text-slate-800 flex-1 bg-slate-100 border border-slate-200 pl-3 py-1 rounded bg-transparent outline-none w-full"
                          value={blur}
                          onChange={(e) => setBlur(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="flex-1 text-sm font-medium text-gray-800">
                          Spread :
                        </p>
                        <input
                          className="text-slate-800 flex-1 bg-slate-100 border border-slate-200 pl-3 py-1 rounded bg-transparent outline-none w-full"
                          value={spread}
                          onChange={(e) => setSpread(e.target.value)}
                        />
                      </div>

                      <div className="flex items-center border rounded-lg px-1 border-gray-400 w-[50%]">
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
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <select
              value={effectType}
              onChange={(e) => setEffectType(e.target.value)}
              className="w-[45%] bg-slate-50 px-2 my-2 py-1 rounded-md outline-slate-200 border border-slate-200"
            >
              <option value={"drop"}>Drop</option>
              <option value={"inset"}>Inner</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default Effects;
