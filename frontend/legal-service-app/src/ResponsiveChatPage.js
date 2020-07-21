import React, {useState, useEffect, useRef, useContext} from "react"
import "./ChatPage.css";
import {FaCogs, FaPaperclip, FaRegQuestionCircle} from "react-icons/fa";
import ChatUserList from "./ChatUserList"
import MessagesList from "./MessagesList"
import {toast} from "react-toastify";
import useInterval from "./useInterval";
import useRequests from "./useRequests";
import History from "./History";
import Img from "./Img"
import NoContent from "./NoContent";
import SpinnerButton from "./SpinnerButton";
import useValidation from "./useValidation";
import {ChatMessageValidation} from "./Validations";
import {Link} from "react-router-dom";
import {AuthContext} from "./App";

const ResponsiveChatPage = ({list_chats = true, initialSelectedChat = null, match = null, showContent = false, notify}) => {
    const inputRef = useRef(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [myId, setMyId] = useState(null);
    const [errors, , runValidation] = useValidation(ChatMessageValidation);

    const {request} = useRequests();
    // Load chats from server
    const [chats, setChats] = useState([]);
    useEffect(() => {
        request({
            url: '/chat/all',
            method: 'GET'
        }).then((response) => {
            const me = response.me;
            setMyId(me.id);
            let selected_chat_idx = null;
            const chats = response.chats.map((chat, i) => {
                if (chat.id === initialSelectedChat) {
                    selected_chat_idx = i;
                }
                if (match !== null && match.params.chatId && chat.id === parseInt(match.params.chatId)) {
                    selected_chat_idx = i;
                }
                const other = chat.participants[0].id == me.id ? chat.participants[1] : chat.participants[0];
                return {
                    id: chat.id,
                    account: other
                };
            });
            setChats(chats);
            if (chats.length > 0) {
                if (selected_chat_idx !== null) {
                    setSelectedChat(selected_chat_idx);
                } else {
                    setSelectedChat(0);
                }
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [initialSelectedChat]);

    useInterval(() => {
        console.log("Loading");
        loadMessages();
    }, 3000);

    // Load chat messages on chat change
    useEffect(() => {
        console.log("Updating selected chat");
        console.log(selectedChat);
        setMessages([]);
        loadMessages(true);
    }, [selectedChat, chats]);

    const loadMessages = (force = false) => {
        console.log("Loading messages");
        if (selectedChat !== null && (force || !isFetching)) {
            let since = null;
            if (messages.length > 0 && !force) {
                const lastMessage = messages[messages.length - 1];
                since = lastMessage.created_at;
            }
            console.log("Clear");
            setIsFetching(true);
            // Chat id
            const chat_id = chats[selectedChat].id;
            request({
                url: `/chat/${chat_id}` + (since === null ? '' : '?since=' + since),
                method: 'GET'
            }).then((response) => {
                if (response.messages.length > 0) {
                    setMessages([...messages, ...response.messages]);
                    if(list_chats === false && messages !== []) notify();
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsFetching(false);
            });
        }
    };
    const [isSending, setIsSending] = useState(false);

    const handleMessageSend = (e) => {
        e.preventDefault();
        const chat_id = chats[selectedChat].id;
        setIsSending(true);
        if (file === null) {
            runValidation({message: message}).then((hasErrors, _) => {
                if (hasErrors) {
                    toast.error(errors.message[0]);
                    setIsSending(false);
                    return;
                }
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
                }).finally(() => {
                    setIsSending(false);
                    inputRef.current.focus();
                });
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
                loadMessages();
                setMessage("");
            }).catch((error) => {
                toast.error("The maximum file size is 2 MB");
            }).finally(() => {
                setFile(null);
                setIsSending(false);
                inputRef.current.focus();
            });
        }
    };
    return (
        <>
            <div className="row no-gutters">
                {(list_chats && chats.length) || showContent ?
                    <>
                        {list_chats &&
                            <div className="col-12 col-md-4 col-lg-3 collapse show h-100 chat-left-menu" id="chat_list">
                                <div
                                    className={"chat-cont-left"}
                                    style={{maxWidth: '100%'}}
                                >
                                    <div className="chat-header">
                                        <span>Chats</span>
                                        <button className="btn btn-link d-block d-md-none" data-toggle="collapse" data-target="#chat_list" role="button">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                    <SearchLawyerByName />
                                    <ChatUserList
                                        chats={chats}
                                        onChatSelection={(index) => {
                                            History.replace(`/chat/${chats[index].id}`);
                                            setSelectedChat(index);
                                        }}
                                    />
                                </div>
                            </div>}
                        <div className="col">
                            <div
                                className="chat-cont-right"
                                style={{maxWidth: '100%'}}
                            >
                                <div className="chat-header">
                                    <div className="media">
                                        {list_chats && <button className="btn btn-link d-block d-md-none" data-toggle="collapse" data-target="#chat_list" role="button">
                                            <i className="fas fa-chevron-left"></i>
                                        </button>}
                                        <div className="media-img-wrap">
                                            <div className="avatar">
                                                {selectedChat !== null &&
                                                    <Img
                                                        src={chats[selectedChat].account.profile_picture}
                                                        alt="User Image"
                                                        className="avatar-img rounded-circle"
                                                    />
                                                }
                                            </div>
                                        </div>{" "}
                                        <div className="media-body">
                                            <div className="user-name">
                                                {selectedChat !== null &&
                                                    chats[selectedChat].account.full_name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <MessagesList messages={messages} user_id={myId} />
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
                                            disabled={file !== null || isSending}
                                            onChange={(e) => {
                                                setMessage(e.target.value);
                                                runValidation(e.target.value);
                                            }}
                                            ref={inputRef}
                                            type="text"
                                            className="input-msg-send form-control"
                                            placeholder="Type something"
                                            autofocus
                                            onKeyPress={event => {
                                                if (event.key === 'Enter') {
                                                    handleMessageSend(event);
                                                }
                                            }}

                                        />
                                        <div className="input-group-append">
                                            <SpinnerButton
                                                type="button"
                                                className="btn msg-send-btn"
                                                onClick={handleMessageSend}
                                                loading={isSending}
                                            >
                                                <i className="fab fa-telegram-plane"></i>
                                            </SpinnerButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <NoContent label="Open a lawyer profile and send a message!">
                        No chats available
            </NoContent>
                }
            </div>
        </>
    );
};
const SearchLawyerByName = () => {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [, , run] = useValidation();
    const [term, setTerm] = useState("");
    const {request} = useRequests();
    const [auth,] = useContext(AuthContext);

    const OnChangeHandler = ({target: {value}}) => {
        setTerm(value);
    };

    useEffect(() => {
        setLoading(true);
        request({
            url: `/lawyer/search?term=${term}`,
            method: 'GET'
        }).then(response => {
            setResults(response.lawyers);
        }).catch(error => {
            setResults([]);
        }).finally(() => {
            setLoading(false);
        });

    }, [term]);
    const dropdownStyle = {
        position: 'absolute',
        display: 'block',
        width: '99%',
        backgroundColor: '#fff',
        borderRadius: '10px',
        border: '1px solid #ccc',
        marginRight: '5px',
        maxHeight: "300px",
        overflowY: "auto",
        zIndex: "999",
        top: "47px"
    };
    const imgStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '3px',
        marginRight: '10px',
        display: "inline",
    };
    const StartChat = (id) => {
        setLoading(true);
        const myID = auth.accountId;
        const url = `/chat/${myID}/${id}`;
        request({url: url, method: "POST"})
            .then(() => {
                History.replace(`/chat/${id}`);
            })
            .catch(() => {
                toast.error("An error occured");
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <form className="chat-search" onSubmit={(e) => {e.preventDefault();}}>
            <div className="input-group">
                <div className="input-group-prepend">
                    <SpinnerButton style={{display: "contents"}} loading={loading}>
                        <i className="fas fa-search"></i>
                    </SpinnerButton>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={OnChangeHandler}
                    value={term}
                />
                {results && term.trim() !== "" && (
                    <div style={dropdownStyle}>
                        {results.length ? (
                            results.map((lawyer, i) => {
                                return (
                                    <div className="inline-search-result" key={i}>
                                        <a href="#" onClick={() => StartChat(lawyer.id)}>
                                            <Img
                                                alt={lawyer.full_name}
                                                className="rounded-circle"
                                                src={
                                                    lawyer.account
                                                        .profile_picture
                                                }
                                                style={imgStyle}
                                            />
                                            <b>
                                                {lawyer.account.full_name}
                                            </b>
                                            <span className="text-muted text-sm ml-3">
                                                {lawyer.lawyer_type.type}
                                            </span>
                                        </a>
                                    </div>
                                );
                            })
                        ) : (
                                <span className="d-block text-center p-3">
                                    <FaRegQuestionCircle />
                                &nbsp;no matches found
                                </span>
                            )}
                    </div>
                )}
            </div>
        </form>
    );
};
export default ResponsiveChatPage;
