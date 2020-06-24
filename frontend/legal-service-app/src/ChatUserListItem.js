import React from "react";

const ChatUserListItem = ({swipe, chat_index, other_name, handleClick}) => {
    return (
        <div
            className="media"
            onClick={() => {
                handleClick(chat_index);
                swipe();
            }}
        >
            <div className="media-body">
                <div>
                    <div className="user-name">{other_name}</div>
                </div>
            </div>
        </div>
    );
};

export default ChatUserListItem;
