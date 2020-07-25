import React, { useEffect, useState } from "react";

const ChatUserListItem = ({chat_index, other_name, handleClick}) => {
    const [dataToggle, setDataToggle] = useState("");
    const [dataTarget, setDataTarget] = useState("");
    const toggle = () => {
        if (window.innerWidth <= 692) {
            setDataTarget("#chat_list");
            setDataToggle("collapse");
        } else {
            setDataToggle("");
            setDataTarget("");
        }
    };
    useEffect(() => {
        window.addEventListener("resize", toggle);
        return () => window.removeEventListener("resize", toggle);
    });
    return (
        <div
            className="media"
            onClick={() => {
                handleClick(chat_index);
            }}
            data-toggle={dataToggle}
            data-target={dataTarget}
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
