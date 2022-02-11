import { useState, useRef, FormEvent } from 'react'
import { useQuery } from "@apollo/client";
import CHARACTERS from '../types';
import "./Header.css"

export default function Header() {
    const [characters, setCharacters] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [option, setOption] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { data } = useQuery(CHARACTERS);

    const onTextChange = (event: FormEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setSearchQuery(newValue);
        console.log(data.characters.results[0].name);
        console.log(data?.characters?.location);
    } 

    const onOptionSelect = (value: string) => () => {
        setOption(value);
      }

    return (
        <div className="header">
                <h2>Favorite Characters</h2>
                <p>In the Rick and Morty Universe</p>     
            <form>
               <input 
                    type="text" 
                    onChange={onTextChange}
                    className="form-control"
                    placeholder="Character name..."
                />
                <select className="form-control" defaultValue={option} onChange={onOptionSelect(option)}>
                    {
                        
                    }
                </select>
            </form>
            <div>
                <ul>
                    { data?.characters?.results
                    .filter((item : any) => {
                        if(searchQuery === "") {
                            return item?.name;
                        } else if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                            return item?.name;
                        }
                    })
                    .map((item: any, key: number) => (
                        <div>
                            <li key={key}>{item.name}</li>
                        </div>
                        )
                    )}
                </ul>
            </div>
        </div>
    )
}