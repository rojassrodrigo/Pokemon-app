const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllPokemons , getDbInfo ,getApiInfo} = require("../routes/controllers")
const { Pokemon, Type } = require("../db.js")
const router = Router();

router.get("/pokemons", async (req, res)=>{
    try {
        const { name } = req.query;
        const allPokemons = await getAllPokemons();
        if(name){
            let pokemonsName = allPokemons.filter( p => p.name.toLowerCase().includes(name.toLowerCase()))
            pokemonsName.length ?
            res.status(200).send(pokemonsName) :
            res.status(404).send("Pokemon not found")
        }else{
            res.status(200).send(allPokemons);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/pokemons/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const getByID = await getAllPokemons();

        if(id){
            const filterByID = getByID.filter( p => p.id.toString() === id);
            filterByID.length ? 
            res.status(200).send(filterByID) :
            res.status(404).send("ID not found")
        }else{
            res.status(404).send("Error url")
        }
    } catch (error) {
        res.json({error : error.message});
    }
})


router.get("/types",async (req, res)=>{
    
    try {
    const countTypes = await Type.count(); //cuenta las ocurrencias de elementos en la base de datos
   
    if (!countTypes) {

      console.log("Create them");

      const allMyPokemons = await getAllPokemons();

      const pokemonTypes = allMyPokemons.map((pokemon) => pokemon.types); //mapeo todos los tipos de pokemons

      const myTypes = pokemonTypes.flat(); // Nuevo arreglo con los elem. de los sub arreglos concatenados -> [[1, 2], [3, 2]] -> [1, 2, 3, 2]
      
      const mySetTypes = [...new Set(myTypes)]; // Elimina los repetidos(set solo acepta valores unicos) -> [1, 2, 3, 2] -> [1, 2, 3]
     
      mySetTypes.forEach((type) => {
        Type.findOrCreate({ where: { name: type } }); // Busca en la tabla Type, en la columna name si tiene el type, sino lo crea.
      });
      
      const theTypes = await Type.findAll(); // Trae todos los datos de la tabla type.
      
      res.status(200).send(theTypes);

    } else {
      
      console.log("ya los tenia asi que no los cree");
     
      const theTypes = await Type.findAll(); // Trae todos los datos de la tabla type.
      res.status(200).send(theTypes);
    }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }



})

router.post("/pokemons", async (req, res) =>{
    try {
        const {
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image,
            types,
            createdInDb,
          } = req.body;
      
          let urlDeImagen = "";
      
          if (image) {
            urlDeImagen = image;
          } else {
            urlDeImagen =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png";
          }
      
          if (name && types.length) {
            const createPokemon = await Pokemon.create({
              name,
              hp,
              attack,
              defense,
              speed,
              height: Number(height),
              weight: Number(weight),
              image: urlDeImagen,
              createdInDb,
            });
      
            const typeDb = await Type.findAll({where: { name: types },});
      
            createPokemon.addType(typeDb);

            res.status(200).send("Pokemon creado con exito");
          } else {
            res.status(400).send("Faltaron datos para crear el pokemon");
          }
    } catch (error) {
      res.status(404).send(body)
    }
})

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pokemonDelete = await Pokemon.findByPk(id);
    if (!pokemonDelete) {
      res.status(400).send("The ID to delete does not exist");
    } else {
      pokemonDelete.destroy();
      return res.status(200).send("Successfully deleted");
    }
  } catch (error) {
    res.status(400).json( "error delete", { error: error.message });
  }
});

// router.put("/edit/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       hp,
//       attack,
//       defense,
//       speed,
//       height,
//       weight,
//       image,
//       types,
//       createdInDb,
//     } = req.body;
//     if (id) {
//       let urlDeImagen = "";

//       if (image) {
//         urlDeImagen = image;
//       } else {
//         urlDeImagen =
//           "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png";
//       }

//       if (name) {
//         const findPokemon = await Pokemon.findByPk(id);
//         await findPokemon.update(
//           {
//             name,
//             hp,
//             attack,
//             defense,
//             speed,
//             height: Number(height),
//             weight: Number(weight),
//             image: urlDeImagen,
//             createdInDb,
//           },
//           { where: { id: id } }
//         );

//         const typeDb = await Type.findAll({
//           where: { name: types },
//         });

//         await findPokemon.setTypes(typeDb);
//         res.status(200).send("Pokemon modificado con exito");
//       } else {
//         res.status(400).send("Faltaron datos para modificar el pokemon");
//       }
//     }
//   } catch (error) {
//     console.log("entre al error del put", error);
//   }
// });

module.exports = router;