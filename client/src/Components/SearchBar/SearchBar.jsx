import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions/index";
import "./SearchBar.css";

export default function SearchBar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!name){
            return alert('Type something')
        }else{
            dispatch(getDogs(name))
            setName('')
        }
    }

    return (
        <div className="containerSearch">
            <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                    type="text"
                    placeholder="Search a dog..."
                    onChange={(e) => handleInputChange(e)}
                ></input>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}