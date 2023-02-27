import axios from 'axios';

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_NAME_POKEMONS = 'GET_NAME_POKEMONS';
export const GET_TYPES = "GET_TYPES";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAN_POKEMON = "CLEAN_POKEMON";
/////////filtros////////////////////////
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const RESET_POKEMONS = "RESET_POKEMONS";
export const DELETE_POKEMON = "DELETE_POKEMON"

export function getAllPokemons(){
    return async function(dispatch) {
        const response = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: response.data
        })
        }
}

// export function getAllPokemon(){
//     return function(dispatch){
//         const resp = axios.get('http://localhost:3001/pokemons')
//             .then(r => {
//                 dispatch({
//                     type: GET_ALL_POKEMONS,
//                     payload: resp.data
//                 })
//             })
//             .catch(error => {
//                 console.log('Error getting all pokemons:', error);
//               });

//     }
// }

export function getNamePokemons(name){
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        return dispatch({
            type: GET_NAME_POKEMONS,
            payload: response.data
        })
    }
}


export function getTypes(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/types", {});
        return dispatch({
            type: GET_TYPES,
            payload: json.data
        })
    }
}

export function postPokemon(payload) {
    return async function () {
        const response = await axios.post('http://localhost:3001/pokemons', payload) //payload es todo lo que carga el usuario
        return response
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        let response = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type: GET_DETAIL,
            payload: response.data
        })
    }
}

export function deletePokemon(id) {
    return async function (dispatch) {
      try {
        await axios.delete(`http://localhost:3001/delete/${id}`);
        return dispatch({
          type: DELETE_POKEMON,
        });
      } catch (error) {
        console.log("Error deleting pokemon", error);
      }
    };
}

export function cleanPokemon(){
    return {
        type: CLEAN_POKEMON
    }
}
  
export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload: payload
    }
}

export function filterByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload: payload
    }
}

export function filterByAttack(payload){
    return{
        type: ORDER_BY_ATTACK,
        payload: payload
    }
}

export function resetPokemons(payload){
    return{
        type: RESET_POKEMONS,
        payload: payload
    }
}

export function filterByTypes(payload){
    return{
        type: FILTER_BY_TYPES,
        payload: payload
    }
}