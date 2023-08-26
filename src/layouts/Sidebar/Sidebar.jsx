import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { RxComponent1, RxLayers } from "react-icons/rx";
import { TbDatabase, TbPaint } from "react-icons/tb";
import SidebarSection from "./components/SidebarSection";
import Add from "./components/Add";

const Sidebar = ({ website, id, page }) => {
  const [sideBarState, setSideBarState] = useState("section");
  return (
    <div className="overflow-x-hidden bg-white h-full max-w-[300px] border-r border-gray-200 mt-0 flex overflow-y-scroll scrollbar-hide">
      <div className="w-[65px] h-full border-r border-gray-200 text-2xl pt-5">
        <RxLayers
          className="w-full cursor-pointer mb-10"
          onClick={() => setSideBarState("section")}
        />
        <AiOutlinePlus
          className="w-full cursor-pointer my-10"
          onClick={() => setSideBarState("add")}
        />
        <RxComponent1
          className="w-full cursor-pointer my-10"
          onClick={() => setSideBarState("component")}
        />
        <TbPaint
          className="w-full cursor-pointer my-10"
          onClick={() => setSideBarState("theme")}
        />
        <TbDatabase
          className="w-full cursor-pointer my-10"
          onClick={() => setSideBarState("database")}
        />
        <FiSettings
          className="w-full cursor-pointer my-10"
          onClick={() => setSideBarState("settings")}
        />
      </div>
      {sideBarState === "section" ? (
        <SidebarSection id={id} page={page} website={website.sections} />
      ) : (
        ""
      )}
      {sideBarState === "add" ? <Add website={website.sections} /> : ""}
    </div>
  );
};

export default Sidebar;
