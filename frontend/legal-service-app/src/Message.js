import React from "react";
import {request} from "./Axios"
import FileDownload from "js-file-download"
import {FaDownload} from "react-icons/fa"

const Message = ({isOutgoing, content, timestamp, type = "text", link = null}) => {
    const handleDownload = () => {
        request({
            url: link,
            responseType: 'arraybuffer'
        }).then(data => {
            FileDownload(data, content);
        }).catch(error => {
            console.log(error);
        });
    };

    if (type === 'text') {
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
    } else if (type === 'file') {
        return (
            <>
                <li className={"media " + (isOutgoing ? "sent" : "received")}>
                    <div className="media-body">
                        <div className="msg-box">
                            <div>
                                <div>
                                    <button onClick={handleDownload} className="btn btn-link">
                                        <FaDownload /><br />
                                        {content}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

            </>
        );
    }

};

export default Message;
