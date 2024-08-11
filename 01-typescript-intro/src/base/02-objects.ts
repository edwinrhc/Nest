export const pokemonIds = [1,20,30,34,66];

pokemonIds.push(1);



interface pokemon {
    id: number,
    name: String;
    age?: number;
}

export const bulbasaur:pokemon = {
    id: 1,
    name: 'Bulbasaur',
}

export const charmander: pokemon = {
    id: 2,name:'Charmander',
}

export const pokemons: pokemon[] = [];

pokemons.push(bulbasaur, charmander);

console.log(pokemons);