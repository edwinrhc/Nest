import { Manager } from "socket.io-client"

export const connectToServer = () => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');

    // estos son los namespace

    const socket =  manager.socket('/');
    console.log({socket});

    // http://localhost:3000/socket.io/socket.io.js
}
