import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../actions/index';

export default function SearchBar(){

    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInput(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNamePokemons(name));
        setName("") // para dejarlo vacio despues de la busqueda
    }

    return(
       <div>
            <input 
            type="text"
            placeholder="Buscar..."
            onChange={(e) => handleInput(e)}
            value={name}/>

        <button
            type="submit"
            onClick={(e) => handleSubmit(e)}  
        >
          Buscar
        </button>
       </div>
    )
}
