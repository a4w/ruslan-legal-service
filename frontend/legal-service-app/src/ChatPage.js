import React, {useState, useEffect} from "react"
import "./ChatPage.css";
import {FaCogs, FaPaperclip} from "react-icons/fa";
import {request} from "./Axios"
import ChatUserList from "./ChatUserList"
import MessagesList from "./MessagesList"
import {toast} from "react-toastify";

const HideChatListStyle = {
    left: "-100%"
}
const ShowMessageListStyle = {
    position: "absolute",
    right: "0",
    top: "0",
    opacity: "1",
    visibility: "visible",
};

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [hideChatList, setHide] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const Chats = () => {
        if (window.innerWidth >= 991) setHide(false);
        else setHide(true)
    };
    useEffect(() => {
        window.addEventListener("resize", Chats);

        return () => window.removeEventListener("resize", Chats);
    });
    const Swipe = () => {
        if (window.innerWidth <= 991) setHide(true);
    };
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
                    other_name: chat.participants[0].name
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
        if (file === null) {
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
        } else {
            // Send file
            const formData = new FormData();
            const sFile = file;
            formData.append('file', sFile);
            request({
                url: `/chat/${chat_id}/file`,
                method: 'POST',
                data: formData
            }).then((response) => {
                setFile(null);
            }).catch((error) => {
                toast.error("The maximum file size is 2 MB");
            });
        }
    };
    return (
        <Container>
            <div
                className="chat-cont-left"
                style={hideChatList ? HideChatListStyle : {}}
            >
                <div class="chat-header">
                    <span>Chats</span>
                    <a href="//" class="chat-compose">
                        <i class="material-icons">control_point</i>
                    </a>
                </div>
                <form class="chat-search">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <i class="fas fa-search"></i>
                        </div>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Search"
                        />
                    </div>
                </form>
                <ChatUserList
                    swipe={Swipe}
                    chats={chats}
                    onChatSelection={(index) => setSelectedChat(index)}
                />
            </div>
            <div
                className="chat-cont-right"
                style={hideChatList ? ShowMessageListStyle : {}}
            >
                <div className="chat-header">
                    <a class="back-user-list" onClick={() => setHide(false)}>
                        <i class="fas fa-chevron-left mr-3 ml-2"></i>
                    </a>
                    <div class="media">
                        <div class="media-img-wrap">
                            <div class="avatar avatar-online">
                                <img
                                    src="/test.jpg"
                                    alt="User Image"
                                    class="avatar-img rounded-circle"
                                />
                            </div>
                        </div>{" "}
                        <div class="media-body">
                            <div class="user-name">
                                {selectedChat !== null &&
                                    chats[selectedChat].other_name}
                            </div>
                        </div>
                    </div>
                </div>
                <MessagesList messages={messages} />
                <div className="chat-footer">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="btn-file btn">
                                <FaPaperclip />
                                <input type="file" onChange={({target}) => {setFile(target.files[0])}} />
                            </div>
                        </div>
                        <input
                            value={file === null ? message : file.name}
                            disabled={file !== null}
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            type="text"
                            className="input-msg-send form-control"
                            placeholder="Type something"
                        />
                        <div className="input-group-append">
                            <button
                                type="button"
                                className="btn msg-send-btn"
                                onClick={handleMessageSend}
                            >
                                <i className="fab fa-telegram-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

const Container = (props) => {
    return (
        <div class="content p-0">
            <div class="container-fluid p-0">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="chat-window">{props.children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChatPage;
