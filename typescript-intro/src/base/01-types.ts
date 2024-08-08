// Teng que importar algo
export const name = 'Edwin';
export const age: number = 35;
export const isValid: boolean = true;



export const templateString = `
Esto es un string multilinea que puede tener " dobles, 'simplre inyectar valores ${name}
expresiones ${1 +1 }
numero ${age}
booleanos: ${isValid}`
;

console.log(templateString);