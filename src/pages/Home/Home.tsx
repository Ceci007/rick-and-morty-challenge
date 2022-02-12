import { useState, useRef, FormEvent } from 'react'
import { useQuery } from "@apollo/client";
import CHARACTERS from '../../types.graphql';
import Header from '../../components/Header/Header';
import "./Home.css"

export default function Home() {
    const { data } = useQuery(CHARACTERS)
    const [characters, setCharacters] = useState([])
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [option, setOption] = useState<string>("")
    const [tabActive, setTabActive] = useState(true);
    // const [loading, setLoading] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const onTextChange = (event: FormEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setSearchQuery(newValue);
       // console.log(data.characters.results[0].name);
       // console.log(data?.location?.name);
    } 

    const onOptionSelect = (value: string) => () => {
        setOption(value);
      }

    return (
        <>
            <Header 
                data={data} 
                onTextChange={onTextChange} 
                inputRef={inputRef} 
                onOptionSelect={onOptionSelect(option)} 
                option={option}
            />
            <div>
                <div className="tabs">
                    <button onClick={() => setTabActive(!tabActive)} className={tabActive ? "tab tab-active" : "tab"} >List</button>
                    <button onClick={() => setTabActive(!tabActive)} className={tabActive ? "tab" : "tab tab-active"} >Favorites</button>
                </div>
            <div>
            {tabActive ?
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
                </ul> :
                <div className='favorites-list'>
                    <p>
                        No favorites selected
                    </p>
                </div>
                }
            </div>
        </div>
        </> 
    )
}