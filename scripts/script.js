//////////////
//DE POKEDEX//
//////////////
//Bron: James Q Quick op Youtube https://youtu.be/T-VQUKeSU1w

//Hier roep je de pokedex aan. Heeft een id 'pokedex'
const pokedex = document.getElementById ("pokedex");

console.log (pokedex);

const fetchPokemon = () => {
    const promises = [];

    //Hierdoor krijg je alle 151 pokemons (eerste generatie). Als i (staat voor de pokemon in de api) 
    //minder of gelijk aan 151 is, pakt ie alle data daarvan. Normaal staat er in de url
    //van de api de id van de pokemon, maar nu is dat i. 
    //Stel je doet 493, krijg je alle pokemons t/m generatie 4. Enige is dat hij dan langzamer laadt, want 
    //hij moet meer pokemons ophalen.
    for(let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
}

    //Hierdoor krijg je alle data van de 150 pokemons. 
    Promise.all (promises).then((results) => {
        //Hierdoor komen de items van de api (naam, id, image en type) in de variabel pokemon
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join (',')
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log (pokemon);

    //Dit is de html, maar dan in javascript. Hier heb ik alle data in de html elementen gezet
    const pokemonHTMLString = pokemon.map(pokeman => `
    <li>
        <img src="${pokeman.image}">
        <h2>${pokeman.id}. ${pokeman.name}</h2>
        <p>Type: ${pokeman.type}</p>
    </li>
    `
    ).join('');

    //Hierdoor komt de geschreven html in index.html terecht. In de id 'pokedex'
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon ();





/////////////////
//DRAG AND DROP//
/////////////////
var favoLijst = document.querySelector("ul");
var allesLijst = document.querySelector("ol");

new Sortable(allesLijst, {
	group: {
		name: 'fotoLijstjes', 
		pull: 'clone' 
	},
	sort: false, 
	animation: 300 
});

new Sortable(favoLijst, {
	group: {
		name: 'fotoLijstjes', 
		pull: 'false' 
	},
	animation: 300 
});