import React, {useState, useEffect} from "react"
import {FaCogs, FaPaperclip} from "react-icons/fa";
import {request} from "./Axios"
import ChatUserList from "./ChatUserList"
import MessagesList from "./MessagesList"


const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    // Load chats from server
    const [chats, setChats] = useState([]);
    useEffect(() => {
        request({
            url: '/chat/all',
            method: 'GET'
        }).then((response) => {
            const chats = response.chats.map((chat, _) => {
                return {
                    id: chat.id,
                    other_name: chat.participents[0].name
                };
            });
            setChats(chats);
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    // Load chat messages on chat change
    useEffect(() => {
        loadMessages();
        const interval_id = setInterval(() => {
            loadMessages();
        }, 3000);
        return () => {
            clearInterval(interval_id);
        };
    }, [selectedChat]);

    const loadMessages = (since = null) => {
        if (selectedChat !== null && !isFetching) {
            setIsFetching(true);
            // Chat id
            const chat_id = chats[selectedChat].id;
            request({
                url: `/chat/${chat_id}`,
                method: 'GET'
            }).then((response) => {
                setMessages(response.messages);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsFetching(false);
            });
        }
    };

    const handleMessageSend = () => {
        const chat_id = chats[selectedChat].id;
        request({
            url: `/chat/${chat_id}`,
            method: 'POST',
            data: {
                content: message
            }
        }).then((_) => {
            loadMessages();
            setMessage("");
        }).catch((error) => {
            console.log(error);
        });
    };
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="chat-window">
                        <div className="chat-cont-left">
                            <div className="chat-header">
                                <span>Chats</span>
                            </div>
                            <ChatUserList chats={chats} onChatSelection={(index) => setSelectedChat(index)} />
                        </div>
                        <div className="chat-cont-right">
                            <div className="chat-header">
                                <div class="media-body">
                                    <div class="user-name">{selectedChat !== null && chats[selectedChat].other_name}</div>
                                </div>
                                <div className="chat-options">
                                    <a href="javascript:void(0)">
                                        <FaCogs />
                                    </a>
                                </div>
                            </div>
                            <MessagesList messages={messages} />
                            <div className="chat-footer">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="btn-file btn">
                                            <FaPaperclip />
                                            <input type="file" />
                                        </div>
                                    </div>
                                    <input value={message} onChange={(e) => {setMessage(e.target.value)}} type="text" className="input-msg-send form-control" placeholder="Type something" />
                                    <div className="input-group-append">
                                        <button type="button" className="btn msg-send-btn" onClick={handleMessageSend}><i
                                            className="fab fa-telegram-plane"></i></button>
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
