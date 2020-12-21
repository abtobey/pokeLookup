const baseUrl="https://pokeapi.co/api/v2/pokemon/"
let pokemonSelect=document.getElementById("pokemon");
let warning=document.getElementById("warning");


document.getElementById("submitButton").addEventListener("click", function(){
    //needs to be lowercase because API only accepts lowercase strings
    let choice=pokemonSelect.value.toLowerCase();
    if(choice.length==0){
        warning.innerText="Please enter a pokemon"
        return("No Pokemon Entered")
    }else{
        warning.innerText=""
        fetchPokemon(choice)
    }

})

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function addDiv(response){
    $(`
    <div class="card pokeCard col-8">
    <img src=${response.sprites.front_default} class=sprite><br>
    <h2>Name: ${capitalize(response.name)}</h2>
        <h3>ID: ${response.id}</h3>
        <h4>HP: ${response.stats[0].base_stat}</h4>
        <h4>Attack: ${response.stats[1].base_stat}</h4>
        <h4>Defense: ${response.stats[2].base_stat}</h4>
        <h4>Special Attack: ${response.stats[3].base_stat}</h4>
        <h4>Special Defense: ${response.stats[4].base_stat}</h4>
        <h4>Speed: ${response.stats[5].base_stat}</h4>
        </div>
    `).prependTo("#results");
    //clear input box
    pokemonSelect.value=""
}

function badReq(name){
    warning.innerText=name +" not found"

    return(("No pokemon found"))
}

function fetchPokemon(pokemonName){
const queryURL=baseUrl + pokemonName
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response)
    addDiv(response)
    return response.id
//catch will happen if we send a request with a name of a pokemon that doesn't exist
}).catch(err => badReq(pokemonName))
}
