import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import Blog from "../Blog";


export default async function Search({ searchParams } : any) {


    const querySnapshot = await getDocs(collection(db, "blogs"));


    return <div className="blog-container-search">
        {querySnapshot.docs.map((doc) => {
            if (doc.data().title.includes(searchParams.keyword)) {
                return <Blog doc={doc} key={Number(doc.data().id)} />
            }
        })}
    </div>
}   