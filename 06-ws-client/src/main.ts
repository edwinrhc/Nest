import {connectToServer} from './socket-client';
import './style.css'

// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
        <h1>WebSocket - Client</h1>
        <input id="jwt-token" placeholder="Json Web Token" />
        <button id="btn-connect">Connect </button>
        <br/>
        
        <span id="server-status">offline</span>
        <ul id="clients-ul"></ul>
        
        <form action="" id="message-form"> 
        <input type="text" placeholder="message" id="message-input">
        </form>
        
        <h3>Messages</h3>
        <ul id="messages-ul"></ul>

  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// connectToServer();
const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
    if(jwtToken.value.trim().length <= 0) return alert('Enter a valid JWT token');
    connectToServer(jwtToken.value.trim());
})
