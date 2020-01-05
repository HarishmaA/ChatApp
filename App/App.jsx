import React, {useState, useEffect} from 'react';
import './styles.css';
import socketIOClient from "socket.io-client";
var socket;


const App = () => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        socket =  socketIOClient('http://localhost:4000');
        // listen for events
        socket.on('chat',(data)=>{
            feedback.innerHTML="";
            output.innerHTML += '<p><strong>'+data.handle + ': </strong>'+data.message+'</p>';
        })
    
        socket.on('typing',(data)=>{
            feedback.innerHTML = '<p><em>'+data+ ' is typing a message...</em>';
        })
    },[]);

    const sendEvent=(user,message)=>{
        if(message && user) {
            socket.emit('chat',{
                message:message,
                handle:user,
            })
        }
    }
    const sendOnEnter= event => {
        if(event.keyCode === 13){
            sendEvent(); 
        }
    }
    
    //blur event
    const  blurEvent = event => {
            if(!event.target.value)
                event.target.classList.add('error'); 
    }
    
    const focusEvent = event => {
        event.target.classList.remove('error');
    }
    
    const typingEvent = (user)=> {
        socket.emit('typing', user);
    }
    

    return(
        <div id="chat" onKeyDown = {sendOnEnter}>
            <h2>Lets Chat...</h2>
            <div id = "chat-window">
                <div id = "output">
                    <div id = "feedback"></div>
                </div>
            </div>
            <input id="handle" type="text" placeholder="Handle" onBlur={blurEvent} onFocus={focusEvent} onChange={event => setUser(event.target.value)}/>
            <input id ="message" type="text" placeholder="Message" onKeyPress={() => typingEvent(user)} onBlur={blurEvent} onFocus={focusEvent} onChange={event => setMessage(event.target.value)}/>
            <button id="send" onClick={() => sendEvent(user,message)}>Send</button>
        </div>
    )
}

export default App;


