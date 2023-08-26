import { EditerHeader, Inspect, Sidebar, WebView } from "../layouts";
import { Error } from ".";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../db/config";
import { useObject } from "react-firebase-hooks/database";
import { ref } from "firebase/database";

const Editor = () => {
  const { uid, id, page } = useParams();
  const [snapshot, loading, error] = useObject(
    ref(db, "/Websites/" + id + "/pages/" + page)
  );

  const webViewRef = useRef(null);

  useEffect(() => {
    if (snapshot) {
      console.log("WHAt", snapshot.val());
      console.log("/Websites/" + id + "/" + page);
    }
  }, [snapshot]);

  useEffect(() => {
    if (webViewRef.current) {
      const webViewElement = webViewRef.current;
      webViewElement.style.width = "1920px";
      webViewElement.style.height = "1080px";
      webViewElement.style.transformOrigin = "top left";
      webViewElement.style.transform = `scale(${
        webViewElement.offsetWidth / webViewElement.clientWidth
      })`;
    }
  }, [snapshot]);

  return (
    <div>
      <EditerHeader id={id} page={page} />
      <div className="bg-slate-50 overflow-hidden h-[calc(100vh-80px)] flex justify-between">
        {error && <Error />}
        {loading && <span>Value: Loading...</span>}
        {snapshot && (
          <>
            <Sidebar id={id} page={page} website={snapshot.val()} />

            <div className="flex-1 flex">
              <div
                // ref={webViewRef}
                className="flex-1 flex justify-center items-center overflow-auto"
              >
                <WebView id={id} page={page} website={snapshot.val()} />
              </div>
            </div>

            <Inspect website={snapshot.val()} />
          </>
        )}
      </div>
    </div>
  );
};

export default Editor;
