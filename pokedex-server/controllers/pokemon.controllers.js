import PokemonModel from "../models/pokemon.model.js"
import fetchPokemon from "../services/fetchPokemon.js"
const hiTrainer = async (req, res)=>{
    try {
       res.status(200).send("Hola desde controlador") 
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const createPokemon = async (req, res)=>{
    try {
        const pokemon=new PokemonModel(req.body)
        await pokemon.save()
        return res.status(201).json(pokemon)
    } catch (error) {
         res.status(500).send(error)
    }}

const getPokemons = async (req, res)=>{
        try {
            const pokemons = await Pokemon.find();
            res.status(200).json(pokemons);
        } catch (error) {
            res.status(500).json({error});
    }
    }
const getPokemonByIdPokemon = async (req,res)=>{
    try{
    const pokemonId=req.params.pokemon_id;
    let pokemon = await PokemonModel.findOne({"pokemon_id":pokemonId});
    if(!pokemon){
            pokemon = {
                pokemon_id:pokemonId,
                view:false,
                catch:false,
                in_team:false
            };
        }
        console.log(pokemonId);
        
        const pokemonData = await fetchPokemon(pokemonId,pokemon)
        if(pokemonData == 404){
            return res.status(404).json({
                message:"Pokemon not found",
                status:404,
                data:null
            })
        }
        return res.status(200).json({
            message:"Ok",
            status:200,
            data:pokemonData
        })

    }catch (error) {
            console.error(error)
            res.status(500).json(error)
        }

}
    

export default {hiTrainer,createPokemon,getPokemons,getPokemonByIdPokemon}


