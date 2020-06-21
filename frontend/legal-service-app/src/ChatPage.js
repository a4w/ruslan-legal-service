import React, {useState} from "react"
import {FaCogs, FaPaperclip} from "react-icons/fa";

const ChatUserList = ({}) => {
    return (
        <>
            <div class="chat-users-list">
                <div class="chat-scroll">
                    <a href="javascript:void(0);" class="media">
                        <div class="media-img-wrap">
                            <div class="avatar avatar-away">
                                <img src="assets/img/doctors/doctor-thumb-01.jpg" alt="User Image"
                                    class="avatar-img rounded-circle" />
                            </div>
                        </div>
                        <div class="media-body">
                            <div>
                                <div class="user-name">Dr. Ruby Perrin</div>
                                <div class="user-last-chat">Hey, How are you?</div>
                            </div>
                            <div>
                                <div class="last-chat-time block">2 min</div>
                                <div class="badge badge-success badge-pill">15</div>
                            </div>
                        </div>
                    </a>
                    <a href="javascript:void(0);" class="media read-chat">
                        <div class="media-img-wrap">
                            <div class="avatar avatar-away">
                                <img src="assets/img/doctors/doctor-thumb-10.jpg" alt="User Image"
                                    class="avatar-img rounded-circle" />
                            </div>
                        </div>
                        <div class="media-body">
                            <div>
                                <div class="user-name">Dr. Olga Barlow</div>
                                <div class="user-last-chat">Connect the two modules with in 1 day.</div>
                            </div>
                            <div>
                                <div class="last-chat-time block">Friday</div>
                            </div>
                        </div>
                    </a>
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
                            <ChatUserList onChatSelection={handleChatSelection} />
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
