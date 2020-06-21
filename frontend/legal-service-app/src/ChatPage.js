import React, {useState, useEffect} from "react"
import {FaCogs, FaPaperclip} from "react-icons/fa";
import {request} from "./Axios"


const ChatUserListItem = ({chat_id, other_name}) => {
    return (
        <a href="javascript:void(0);" class="media">
            <div class="media-body">
                <div>
                    <div class="user-name">{other_name}</div>
                </div>
            </div>
        </a>
    );
};

const ChatUserList = ({chats}) => {
    return (
        <>
            <div class="chat-users-list">
                <div class="chat-scroll">
                    {chats.map((chat, i) => {
                        return (<ChatUserListItem chat_id={chat.id} other_name={chat.other_name} />);
                    })}
                </div>
            </div>
        </>
    );
};
const MessagesList = ({}) => {
    return (
        <>
            <div class="chat-body">
                <div class="chat-scroll">
                    <ul class="list-unstyled">
                        <Message isOutgoing={true} content="Hello" timestamp="2020-05-01 00:00:00" />
                        <Message isOutgoing={false} content="Hi" timestamp="2020-05-01 00:00:00" />
                    </ul>
                </div>
            </div>
        </>
    );
};
const Message = ({isOutgoing, content, timestamp}) => {
    return (
        <>
            <li className={"media " + (isOutgoing ? "sent" : "received")}>
                <div class="media-body">
                    <div class="msg-box">
                        <div>
                            <p>{content}</p>
                            <ul class="chat-msg-info">
                                <li>
                                    <div class="chat-time">
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

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    // Load chats from server
    useEffect(() => {
        request({
            url: '/chat/all',
            method: 'GET'
        }).then((response) => {
            console.log(response.chats);
            const chats = response.chats.map((chat, i) => {
                return {
                    chat_id: chat.id,
                    other_name: chat.participents[0].name
                };
            });
            setChats(chats);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    const handleChatSelection = (chat_id) => {
        // Update chat
    };
    return (
        <>
            <div class="row">
                <div class="col-xl-12">
                    <div class="chat-window">
                        <div class="chat-cont-left">
                            <div class="chat-header">
                                <span>Chats</span>
                            </div>
                            <ChatUserList chats={chats} onChatSelection={handleChatSelection} />
                        </div>
                        <div class="chat-cont-right">
                            <div class="chat-header">
                                <div class="media">
                                    <div class="media-body">
                                        <div class="user-name">Dr. Darren Elder</div>
                                        <div class="user-status">online</div>
                                    </div>
                                </div>
                                <div class="chat-options">
                                    <a href="javascript:void(0)">
                                        <FaCogs />
                                    </a>
                                </div>
                            </div>
                            <MessagesList />
                            <div class="chat-footer">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="btn-file btn">
                                            <FaPaperclip />
                                            <input type="file" />
                                        </div>
                                    </div>
                                    <input type="text" class="input-msg-send form-control" placeholder="Type something" />
                                    <div class="input-group-append">
                                        <button type="button" class="btn msg-send-btn"><i
                                            class="fab fa-telegram-plane"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatPage;
