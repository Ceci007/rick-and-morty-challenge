import { useState, useRef, FormEvent } from 'react'
import { useQuery } from "@apollo/client";
import CHARACTERS from '../types';
import "./Header.css"

export default function Header() {
    const [characters, setCharacters] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { data } = useQuery(CHARACTERS);

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setSearchQuery(newValue);
        console.log(data);
    } 

    return (
        <div className="header">
                <h2>Favorite Characters</h2>
                <p>In the Rick and Morty Universe</p>
                
            <form>
               <input 
                    type="text" 
                    onChange={handleChange}
                />
            </form>
            <div>
            </div>
        </div>
    )
}