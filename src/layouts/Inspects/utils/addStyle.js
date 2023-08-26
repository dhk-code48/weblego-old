import { ref, update } from "firebase/database";
import { db } from "../../../db/config";

export default function handleCssAddition(selected, css) {
  const updates = {};
  updates[selected.path + "/styles"] = {
    ...selected?.styles,
    ...css,
  };

  return update(ref(db), updates);
}
