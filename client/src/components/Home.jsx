import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPokemons, getDetail, getTypes, getNamePokemons, 
        filterByAttack, filterByName, filterByTypes, filterCreated, resetPokemons} from "../actions/index"
import Card from "./Card";
import Paginate from "./Paginate";
import pokeball from "../styles/gifs/pokebola.gif";
import SearchBar from "./SearchBar";
import styles from "../styles/Home.module.css";
import logo from "../styles/images/logo_pokemon.png";

export default function Home(){

    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons)
    const allTypes = useSelector(state => state.types)
    console.log(allTypes)

    useEffect(() => {
        dispatch(getAllPokemons());
    },[dispatch])

    useEffect(() => {
        dispatch(getTypes());
    },[dispatch])

    const [order, setOrder] = useState("")
    ///////////////////PAGINADO/////////////////////////////
    const [paginaActual, setPaginaActual] = useState(1)
    const [pokemonsPorPagina, setPokemonsPorPagina] = useState(12)
    const indiceUltimoPokemon = paginaActual * pokemonsPorPagina;
    const indicePrimerPokemon = indiceUltimoPokemon - pokemonsPorPagina
    const pokemonsActuales = allPokemons.slice(indicePrimerPokemon, indiceUltimoPokemon)

    const paginate = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getAllPokemons());
      };
    
    const handleFilterCreated = (e) => {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setPaginaActual(1)
    }
    
    
    const handleOrder = (e) => {
        e.preventDefault();
        dispatch(filterByName(e.target.value))
        setPaginaActual(1)
        setOrder(`Ordenado ${e.target.value}`);
    }
    const handleOrderAttack = (e) => {
        e.preventDefault();
        dispatch(filterByAttack(e.target.value))
        setPaginaActual(1)
        setOrder(`Ordenado ${e.target.value}`);
        }
    
       
    

    const handleFilterByType = (e) => {
        e.preventDefault();
        dispatch(filterByTypes(e.target.value))
        setPaginaActual(1)
    }



    return(
        <div className={styles.contHome}>
            

            {
                allPokemons.length > 0 ? (
                    <div>   

                        <div className={styles.navBar}>

                            <div>

                            <Link to="/create">
                                <button>Crear </button>
                            </Link>
                            
                            <Link to="/home">
                                <button onClick={(e) => handleClick(e)} >Recargar</button>
                            </Link>
                            </div>

                            <div className={styles.contLogo}>
                            <Link to="/">
                            <img src={logo} alt="logo" className={styles.logo}></img>
                            </Link>
                           </div>
                            
                            <div className={styles.navDer}>
                            <SearchBar />
                            </div>

                        </div>
                        
                        <div className={styles.homefilters}>
                                <div>
                                    <select onChange={(e) => handleFilterCreated(e)} >
                                        <option value="all">All</option>
                                        <option value="created">Created</option>
                                    </select>
                                </div>
                                <div>
                                    <select onChange={(e) => handleFilterByType(e)} >
                                        <option value="all">All</option>
                                            {
                                                allTypes.map((t) => {
                                                return (
                                                    <option value={t.name} key={t.name}>
                                                    {t.name[0].toUpperCase() + t.name.slice(1)}
                                                    </option>
                                                );
                                                })
                                            }
                                    </select>
                                </div>
                                <div>
                                        <select onChange={(e) => handleOrder(e)} >
                                        
                                            <option value="asc">Asc</option>
                                            <option value="desc">Desc</option>
                                        </select>

                                        <select onChange={(e) => handleOrderAttack(e)}>
                                            
                                            <option value="strong">Asc</option>
                                            <option value="weak">Desc</option>
                                        </select>
                                            
                                        
                                </div>
                        </div>

                        

                        
                        
                        <div>
                            <Paginate
                            paginate={paginate}
                            paginaActual={paginaActual}
                            allPokemons={allPokemons.length}
                            setPaginaActual={setPaginaActual}
                            pokemonsPorPagina={pokemonsPorPagina}
                            />
                        </div>
                        <div >
                       {
                        pokemonsActuales?.map((e) => {
                            return(
                                <div key={e.id} >
                                    <Link  to={'/pokemons/' + e.id}>
                                        <Card
                                            name={e.name}
                                            types={e.types}
                                            image={e.image}
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                        </div>
                    </div>

                ) : (
                    <div className={styles.poke}>
                        <img src={pokeball} alt="pokeball"/>
                    </div>
                )}
        </div>
    )
}