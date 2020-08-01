import React, {useState, useEffect} from "react"
import "./assets/css/VideoComponent.css"
import {FaPhoneSlash, FaMicrophoneSlash, FaMicrophone, FaChevronLeft, FaConnectdevelop, FaPlug} from "react-icons/fa"
import {BsChatSquareQuote} from "react-icons/bs"
import {connect, createLocalTracks} from "twilio-video"
import {toast} from "react-toastify"
import ResponsiveChatPage from "./ResponsiveChatPage"
import useRequests from "./useRequests"
import Countdown, {zeroPad} from "react-countdown";
import LoadingOverlay from "react-loading-overlay"
import bootbox from "bootbox"


const VideoComponent = ({appointment_id}) => {
    const [isMuted, setIsMuted] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [roomSID, setRoomSID] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [room, setRoom] = useState(null);
    const [localTracks, setLocalTracks] = useState(null);
    const [chatId, setChatId] = useState(null);
    const [appointmentEnd, setAppointmentEnd] = useState(new Date());
    const [isConnected, setIsConnected] = useState(false);
    const [connectedParticipantsCount, setConnectedParticipantsCount] = useState(1);

    const {request} = useRequests();

    const handleSoundControl = () => {
        setIsMuted(!isMuted);
    };
    const handleChatToggle = () => {
        setShowChat(!showChat);
    };
    const disconnectRoom = () => {
        if (room !== null) {
            unpublishLocalTracks();
            room.disconnect();
            setIsConnected(false);
        }
    }
    const handleDisconnection = () => {
        bootbox.confirm({
            title: 'Confirm',
            message: 'Are you sure you would like to disconnect from the room?',
            callback: (result) => {
                if (result) {
                    disconnectRoom();
                }
            }
        });
    };

    useEffect(() => {
        if (room === null) {
            return;
        }
        if (isMuted) {
            room.localParticipant.audioTracks.forEach(publication => {
                publication.track.disable();
            });
        } else {
            room.localParticipant.audioTracks.forEach(publication => {
                publication.track.enable();
            });
        }
    }, [room, isMuted]);

    const connectToRoom = () => {
        request({
            url: `/appointment/${appointment_id}/get-room-access-token`,
            method: "GET"
        }).then((response) => {
            console.log(response);
            setRoomSID(response.room_sid);
            setAccessToken(response.access_token);
            setChatId(response.chat_id);
            setAppointmentEnd(new Date(response.appointment_end));
        }).catch((error) => {
            toast.warn("It's not the appointment time, you will not be connected");
        });
    }

    useEffect(() => {
        connectToRoom();
    }, []);

    useEffect(() => {
        if (roomSID === null || accessToken === null || localTracks === null) {
            return;
        }
        connect(accessToken, {sid: roomSID, tracks: localTracks}).then(room => {
            console.log(`Successfully joined a Room: ${room}`);
            setRoom(room);
            setIsConnected(true);
        }, error => {
            console.error(`Unable to connect to Room: ${error.message}`);
            console.log(error);
            toast.error("An error occurred connecting to the room");
        });

        return () => {
            disconnectRoom();
        };
    }, [roomSID, accessToken, localTracks]);

    useEffect(() => {
        if (room === null) {
            return;
        }

        const attachTrack = (track) => {
            if (track.kind === "audio") {
                [...document.getElementsByClassName('incomingAudio')].map((el) => {el.remove()});
                const elem = track.attach();
                elem.className = 'incomingAudio';
                document.getElementById('incomingMedia').appendChild(elem);
            } else {
                [...document.getElementsByClassName('incomingVideo')].map((el) => {el.remove()});
                const elem = track.attach();
                elem.className = 'incomingVideo';
                document.getElementById('incomingMedia').appendChild(elem);
            }
            setConnectedParticipantsCount(connectedParticipantsCount + 1);
        };

        // Handle participants already in room
        room.participants.forEach(participant => {
            console.log(`Participant "${participant.identity}" is connected to the Room`);

            participant.tracks.forEach(publication => {
                if (publication.track) {
                    attachTrack(publication.track);
                }
            });

            participant.on('trackSubscribed', track => {
                attachTrack(track);
            });

            participant.on('trackSubscribed', track => {
                attachTrack(track);
            });
        });

        // Handle newly connected participants
        room.on('participantConnected', participant => {
            console.log(`A remote Participant connected: ${participant}`);

            participant.tracks.forEach(publication => {
                if (publication.isSubscribed) {
                    attachTrack(publication.track);
                }
            });

            participant.on('trackSubscribed', track => {
                attachTrack(track);
            });
        });

        // Handle participants disconnecting from the room
        room.once('participantDisconnected', participant => {
            console.log(`Participant "${participant.identity}" has disconnected from the Room`);
            [...document.getElementsByClassName('incomingAudio')].map((el) => {el.remove()});
            [...document.getElementsByClassName('incomingVideo')].map((el) => {el.remove()});
            toast.info("Participant disconnected from the room");
            setConnectedParticipantsCount(connectedParticipantsCount - 1);
        });

        room.on('disconnected', room => {
            // Detach the local media elements
            room.localParticipant.tracks.forEach(publication => {
                const attachedElements = publication.track.detach();
                attachedElements.forEach(element => element.remove());
            });
        });
    }, [room]);

    // Start reading camera
    const publishLocalTracks = async () => {
        await navigator.mediaDevices.enumerateDevices().then(devices => {
            const videoInput = devices.find(device => device.kind === 'videoinput');
            const audioInput = devices.find(device => device.kind === 'audioinput');
            return createLocalTracks({audio: {deviceId: audioInput.deviceId}, video: {deviceId: videoInput.deviceId}});
        }).then(tracks => {
            setLocalTracks(tracks);
            const localMediaContainer = document.getElementById('outgoingVideo');
            tracks.map(track => {
                localMediaContainer.appendChild(track.attach());
            });
        });
    }

    const unpublishLocalTracks = () => {
        if (room !== null) {
            room.localParticipant.videoTracks.forEach(publication => {
                publication.track.stop();
                publication.unpublish();
            });
        }
    }
    useEffect(() => {
        if (room === null) {
            return;
        }
        publishLocalTracks();
        return unpublishLocalTracks;
    }, [room]);
    const notify = () => {
        toast.info("A new message has arrived");
    }
    return (
        <>
            <div class="row no-gutters" style={{height: '75vh'}}>
                <div class="col">
                    <div className="stream" id="incomingMedia">
                        <LoadingOverlay
                            active={(!isConnected) || (isConnected && connectedParticipantsCount <= 1)}
                            spinner={room === null || (isConnected && connectedParticipantsCount <= 1)}
                            text={isConnected ? "Please wait while the other party connects to the room" : room === null ? "Connecting to room" : "You are disconnected"}
                            styles={{
                                overlay: (base) => ({
                                    ...base,
                                    position: 'relative',
                                    zIndex: '2',
                                }),
                                wrapper: (base) => ({
                                    ...base,
                                    height: '100%',
                                    width: '100%',
                                    position: 'absolute'
                                })
                            }}
                        >
                        </LoadingOverlay>
                        <div className="controls">
                            <div className={"buttons " + (showChat ? 'd-none' : 'd-flex') + " d-lg-flex"}>
                                <Countdown
                                    date={appointmentEnd}
                                    renderer={(props) => {
                                        // Notice if only 5 minutes left
                                        if (props.hours === 0 && props.minutes === 5 && props.seconds === 0) {
                                            toast.info("This room will end automatically in 5 minutes.");
                                        }
                                        return (<span className="call-count-down"> {zeroPad(props.hours)}:{zeroPad(props.minutes)}:{zeroPad(props.seconds)} </span>);
                                    }}
                                />
                                {!isConnected && room !== null && <button class="btn btn-dark" title="Join room" onClick={() => {
                                    setRoom(null);
                                    publishLocalTracks().then(() => {
                                        connectToRoom();
                                    });
                                }}><FaPlug /></button>}
                                <button class="btn btn-info d-lg-none" onClick={handleChatToggle} title="Chat"><BsChatSquareQuote /></button>
                                <button class="btn btn-danger" onClick={handleDisconnection} title="Hangup"><FaPhoneSlash /></button>
                                <button class="btn btn-primary" onClick={handleSoundControl} title={isMuted ? "Unmute" : "Mute"}>{isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}</button>
                            </div>
                        </div>
                        <div className="outgoing" id="outgoingVideo"> </div>
                    </div>
                </div>
                <div className={"col-12 col-md-6 col-lg-4 " + (showChat ? 'd-block' : 'd-none') + " d-lg-block"}>
                    <button onClick={handleChatToggle} className="btn btn-primary btn-block d-lg-none"><FaChevronLeft /></button>
                    {chatId !== null && <ResponsiveChatPage list_chats={false} initialSelectedChat={chatId} showContent={true} notify={notify} />}
                </div>
            </div>
        </>
    );
};


export default VideoComponent;
