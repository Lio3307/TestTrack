import { collection, getDocs, serverTimestamp } from "firebase/firestore"
import { auth, db } from "../firebase/config"
import { useAuthContext } from "../contexts/AuthContext"


export const AddAct = () => {

    const {loading, setLoading} = useAuthContext()
    const []

    const addActivityHanlder = async () => {
        try {
            setLoading(true)
            const user = auth.currentUser
            const subCollection = collection(db, "Users", user.uid, "Activity")
            await addDoc(subCollection, {
                titleActivity: ,
                textActivity: ,
                userId: user.uid,
                createdAt: serverTimestamp()

            })
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <label>Create Title</label>
            <input type="text" />
        </>
    )
}