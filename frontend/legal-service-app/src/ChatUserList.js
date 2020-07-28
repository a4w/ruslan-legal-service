import React from "react";
import ChatUserListItem from "./ChatUserListItem"

const ChatUserList = ({chats, onChatSelection, swipe}) => {
    return (
        <>
            <div className="chat-users-list" style={{flex: '1 1 auto'}}>
                <div className="chat-scroll" style={{height: "467px"}}>
                    {chats.map((chat, i) => {
                        return (
                            <ChatUserListItem
                                key={chat.id}
                                chat_index={i}
                                other_name={chat.account.full_name}
                                handleClick={onChatSelection}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ChatUserList;
