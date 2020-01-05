//Make connection
const socket = io.connect('http://localhost:4000');

const message = document.getElementById("message"),
handle = document.getElementById("handle"),
output = document.getElementById("output"),
btn = document.getElementById("send"),
feedback = document.getElementById('feedback');

//blur event
function blurEvent(event){
        if(!event.target.value)
        event.target.classList.add('error'); 
} 
message.addEventListener('blur', event => blurEvent(event));
handle.addEventListener('blur', event => blurEvent(event));

//focus event
function focusEvent(event){
    event.target.classList.remove('error');
} 
message.addEventListener('focus', event => focusEvent(event));
handle.addEventListener('focus', event => focusEvent(event));

function sendEvent(){
    if(message.value && handle.value) {
        socket.emit('chat',{
            message:message.value,
            handle:handle.value,
        })
    }
}

//emit event
btn.addEventListener('click',()=>{
    sendEvent();
})

document.addEventListener('keydown',(event)=>{
    if(event.keyCode === 13){
        sendEvent(); 
    }
})

message.addEventListener('keypress', ()=>{
    socket.emit('typing',handle.value);
})


// listen for events
socket.on('chat',(data)=>{
    feedback.innerHTML="";
    output.innerHTML += '<p><strong>'+data.handle + ': </strong>'+data.message+'</p>';
})

socket.on('typing',(data)=>{
    feedback.innerHTML = '<p><em>'+data+ ' is typing a message...</em>';
})
