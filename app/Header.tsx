"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Header() {

    const [keyword, setKeyword] = useState<string>();
    const router = useRouter();


    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.push(`/search?keyword=${keyword}`)
        setKeyword("");
    }

    return (
        <header className="header">
            <Link href="/" className="header__title">Blog Website</Link>
            <form onSubmit={handleSubmit} className="header__search">
                <input 
                    onChange={(e) => setKeyword(e.target.value)}
                    type="text" 
                    value={keyword}
                    placeholder="Search Blogs.." 
                    className="header__search-input" />

                <button
                    type="submit" 
                    className="header__search-btn"
                >Search</button>
            </form>
            <Link className="header__link" href="/create">Create</Link>
        </header>
    );
}