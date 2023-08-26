import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../db/config";
import { useObject } from "react-firebase-hooks/database";
import { child, push, ref, update } from "firebase/database";
import Error from "./Error";
import { MdAdd } from "react-icons/md";

export default function Website() {
  const { uid, id } = useParams();
  const [snapshot, loading, error] = useObject(ref(db, "/Websites/" + id));
  const navigate = useNavigate();
  console.log(id);
  function handleAddPage() {
    const newPageKey = push(child(ref(db), "/Websites/" + id + "/pages/")).key;
    // console.log("lol", index);
    update(ref(db, "/Websites/" + id + "/pages/" + newPageKey), {
      id: newPageKey,
      pageName: "NewPage",
      sections: [
        {
          sectionName: "NewPage NewSections",
          tag: "div",
          content: "NewPage NewSections",
          id: newPageKey,
          path: "/Websites/" + id + "/pages/" + newPageKey + "/sections/0",
        },
      ],
    });
  }

  return (
    <div className="min-h-screen bg-white">
      {error && <Error />}
      {loading && <span>Value: Loading...</span>}
      {snapshot && (
        <>
          <div className="h-16 flex justify-between items-center w-screen px-20">
            <h3 className="text-lg font-semibold tracking-wide text-gray-800">
              {snapshot.val().websiteName}
            </h3>
            <button
              onClick={() => handleAddPage()}
              className="flex items-center px-5 py-1 bg-blue-500 text-white rounded-lg font-semibold"
            >
              Add Page <MdAdd className="ml-3" size={21} />
            </button>
          </div>
          <div className="flex items-center">
            {Object.keys(snapshot.val().pages).map((page) => {
              console.log("Page", page);
              return (
                <div
                  className="px-10 py-3 border border-gray-200 rounded-lg shadow-md m-10 cursor-pointer"
                  onClick={() =>
                    navigate("/editor/" + uid + "/" + id + "/" + page)
                  }
                >
                  <h1 key={page}>{snapshot.val().pages[page].pageName}</h1>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
