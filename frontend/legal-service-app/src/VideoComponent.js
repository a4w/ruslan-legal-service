import React, {useState, useEffect} from "react"
import "./assets/css/VideoComponent.css"
import {FaPhoneSlash, FaVolumeMute, FaVolumeOff} from "react-icons/fa"
import {BsChatSquareQuote} from "react-icons/bs"
import {createLocalVideoTrack} from "twilio-video"


const VideoComponent = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const handleSoundControl = () => {
        setIsMuted(!isMuted);
    };
    const handleChatToggle = () => {
        setShowChat(!showChat);
    };

    // Start reading camers
    useEffect(() => {
        createLocalVideoTrack().then(track => {
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
