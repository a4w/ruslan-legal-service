import React from "react";
import ChatUserListItem from "./ChatUserListItem"

const ChatUserList = ({chats, onChatSelection}) => {
    return (
        <>
            <div className="chat-users-list">
                <div className="chat-scroll">
                    {chats.map((chat, i) => {
                        return (<ChatUserListItem key={chat.id} chat_index={i} other_name={chat.other_name} handleClick={onChatSelection} />);
                    })}
                </div>
            </div>
        </>
    );
};

export default ChatUserList;
