const axios = require("axios");
const {Pokemon , Type} = require("../db.js");

const getApiInfo = async ()=>{
    try {
        const firstPokemon = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const secondPokemon = await axios.get(firstPokemon.data.next);
        const totalPokemon = firstPokemon.data.results.concat(secondPokemon.data.results);
        const infoPokemon = await Promise.all(       //promesa que termina exitosamente cuando todas las prom han sido concl con exito
            totalPokemon.map(async (pokemon) => {
                let infoPoke = await axios.get( pokemon.url );
                return{
                    id : infoPoke.data.id,
                    name: infoPoke.data.name,
                    hp : infoPoke.data.stats[0].base_stat,
                    attack: infoPoke.data.stats[1].base_stat,
                    defense: infoPoke.data.stats[2].base_stat,
                    speed: infoPoke.data.stats[5].base_stat,
                    height: infoPoke.data.height,
                    weight: infoPoke.data.weight,
                    image: infoPoke.data.sprites.other.dream_world.front_default,
                    types: infoPoke.data.types.map((t) => t.type.name),
                }; 
            })
        );
        return infoPokemon;
    } catch (error) {
        console.log( "view GetApiInfo", error);
    }
};

const getDbInfo = async ()=>{
    const pokemonDB = await Pokemon.findAll({include : [{model: Type}]}); 

    const pokemonMap = pokemonDB?.map((pokemon) => {
    // console.log("Esto quierver que tiene",pokemonDB)
    const { types } = pokemon;
    const pokemonData = {
        ...pokemon.dataValues,
        types: types.map((t) => t.name),
    };
        return pokemonData;
    });
        return pokemonMap;
};

const getAllPokemons = async ()=>{
        try {
            const apiInfo = await getApiInfo();
            const dbInfo = await getDbInfo();
            const allInfo = dbInfo.concat(apiInfo);
            return allInfo;

        } catch (error) {
            console.log("view getAllPokemons", error)
        }
};

module.exports = {
    getApiInfo,
    getAllPokemons,
    getDbInfo
}
