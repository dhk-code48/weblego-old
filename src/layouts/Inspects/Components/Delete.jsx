import { AppContext } from "../../../context";
import { handleDelete } from "../utils";
import React, { useContext } from "react";

const Delete = () => {
  const { selected, setSelected } = useContext(AppContext);

  return (
    <div className="py-4 border-b border-gray-200 items-center flex justify-between">
      <h5 className="font-semibold text-sm text-gray-800">Remove Element</h5>
      <button
        onClick={() => {
          handleDelete(selected);
        }}
        className="font-semibold text-sm text-red-500 bg-red-200 px-2 py-1 rounded-lg"
      >
        Delete
      </button>
    </div>
  );
};

export default Delete;
