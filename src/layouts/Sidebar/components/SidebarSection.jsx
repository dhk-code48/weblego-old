import React, { useContext, useEffect, useState } from "react";
import { MdDragHandle, MdGrid3X3, MdOutlineSegment } from "react-icons/md";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { AppContext } from "../../../context";
import SortableTree from "react-sortable-tree";

import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";

import { ref, set } from "firebase/database";
import { db } from "../../../db/config";

const SidebarSection = ({ website, id, page }) => {
  // console.log("website", website);
  const [tree, setTree] = useState(website);
  useEffect(() => {
    setTree(website);
  }, [website]);

  const onTreeChange = (newTree) => {
    setTree(newTree);
    console.log(
      "newTree ",
      "/Websites/" + id + "/pages/" + page + "/sections/"
    );
    set(ref(db, "/Websites/" + id + "/pages/" + page + "/sections/"), newTree);
  };
  const { selected, setSelected } = useContext(AppContext);

  const [editing, setEditing] = useState({
    state: false,
    sectionName: null,
    nodeId: "",
  });

  function updateSectionName(node, sectionName) {
    set(ref(db, node.path + "/sectionName/"), sectionName);
    setSelected(node);
  }

  return (
    <div className="mx-3 w-full relative">
      <p className="text-slate-600 font-medium my-5">Body</p>
      <div>
        {website !== undefined && (
          <SortableTree
            getNodeKey={({ node }) => node.id}
            theme={FileExplorerTheme}
            onDragStateChanged={(node) => console.log("Drage Stae", node)}
            onMoveNode={(node) => console.log("Moved", node)}
            treeData={tree}
            onChange={onTreeChange}
            isVirtualized={false}
            generateNodeProps={({ node }) => ({
              title: (
                <div
                  className="items-center h-full whitespace-nowrap font-medium text-gray-900 "
                  onClick={() =>
                    selected?.id === node.id ? setSelected() : setSelected(node)
                  }
                  onDoubleClick={() =>
                    setEditing({
                      state: true,
                      nodeId: node.id,
                      sectionName: node.sectionName,
                    })
                  }
                >
                  {node.id === editing.nodeId ? (
                    <input
                      className="bg-blue-50 p-1 outline-blue-100"
                      value={editing.sectionName}
                      onBlur={() => {
                        setEditing({ nodeId: "", sectionName: "" });
                        updateSectionName(node, editing.sectionName);
                      }}
                      onKeyDown={(key) => {
                        key.key === "Enter" &&
                          setEditing({ nodeId: "", sectionName: "" });
                        key.key === "Enter" &&
                          updateSectionName(node, editing.sectionName);
                      }}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          sectionName: e.target.value,
                        }))
                      }
                      autoFocus
                      disabled={editing.nodeId !== node.id}
                    />
                  ) : (
                    node.sectionName
                  )}
                </div>
              ),
            })}
          />
        )}
      </div>
    </div>
  );
};

export default SidebarSection;
