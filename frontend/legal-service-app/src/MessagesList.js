import React, {useState, useEffect} from "react"
import Message from "./Message"

// TODO: Save my id
const me = 1;

const MessagesList = ({messages}) => {
    useEffect(() => {
        var element = document.getElementById("messages_container");
        element.scrollTop = element.scrollHeight;
    }, [messages]);
    return (
        <>
            <div className="chat-body">
                <div className="chat-scroll" id="messages_container">
                    <ul className="list-unstyled">
                        {messages.map((message, _) => {
                            if (message.message_type === 'TEXT') {
                                return (<Message isOutgoing={me === message.sender_id} content={message.content} timestamp={message.created_at} />);
                            } else if (message.message_type === 'FILE') {
                                return (<Message type="file" link={message.link} isOutgoing={me === message.sender_id} content={message.content} timestamp={message.created_at} />);
                            }
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MessagesList;
