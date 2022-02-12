import React, { useEffect} from 'react'
import "./Header.css"

export default function Header(props: any) {
    const { data, onTextChange, inputRef, onOptionSelect, option } = props;

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 300);
    }, []);

    return (
        <div className="header">
                <h2>Favorite Characters</h2>
                <p>In the Rick and Morty Universe</p>     
            <form>
               <input 
                    type="search" 
                    onChange={onTextChange}
                    className="form-control"
                    placeholder="Character name..."
                    ref={inputRef}
                />
                <div className="position-relative">
                    <select className="form-control"  defaultValue="" onChange={onOptionSelect(option)}>
                        <option disabled={true} hidden value="" >All Locations</option>
                        <optgroup className="select-group" >
                            <option disabled={true} value="">Choose a Location</option>
                            {
                                data?.characters?.results.map((item: any, key: number) => (
                                        <option key={key}>{item.location.name}</option>
                                    )
                                )
                            }
                        </optgroup>
                    </select>
                    <i className="fa fa-chevron-down"></i>
                </div>
            </form>
            </div>
    )
}