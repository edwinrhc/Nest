import { Manager, Socket } from "socket.io-client"

export const connectToServer = () => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');

    // estos son los namespace

    const socket =  manager.socket('/');
    console.log({socket});
    addListeners(socket);
    // http://localhost:3000/socket.io/socket.io.js
}


const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector('#server-status')!;

    // Escuchar es "on" informacion
    socket.on('connect', () => {
        // console.log('connected');
        serverStatusLabel.innerHTML = 'connected!';
    })
    socket.on('disconnect', () => {
        // console.log('disconnect');
        serverStatusLabel.innerHTML = 'disconnected!';
    })
}
