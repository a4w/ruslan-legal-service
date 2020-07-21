import React, {useState, useEffect} from "react"
import Message from "./Message"

const MessagesList = ({messages, user_id, notify, showToast, last_message}) => {
    const [length, setLength] = useState(messages? messages.length:0);
    useEffect(() => {
        var element = document.getElementById("messages_container");
        element.scrollTop = element.scrollHeight;
        setLength(messages.length)
    }, [messages]);
    useEffect(() => {
        var element = document.getElementById("messages_container");
        element.scrollTop = element.scrollHeight;
    }, []);
    return (
        <>
            <div className="chat-body">
                <div className="chat-scroll" id="messages_container">
                    <ul className="list-unstyled">
                        {messages.map((message, i) => {
                            if (message.message_type === 'TEXT') {
                                if(showToast && last_message && user_id !== message.sender_id && i === length && last_message.content === message.content){
                                    // notify();
                                }
                                return (<Message isOutgoing={user_id === message.sender_id} content={message.content} timestamp={message.created_at} />);
                            } else if (message.message_type === 'FILE') {
                                return (<Message type="file" link={message.link} isOutgoing={user_id === message.sender_id} content={message.content} timestamp={message.created_at} />);
                            }
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MessagesList;
