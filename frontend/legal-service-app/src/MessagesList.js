import React, { useState, useEffect } from "react"
import Message from "./Message"

// TODO: Save my id
const me = 33;

const MessagesList = ({ messages }) => {
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
                            return (<Message isOutgoing={me === message.sender_id} content={message.content} timestamp={message.created_at} />);
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MessagesList;
