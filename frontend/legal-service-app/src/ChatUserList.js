import React from "react";
import ChatUserListItem from "./ChatUserListItem"

const ChatUserList = ({chats, onChatSelection, swipe}) => {
    return (
        <>
            <div className="chat-users-list">
                <div className="chat-scroll">
                    {chats.map((chat, i) => {
                        return (
                            <ChatUserListItem
                                key={chat.id}
                                chat_index={i}
                                other_name={chat.other_name}
                                handleClick={onChatSelection}
                                swipe={swipe}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ChatUserList;
