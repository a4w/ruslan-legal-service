import React from "react";

const Message = ({isOutgoing, content, timestamp}) => {
    return (
        <>
            <li className={"media " + (isOutgoing ? "sent" : "received")}>
                <div className="media-body">
                    <div className="msg-box">
                        <div>
                            <p>{content}</p>
                            <ul className="chat-msg-info">
                                <li>
                                    <div className="chat-time">
                                        <span>{timestamp}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>

        </>
    );
};

export default Message;
