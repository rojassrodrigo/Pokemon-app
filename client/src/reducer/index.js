import {GET_ALL_POKEMONS, GET_DETAIL, 
        GET_NAME_POKEMONS, GET_TYPES, 
        CLEAN_POKEMON, FILTER_BY_TYPES, 
        FILTER_CREATED, ORDER_BY_ATTACK,
        ORDER_BY_NAME, RESET_POKEMONS, DELETE_POKEMON } from "../actions/index"

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    details: [],
}

function rootReducer(state = initialState, action){

    const pokes = state.allPokemons

    switch(action.type){
        case GET_ALL_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case GET_NAME_POKEMONS:
            return{
                ...state,
                pokemons: action.payload
            }
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
            
        case GET_DETAIL:
            return{
                ...state,
                details: action.payload
            }
        case CLEAN_POKEMON:
            return {
                ...state,
                details: []
                }
        
        case RESET_POKEMONS:
            const resetPokemons = [...state.allPokemons]
            return{
                ...state,
                pokemons: resetPokemons
                }
        case FILTER_CREATED:
            const createdFilter= action.payload === "created" ?  
                pokes.filter(el => el.createInDB) : 
                pokes.filter(el => !el.createInDB)
            if (createdFilter.length === 0) {
                alert('No hay pokémon creados');
                return {
                    ...state
                }
            }
            return{
                ...state,
                pokemons: action.payload === "all" ? pokes : createdFilter
                }

        case FILTER_BY_TYPES:
            const pokeType = action.payload === 'all'
                ? pokes
                : pokes.filter((elem) => elem.types?.includes(action.payload)) 
            return {
                ...state,
                pokemons: pokeType
            }

           
        case ORDER_BY_NAME:
                let orderName = []
                orderName = action.payload === 'asc' 
                ? state.pokemons.sort((a, b) => {
                    if(a.name > b.name){
                        return 1 ;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0
                }) : state.pokemons.sort((a, b) => {
                    if(a.name > b.name){
                        return -1; 
                    }
                    if(b.name > a.name){
                        return 1 ;
                    }
                    return 0;
                })
                return {
                    ...state,
                    pokemons: orderName
                }
        case ORDER_BY_ATTACK:
                let orderAttack = []
                orderAttack = action.payload === 'strong' ? state.pokemons.sort((a, b) => {
                    if(a.attack > b.attack){
                        return -1 ;
                    }
                    if(b.attack > a.attack){
                        return 1;
                    }
                    return 0
                }) : state.pokemons.sort((a, b) => {
                    if(a.attack > b.attack){
                        return 1; 
                    }
                    if(b.attack > a.attack){
                        return -1 ;
                    }
                    return 0;
                })
           
                return {
                    ...state,
                    pokemons: orderAttack
                }
            case DELETE_POKEMON:
                    return {
                        ...state,
                        }

        default: return state
    }
}

export default rootReducer;
