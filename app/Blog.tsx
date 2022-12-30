
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";



type Props = {
    doc: QueryDocumentSnapshot<DocumentData>; 
    key: any; 
}

export default function Blog({ doc } : Props) {

    const router = useRouter();

    return (
        <div className="blog">
            <img className="blog__img" src={doc.data().image} alt="image" />
            <Link href={`/${doc.id}`} className="blog__title">{doc.data().title}</Link>
            <p className="blog__content">{doc.data().content.substring(0, 100) + "..."}</p>
        </div>
    );
}

