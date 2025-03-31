const pokemonList=document.getElementById("pokemonList")
const pokemonDetail=document.getElementById("pokemonDetail")
const pokemonInfo=document.getElementById("pokemonInfo")
const pokemonInput=document.getElementById("pokemonInput")
const searchPokemon=document.getElementById("searchPokemon")
let pokemonToSearch = ""
async function getPokemonData(pokemonID) {
     try {
      let res = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      let pokemon = await res.json()
      return pokemon
    } catch (error) {
      console.error(error.menssage)
      return null
    }
}
function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemon-card")
    pokemonCard.innerHTML = `
    <img src="${pokemon.sprites.front_default}">
    <h3>${pokemon.name}</h3>
    <p> ID: ${pokemon.id}</p>
    `
    pokemonCard.addEventListener("click",()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
}
function showPokemonDetail(pokemon){
    let typesName=[]
    let typesImg= ""
    for(i=0;i<pokemon.types.length;i++){
        console.log =(pokemon.types[i].type.name)
        typesImg = typesImg + `<img src=" ./assets/type-${pokemon.types[i].type.name}.png" height="50px" alt="logo
        tipo ${pokemon.types[i].type.name}">`
        typesName.push(pokemon.types[i].type.name)
    }
    pokemonList.style.display="none"
    pokemonDetail.style.display="block"
    pokemonInfo.innerHTML=`
    <img src="${pokemon.sprites.front_default}"alt="image view front ${pokemon.name}">
    <img src="${pokemon.sprites.back_default}" alt="image view back ${pokemon.name}">
    <h3>${typesName}</h3>
    <div>${typesImg}</div>
    `

    
}
async function loadPokedex() {
    for(let i=1;i<=1025;i++){
        let pokemon = await getPokemonData(i)
        displayPokemon(pokemon)
    }
}
btnBack.addEventListener("click",()=>{
        pokemonList.style.display="grid"
        pokemonDetail.style.display="none"
})

pokemonInput.addEventListener("input", (e)=>{
     pokemonToSearch = e.target.value
    console.log(pokemonToSearch)
})
searchPokemon.addEventListener("click", async ()=>{
    let pokemon = await getPokemonData(pokemonToSearch)
    if(pokemon==false){
        console.error("Pokemon not found")
        return alert ("Pokemont not found")
    }
    showPokemonDetail(pokemon)
})
loadPokedex()