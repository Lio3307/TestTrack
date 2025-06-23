import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const UpdateActivity = async (userId, idActivity, newData) => {
  try {
    const docRef = doc(db, "Users", userId, "Activity", idActivity);
    await updateDoc(docRef, newData);
  } catch (err) {
    console.error(err);
  } finally {
    alert("Successfuly Update!!");
  }
};
