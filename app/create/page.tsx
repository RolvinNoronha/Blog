"use client"

import { useState } from "react";
import { storage, db } from "../../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";


export default function Create() {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [img, setImg] = useState<Blob>();
    const router = useRouter();

    const storageRef = ref(storage);
    
    
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setImg(e.target.files[0]);
    }
    
    const handleSubmit : React.FormEventHandler<HTMLFormElement> = async (e)  => {
        e.preventDefault();
        
        const docRef = await addDoc(collection(db, "blogs"), {
            title: title,
            content: content,
            timestamp: serverTimestamp(),
        });
        

        const imgRef = ref(storageRef, `images/${docRef.id}/image`);

        //@ts-ignore
        uploadBytes(imgRef, img).then(async (snapshot) => { 
            getDownloadURL(snapshot.ref).then( async (downloadURL) => {
                await updateDoc(doc(db, "blogs", docRef.id), {
                    image: downloadURL
                }) 
            });
        });
        
        router.push("/");
    }

    return <form className="bloginput" onSubmit={handleSubmit}>
        <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bloginput__title" 
            type="text" 
            placeholder="Title" 
        />

        <input
            accept="image/*"
            onChange={handleChange}
            className="bloginput__image" 
            type="file" 
        />

        <textarea
            placeholder="Content"
            value={content}
            className="bloginput__content"
            onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button 
            type="submit"
            disabled={!title || !content || !img}
            className="bloginput__submit"
        >Submit</button>
    </form>
}

