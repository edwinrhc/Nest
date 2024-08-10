// import {name,age} from './base/01-types.ts';

import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter'
import {
    pokemons,
    // bulbasaur
} from "./base/02-objects";
// import {charmander} from "./base/04-injection";
// import {charmander} from "./base/05-decorators";
import {charmander} from "./base/06-decorators2";


const pokemonNames = pokemons.map((pokemon) => pokemon.name);
const pokemonNamesString = pokemonNames.join(', ')



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Hello ${pokemonNamesString} este ${charmander.name}</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
