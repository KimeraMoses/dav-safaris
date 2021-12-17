import React, {useState} from 'react';
import ChatCard from '../ChatCard/ChatCard';
import SendMessage from '../SendMessage';

const ChatNow = () => {
    const [show, setShow]= useState(false)
    return show? <ChatCard setShow={setShow}/>:<SendMessage setShow={setShow}/> ;
}

export default ChatNow
