import { db } from "../../../db/config";
import { ref, set } from "firebase/database";

const updateStyle = (selected, style) => {
  if (selected?.path) {
    typeof style === "object" &&
      Object.keys(style).map((key) => {
        set(ref(db, selected.path + "/styles/" + key), style[key]);
      });
  }
};

export default updateStyle;
