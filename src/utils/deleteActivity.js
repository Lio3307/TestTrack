import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const DeleteActivity = async (idActivity, idUSer) => {
  const confirmDelete = confirm("Are you sure want to delete this?");
  if (!confirmDelete) return;
  try {
    const activityRef = doc(db, "Users", idUSer, "Activity", idActivity);
    const snapActivity = await getDoc(activityRef);
    if (snapActivity.exists()) {
      deleteDoc(activityRef);
    }
  } catch (err) {
    console.error(err);
  } 
};
