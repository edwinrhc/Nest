class NewPokemon{
    constructor(
        public readonly id: number,
        public name: string
) {
    }

    scream() {
        console.log(`No quiero`)
    }

    speak() {
        console.log(`No quiero hablar!!`);
    }
}

// Lo decoradores son funciones
// configuremos el tsconfig.json  en  "experimentalDecorators": true,
const MyDecorator =  () => {

    return ( target: Function) => {
        // console.log(target)
        return NewPokemon;
    }
}

@MyDecorator()
export class Pokemon {
    constructor(
        public readonly id: number,
        public name: string
    ) {
    }

    scream() {
        console.log(`${this.name.toUpperCase()}`)
    }

    speak() {
        console.log(`${this.name}, ${this.name}!!`);
    }

}

export const charmander = new Pokemon(4, 'charmander');

charmander.scream();
charmander.speak();
