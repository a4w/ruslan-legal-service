import React, {useState, useEffect} from "react"
import "./assets/css/VideoComponent.css"
import {FaPhoneSlash, FaVolumeMute, FaVolumeOff} from "react-icons/fa"
import {BsChatSquareQuote} from "react-icons/bs"
import {connect, createLocalVideoTrack} from "twilio-video"
import {request} from "./Axios.js"
import {toast} from "react-toastify"


const VideoComponent = ({appointment_id}) => {
    const [isMuted, setIsMuted] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [roomSID, setRoomSID] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [room, setRoom] = useState(null);
    const handleSoundControl = () => {
        setIsMuted(!isMuted);
    };
    const handleChatToggle = () => {
        setShowChat(!showChat);
    };

    useEffect(() => {
        request({
            url: `/appointment/${appointment_id}/get-room-access-token`,
            method: "GET"
        }).then((response) => {
            setRoomSID(response.room_sid);
            setAccessToken(response.access_token);
        }).catch((error) => {
            toast.warn("It's not the appointment time, you will not be connected");
        });
    }, []);

    useEffect(() => {
        if (roomSID === null || accessToken === null) {
            return;
        }
        connect(accessToken, {sid: roomSID, video: {width: 400}, audio: true}).then(room => {
            console.log(`Successfully joined a Room: ${room}`);
            setRoom(room);
        }, error => {
            console.error(`Unable to connect to Room: ${error.message}`);
            console.log(error);
            toast.error("An error occurred connecting to the room");
        });

        return () => {
            room.disconnet();
        };
    }, [roomSID, accessToken]);

    useEffect(() => {
        if (room === null) {
            return;
        }

        // Handle participants already in room
        room.participants.forEach(participant => {
            console.log(`Participant "${participant.identity}" is connected to the Room`);

            participant.tracks.forEach(publication => {
                if (publication.track) {
                    document.getElementById('incomingVideo').appendChild(publication.track.attach());
                }
            });

            participant.on('trackSubscribed', track => {
                document.getElementById('incomingVideo').appendChild(track.attach());
            });
        });

        // Handle newly connected participants
        room.on('participantConnected', participant => {
            console.log(`A remote Participant connected: ${participant}`);

            participant.tracks.forEach(publication => {
                if (publication.isSubscribed) {
                    const track = publication.track;
                    document.getElementById('incomingVideo').appendChild(track.attach());
                }
            });

            participant.on('trackSubscribed', track => {
                document.getElementById('incomingVideo').appendChild(track.attach());
            });
        });

        // Handle participants disconnecting from the room
        room.once('participantDisconnected', participant => {
            console.log(`Participant "${participant.identity}" has disconnected from the Room`);
        });



    }, [room]);

    // Start reading camera
    useEffect(() => {
        createLocalVideoTrack({
            audio: true,
            video: 640
        }).then(track => {
            const localMediaContainer = document.getElementById('outgoingVideo');
            localMediaContainer.appendChild(track.attach());
        });
    }, []);

    return (
        <>
            <div class="row no-gutters">
                <div class="col">
                    <div className="stream" id="incomingVideo">
                        <div className="controls">
                            <div className="buttons">
                                <button class="btn btn-info" onClick={handleChatToggle}><BsChatSquareQuote /></button>
                                <button class="btn btn-danger"><FaPhoneSlash /></button>
                                <button class="btn btn-primary" onClick={handleSoundControl}>{isMuted ? <FaVolumeOff /> : <FaVolumeMute />}</button>
                            </div>
                        </div>
                        <div className="outgoing" id="outgoingVideo"> </div>
                    </div>
                </div>
                <div className={"col-12 col-md-6 col-lg-4 " + (showChat ? 'd-block' : 'd-none')}>
                    Chat
                </div>
            </div>
        </>
    );
};


export default VideoComponent;
