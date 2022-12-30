import { doc, getDoc } from "firebase/firestore"
import { db } from "../../Firebase"



export default async function Blog({ params } : any) {

    const ref = doc(db, "blogs", params.blog);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {

        return <div className="singleblog">
            <h1 className="singleblog__title" >{docSnap.data().title}</h1>
            <img className="singleblog__img" src={docSnap.data().image} alt="image" />
            <p className="singleblog__content">{docSnap.data().content}</p>
        </div>
    }
    else {
        return <div>
            <h1>No blog found.</h1>
        </div>
    }
}