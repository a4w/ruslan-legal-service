import React, {useState} from "react"
import "./assets/css/VideoComponent.css"
import {FaPhoneSlash, FaVolumeMute} from "react-icons/fa"
import {BsChatSquareQuote} from "react-icons/bs"


const VideoComponent = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const handleSoundControl = () => {
        setIsMuted(!isMuted);
    };
    const handleChatToggle = () => {
        setShowChat(!showChat);
    };

    return (
        <>
            <div class="row no-gutters">
                <div class="col">
                    <div className="stream">
                        <div className="controls">
                            <div className="buttons">
                                <button class="btn btn-info" onClick={handleChatToggle}><BsChatSquareQuote /></button>
                                <button class="btn btn-danger"><FaPhoneSlash /></button>
                                <button class="btn btn-primary" onClick={handleSoundControl}>{isMuted ? <FaVolumeOff /> : <FaVolumeMute />}</button>
                            </div>
                        </div>
                        <div className="outgoing"> </div>
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
