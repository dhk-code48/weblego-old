import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { IoIosAddCircleOutline } from "react-icons/io";
import { child, push, ref, set, update } from "firebase/database";
import { db } from "../db/config";

const WebView = ({ id, page, website }) => {
  const { selected, setSelected } = useContext(AppContext);

  function handleAddSection() {
    const sectionsRef = ref(
      db,
      "/Websites/" +
        id +
        "/pages/" +
        page +
        "/sections/" +
        website.sections.length
    );
    const newSection = push(
      ref(db, "/Websites/" + id + "/pages/" + page + "/sections/")
    );
    update(sectionsRef, {
      path:
        "/Websites/" +
        id +
        "/pages/" +
        page +
        "/sections/" +
        website.sections.length,
      tag: "div",
      content: "Add Element to this new section",
      id: newSection.key,
      sectionName: "New Section",
      styles: {
        background: "inherit",
      },
    });
  }

  const Element = ({ element, path, index }) => {
    const { id, tag, styles, attributes } = element;

    const TagName = tag;

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
      setIsSelected(selected?.id === id);
    }, [id, selected]);

    useEffect(() => {
      if (isSelected) {
        setSelected(element);
      }
    }, [element]);

    const nodePath = path !== null ? `${path}/children/${index}` : `${index}`;

    useEffect(() => {
      set(
        ref(
          db,
          "/Websites/" +
            id +
            "/pages/" +
            page +
            "/sections/" +
            nodePath +
            "/path"
        ),
        "/Websites/" + id + "/pages/" + page + "/sections/" + nodePath
      );
    }, [nodePath]);

    return (
      <>
        {tag === "img" ? (
          <img style={styles} {...attributes} />
        ) : (
          <TagName
            style={{
              ...element.styles,
              outline: isSelected ? "3px solid #0096c7" : "none",
              cursor: "pointer",
            }}
            {...attributes}
          >
            {typeof element.children === "object"
              ? element.children.map((child, index) => (
                  <Element
                    key={child.id}
                    element={child}
                    index={index}
                    path={nodePath}
                  />
                ))
              : element.content}
          </TagName>
        )}
      </>
    );
  };

  return (
    <div className="group select-none flex-1 w-full bg-white h-full">
      {website.sections.map((element, index) => (
        <Element
          key={element.id + index}
          element={element}
          path={null}
          index={index}
        />
      ))}

      <div
        onClick={() => handleAddSection()}
        className="group-hover:flex justify-center items-center cursor-pointer p-5 hidden border-2 border-purple-300 border-dashed m-3 rounded-xl"
      >
        <IoIosAddCircleOutline size={30} className="text-purple-300" />
      </div>
    </div>
  );
};

export default WebView;
