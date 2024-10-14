import { Manager, Socket } from "socket.io-client"

let socket:  Socket;

export const connectToServer = (token: string) => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js',{
        extraHeaders: {
            hola: 'mundo',
            authentication: token,
        }
    });

    // estos son los namespace

    socket?.removeAllListeners();
    socket =  manager.socket('/');

    addListeners();
    // http://localhost:3000/socket.io/socket.io.js
}


const addListeners = () => {
    const clientsUl = document.querySelector('#clients-ul')
    const messageForm = document.querySelector<HTMLInputElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLInputElement>('#messages-ul')!;
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

    socket.on('clients-updated',(clients: string[])=>{
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml += `
                <li>${clientId}</li> `
        });
        // @ts-ignore
        clientsUl.innerHTML = clientsHtml;
    });
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault(); // evita la propagacion del formulario
        if(messageInput.value.trim().length <= 0 ){
            return;
        }
        socket.emit('message-from-client', {
            id: '',
            message: messageInput.value,
        });
        messageInput.value = '';
    });

    socket.on('message-from-server',(payload: { fullName: string, message: string }) =>{
        // console.log(payload);
        const newMessage = `
                <li>
                            <strong>${payload.fullName} </strong>>
                            <span>${payload.message} </span>
                </li>    `;

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);
    })
}
