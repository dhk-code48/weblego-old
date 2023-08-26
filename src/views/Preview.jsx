import { WebView } from "../layouts";
import { Error } from ".";
import { useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../db/config";
import { useObject } from "react-firebase-hooks/database";
import { onValue, ref } from "firebase/database";

const Preivew = () => {
  const location = useLocation();

  const [pathParams, setParams] = useState({});

  useEffect(() => {
    if (location.search) {
      location.search.split("?").map((query) => {
        const search = query.split("=");
        if (search[1] !== undefined && search[0] !== "") {
          setParams((prev) => ({
            ...prev,
            [search[0]]: search[1],
          }));
        }
      });
    }
  }, []);
  // useEffect(() => {
  //   console.log(pathParams);
  // }, [pathParams]);
  const { id, page } = useParams();
  const [snapshot, loading, error] = useObject(
    ref(db, "/Websites/" + id + "/pages/" + page)
  );

  const Element = ({ element }) => {
    const {
      tag,
      styles,
      attributes,
      children,
      content: content_from_db,
    } = element;

    const [from_db, setFromDb] = useState(attributes?.src ?? content_from_db);

    useEffect(() => {
      setFromDb(attributes?.src ?? content_from_db);
    }, [attributes, content_from_db]);

    const [content, setContent] = useState("");

    useEffect(() => {
      console.log(from_db);
      if (typeof from_db === "string") {
        const regex = /:(.*?)(?=\/|$)/g;
        const matches = from_db.match(regex);
        const extractedText = matches
          ? matches.map((match) => match.substring(1))
          : [];

        extractedText.length > 0
          ? extractedText.map((text) => {
              setContent(from_db.replace(":" + text, pathParams[text]));
            })
          : setContent(from_db);
      }
    }, [from_db]);
    useEffect(() => {
      console.log("CONTENT = > ", content);
    }, [content]);

    useEffect(() => {
      const baseRef = "/Websites/websiteId1/db/";
      const regex = /\${(.*?)}/g;
      const matches = content.match(regex);
      const dbPaths = matches
        ? matches.map((match) => match.substring(2, match.length - 1))
        : [];
      dbPaths.map((path) => {
        if (path) {
          onValue(ref(db, baseRef + path), (snapshot) => {
            if (snapshot.exists && snapshot.val()) {
              setContent(content.replace("${" + path + "}", snapshot.val()));
            }
          });
        } else {
          setContent(from_db);
        }
      });
    }, [content]);

    // useEffect(() => {
    //   if (content_from_db) {
    // const regex = /\${(.*?)}/g;
    // const matches = content_from_db.match(regex);
    // const dbPaths = matches
    //   ? matches.map((match) => match.substring(2, match.length - 1))
    //   : [];

    //     dbPaths.map((path) => {
    //       const url_regex = /:(.*?)(?=\/|$)/g;
    //       const url_matches = path.match(url_regex);
    //       const extractedText = url_matches
    //         ? url_matches.map((match) => match.substring(1))
    //         : [];
    //       console.log("Extracted TExt", extractedText);
    //       extractedText?.map((text) => {
    //         path.replace(":" + text, pathParams[text]);
    //         console.log("Path === ", path);
    //       });
    //     });
    //   }
    // }, [content_from_db]);

    const TagName = tag;
    return (
      <>
        {tag === "img" ? (
          <img style={styles} {...attributes} src={content} />
        ) : (
          <TagName style={styles} {...attributes}>
            {typeof children === "object"
              ? children.map((child, index) => (
                  <Element key={child.id} element={child} index={index} />
                ))
              : content}
          </TagName>
        )}
      </>
    );
  };

  return (
    <>
      {error && <Error />}
      {loading && <span>Value: Loading...</span>}
      {snapshot && (
        <>
          {snapshot.val().sections.map((element, index) => (
            <Element key={element.id + index} element={element} />
          ))}
        </>
      )}
    </>
  );
};

export default Preivew;
/*
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
    return update(sectionsRef, {
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
 */
