import { useState, useRef, FormEvent } from 'react'
import { useQuery } from "@apollo/client";
import CHARACTERS from '../types';
import "./Home.css"

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
       // console.log(data.characters.results[0].name);
        console.log(data?.location?.name);
    } 

    const onOptionSelect = (value: string) => () => {
        setOption(value);
      }

    return (
        <>
            <div className="header">
                <h2>Favorite Characters</h2>
                <p>In the Rick and Morty Universe</p>     
            <form>
               <input 
                    type="search" 
                    onChange={onTextChange}
                    className="form-control"
                    placeholder="Character name..."
                />
                <div className="position-relative">
                    <select className="form-control"  defaultValue="" onChange={onOptionSelect(option)}>
                        <option disabled={true} hidden value="" >All Locations</option>
                        <option disabled={true} value="">Choose a Location</option>
                        {
                            [1, 2, 3, 4, 5, 6].map((item, key) => (
                                    <option key={key}>{data?.location?.name}</option>
                                )
                            )
                        }
                    </select>
                    <i className="fa fa-chevron-down"></i>
                </div>
            </form>
            </div>
            <div>
            <div className="tabs">
                <button className="tab tab-active">List</button>
                <button className="tab">Favorites</button>
            </div>
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
                        <li className="character-container" key={key}>
                            <div className={`photo photo-${item.status}`} >
                                <img src={item.image} />
                            </div>
                            <div className="character-content">
                                <h6>{item.name}</h6>
                                <span className={`status color-${item.status}`}>{item.status}</span>
                            </div>
                        </li>
                        )
                    )}
                </ul>
            </div>
        </div>
        </> 
    )
}