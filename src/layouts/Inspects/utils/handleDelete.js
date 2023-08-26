import { ref, remove } from "firebase/database";
import { db } from "../../../db/config";

export default function handleDelete(selected) {
  const res = window.confirm("Do you really want to deleted ?");
  if (res) {
    remove(ref(db, `${selected.path}`));
  }
}
