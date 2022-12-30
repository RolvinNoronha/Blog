
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../Firebase";
import Blog from "./Blog";

export default async function Home() {

    const q = query(collection(db, "blogs"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    
    

    return <div className="blog-container">
        {querySnapshot.docs.map((doc) => {
            return <Blog doc={doc} key={Number(doc.data().id)} />
        })}
    </div>

}   