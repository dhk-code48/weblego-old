import React, { Fragment, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import { RxMargin, RxPadding } from "react-icons/rx";
import { updateStyle } from "../utils";
import { Popover, Transition } from "@headlessui/react";

const Spacing = () => {
  const { selected } = useContext(AppContext);

  const [ml, setMl] = useState("0px");
  const [mr, setMr] = useState("0px");
  const [mt, setMt] = useState("0px");
  const [mb, setMb] = useState("0px");
  const [pt, setPt] = useState("0px");
  const [pb, setPb] = useState("0px");
  const [pl, setPl] = useState("0px");
  const [pr, setPr] = useState("0px");

  useEffect(() => {
    setMl(selected?.styles?.marginLeft ?? "0px");
    setMr(selected?.styles?.marginRight ?? "0px");
    setMt(selected?.styles?.marginTop ?? "0px");
    setMb(selected?.styles?.marginBottom ?? "0px");
    setPt(selected?.styles?.paddingTop ?? "0px");
    setPb(selected?.styles?.paddingBottom ?? "0px");
    setPl(selected?.styles?.paddingLeft ?? "0px");
    setPr(selected?.styles?.paddingRight ?? "0px");
  }, [selected]);

  useEffect(() => {
    updateStyle(selected, {
      paddingLeft: pl ?? "0px",
      marginRight: mr ?? "0px",
      marginLeft: ml ?? "0px",
      paddingRight: pr ?? "0px",
      marginBottom: mb ?? "0px",
      paddingBottom: pb ?? "0px",
      marginTop: mt ?? "0px",
      paddingTop: pt ?? "0px",
    });

    // eslint-disable-next-line
  }, [pl, mr, ml, pr, mb, pb, mt, pt]);
  return (
    <div className="py-4 border-b border-gray-200">
      <p className="text-gray-600 font-semibold tracking-wide">Spacing in px</p>
      <div className="flex justify-between mt-3">
        <Popover className="relative z-50">
          {({ open }) => (
            <>
              <Popover.Button
                className={`hover:bg-gray-100 ${
                  open && "bg-gray-100"
                } group px-3 py-2 inline-flex items-center outline-none rounded-lg`}
              >
                <RxMargin />
                <p className="text-gray-600 font-medium tracking-wide ml-3">
                  Margin
                </p>
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
                  <p className="text-gray-800 font-semibold">Margins</p>
                  <p className="text-sm font-medium text-gray-800">
                    Set margin to your element
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="flex-1 text-sm font-medium text-gray-800">
                      Top :
                    </p>
                    <input
                      className="focus:shadow-blue-100 focus:shadow-md focus:border-blue-200 text-slate-800 flex-1 bg-slate-100 border border-slate-200 pl-3 py-1 rounded bg-transparent outline-none w-full"
                      value={mt}
                      onChange={(e) => setMt(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="flex-1 text-sm font-medium text-gray-800">
                      Right :
                    </p>
                    <input
                      className="focus:shadow-blue-100 focus:shadow-md focus:border-blue-200 text-slate-800 flex-1 bg-slate-100 border border-slate-200 pl-3 py-1 rounded bg-transparent outline-none w-full"
                      value={mr}
                      onChange={(e) => setMr(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="flex-1 text-sm font-medium text-gray-800">
                      Bottom :
                    </p>
                    <input
                      className="focus:shadow-blue-100 focus:shadow-md focus:border-blue-200 text-slate-800 flex-1 bg-slate-100 border border-slate-200 pl-3 py-1 rounded bg-transparent outline-none w-full"
                      value={mb}
                      onChange={(e) => setMb(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="flex-1 text-sm font-medium text-gray-800">
                      Left :
                    </p>
                    <input
                      className="text-slate-800 flex-1 bg-slate-100 border border-slate-200 pl-3 py-1 rounded bg-transparent outline-none w-full"
                      value={ml}
                      onChange={(e) => setMl(e.target.value)}
                    />
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative z-50">
          {({ open }) => (
            <>
              <Popover.Button
                className={`hover:bg-gray-100 ${
                  open && "bg-gray-100"
                } group px-3 py-2 inline-flex items-center outline-none rounded-lg`}
              >
                <RxPadding />
                <p className="text-gray-600 font-medium tracking-wide ml-3">
                  Padding
                </p>
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
                  <p className="text-gray-800 font-semibold">Paddings</p>
                  <p className="text-sm font-medium text-gray-800">
                    Set padding to your element
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="flex-1 text-sm font-medium text-gray-800">
                      Top :
                    </p>
                    <input
                      className="focus:shadow-blue-100 focus:shadow-md focus:border-blue-200 text-slate-800 flex-1 bg-slate-100 border border-slate-200 pl-3 py-1 rounded bg-transparent outline-none w-full"
                      value={pt}
                      onChange={(e) => setPt(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="flex-1 text-sm font-medium text-gray-800">
                      Right :
                    </p>
                    <input
                      className="focus:shadow-blue-100 focus:shadow-md focus:border-blue-200 text-slate-800 flex-1 bg-slate-100 border border-slate-200 pl-3 py-1 rounded bg-transparent outline-none w-full"
                      value={pr}
                      onChange={(e) => setPr(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="flex-1 text-sm font-medium text-gray-800">
                      Bottom :
                    </p>
                    <input
                      className="focus:shadow-blue-100 focus:shadow-md focus:border-blue-200 text-slate-800 flex-1 bg-slate-100 border border-slate-200 pl-3 py-1 rounded bg-transparent outline-none w-full"
                      value={pb}
                      onChange={(e) => setPb(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="flex-1 text-sm font-medium text-gray-800">
                      Left :
                    </p>
                    <input
                      className="text-slate-800 flex-1 bg-slate-100 border border-slate-200 pl-3 py-1 rounded bg-transparent outline-none w-full"
                      value={pl}
                      onChange={(e) => setPl(e.target.value)}
                    />
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>

      {/* <div className="w-full p-2 h-[200px] border border-dashed border-gray-600 rounded-xl my-3 bg-orange-50 overflow-hidden flex flex-col justify-between items-center">
        <div className="flex w-full justify-between flex-1 my-2">
          <div className="p-2 flex-1 mx-3 bg-blue-50 rounded-xl border-gray-600 border border-dashed overflow-hidden flex flex-col justify-between items-center">
            <input
              className="text-center rounded bg-transparent outline-none"
              value={pt}
              onChange={(e) => setPt(e.target.value)}
            />
            <div className="flex w-full justify-between">
              <input
                className="text-center rounded bg-transparent h-6 self-center outline-none w-7"
                value={pl}
                onChange={(e) => setPl(e.target.value)}
              />
              <div className="h-[20px] w-[40%] bg-gray-600 rounded"></div>
              <input
                className="text-center rounded bg-transparent h-6 self-center outline-none w-7"
                value={pr}
                onChange={(e) => setPr(e.target.value)}
              />
            </div>
            <div>
              <input
                className="text-center rounded bg-transparent outline-none"
                value={pb}
                onChange={(e) => setPb(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Spacing;
