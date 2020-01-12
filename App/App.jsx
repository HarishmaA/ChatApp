import React, {useState, useEffect} from 'react';
import './styles.css';
import socketIOClient from "socket.io-client";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
var socket;


const App = () => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [showEmoji,setShowEmoji] = useState(false);
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
        setMessage('');
        }
    }
    const sendOnEnter= (event, user, message) => {
        if(event.keyCode === 13){
            sendEvent(user,message); 
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
    
    const addEmoji = event => {
        let emoji = event.native;
        setMessage(message + emoji);
        console.log(message);
    }
    const showEmojis = e => {
        setShowEmoji(!showEmoji);
    };
    

    return(
        <div id="chat" onKeyDown = {(event) => sendOnEnter(event, user,message)}>
            <h2>Lets Chat...</h2>
            <div id = "chat-window">
                <div id = "output">
                    <div id = "feedback"></div>
                </div>
            </div>
            <input id="handle" type="text" placeholder="Your Name" onBlur={blurEvent} onFocus={focusEvent} onChange={event => setUser(event.target.value)}/>
            <input id ="message" value= {message} type="text" placeholder="Message" onKeyPress={() => typingEvent(user)} onBlur={blurEvent} onFocus={focusEvent} onChange={event => setMessage(event.target.value)}/>
            { showEmoji && 
                (<span style={styles.emojiPicker}>
                    <Picker onSelect={addEmoji}
                    emojiTooltip={true}
                    title="Lets Chat" />
                </span>)
            }  
            <p style={styles.getEmojiButton} onClick={showEmojis}>
            {String.fromCodePoint(0x1f60a)}
            </p>
            <button id="send" onClick={() => sendEvent(user,message)}>Send</button>
        </div>
    )
}

const styles = {
    container: {
      padding: 20,
      borderTop: "1px #4C758F solid",
      marginBottom: 20
    },
    input: {
      color: "inherit",
      background: "none",
      outline: "none",
      border: "none",
      flex: 1,
      fontSize: 16
    },
    getEmojiButton: {
      cssFloat: "right",
      border: "none",
      margin: 0,
      cursor: "pointer",
      display: "inline-block",
      padding: 5,
      fontSize: 25
    },
    emojiPicker: {
      position: "absolute",
      bottom: 10,
      right: 0,
      cssFloat: "right",
      marginLeft: "200px",
    }
  };
  
const customEmojis = [
    {
      name: "Octocat",
      short_names: ["octocat"],
      text: "",
      emoticons: [],
      keywords: ["github"],
      imageUrl: "https://assets-cdn.github.com/images/icons/emoji/octocat.png?v7"
    }
  ];

export default App;


