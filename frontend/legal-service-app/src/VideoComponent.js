import React, {useState, useEffect} from "react"
import "./assets/css/VideoComponent.css"
import {FaPhoneSlash, FaMicrophoneSlash, FaMicrophone, FaChevronLeft} from "react-icons/fa"
import {BsChatSquareQuote} from "react-icons/bs"
import {connect, createLocalTracks} from "twilio-video"
import {toast} from "react-toastify"
import ResponsiveChatPage from "./ResponsiveChatPage"
import useRequests from "./useRequests"


const VideoComponent = ({appointment_id}) => {
    const [isMuted, setIsMuted] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [roomSID, setRoomSID] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [room, setRoom] = useState(null);
    const [localTracks, setLocalTracks] = useState(null);
    const [chatId, setChatId] = useState(null);

    const {request} = useRequests();

    const handleSoundControl = () => {
        setIsMuted(!isMuted);
    };
    const handleChatToggle = () => {
        setShowChat(!showChat);
    };
    const handleDisconnection = () => {
        if (room !== null) {
            room.localParticipant.videoTracks.forEach(publication => {
                publication.track.stop();
                publication.unpublish();
            });
            room.disconnect();
        }
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

    useEffect(() => {
        request({
            url: `/appointment/${appointment_id}/get-room-access-token`,
            method: "GET"
        }).then((response) => {
            console.log(response);
            setRoomSID(response.room_sid);
            setAccessToken(response.access_token);
            setChatId(response.chat_id);
        }).catch((error) => {
            toast.warn("It's not the appointment time, you will not be connected");
        });
    }, []);

    useEffect(() => {
        if (roomSID === null || accessToken === null || localTracks === null) {
            return;
        }
        connect(accessToken, {sid: roomSID, tracks: localTracks}).then(room => {
            console.log(`Successfully joined a Room: ${room}`);
            setRoom(room);
        }, error => {
            console.error(`Unable to connect to Room: ${error.message}`);
            console.log(error);
            toast.error("An error occurred connecting to the room");
        });

        return () => {
            handleDisconnection();
            toast.info("You are now disconnected from the room");
            // Redirect
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
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(devices => {
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
    }, []);

    return (
        <>
            <div class="row no-gutters">
                <div class="col">
                    <div className="stream" id="incomingMedia">
                        <div className="controls">
                            <div className="buttons">
                                <button class="btn btn-info" onClick={handleChatToggle}><BsChatSquareQuote /></button>
                                <button class="btn btn-danger" onClick={handleDisconnection}><FaPhoneSlash /></button>
                                <button class="btn btn-primary" onClick={handleSoundControl}>{isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}</button>
                            </div>
                        </div>
                        <div className="outgoing" id="outgoingVideo"> </div>
                    </div>
                </div>
                <div className={"col-12 col-md-6 col-lg-4 " + (showChat ? 'd-block' : 'd-none')}>
                    <button onClick={handleChatToggle} className="btn btn-primary btn-block"><FaChevronLeft /></button>
                    <ResponsiveChatPage list_chats={false} initialSelectedChat={chatId} showContent={true} />
                </div>
            </div>
        </>
    );
};


export default VideoComponent;
