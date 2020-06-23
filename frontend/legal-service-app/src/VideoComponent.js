import React, {useState} from "react"
import "./assets/css/VideoComponent.css"
import {FaCheck, FaPhoneSlash, FaVolumeMute, FaTextWidth, FaFacebookMessenger, FaMailBulk, FaPhoneVolume, FaVolumeOff} from "react-icons/fa"
import {BsChatSquareQuote} from "react-icons/bs"


const VideoComponent = () => {
    const [isMuted, setIsMuted] = useState(true);
    const handleSoundControl = () => {
        setIsMuted(!isMuted);
    };

    return (
        <>
            <div class="row no-gutters">
                <div class="col-12 col-md-6 col-lg-8">
                    <div className="stream">
                        <div className="controls">
                            <div className="buttons">
                                <button class="btn btn-info"><BsChatSquareQuote /></button>
                                <button class="btn btn-outline btn-danger"><FaPhoneSlash /></button>
                                <button class="btn btn-primary" onClick={handleSoundControl}>{isMuted ? <FaVolumeOff /> : <FaVolumeMute />}</button>
                            </div>
                        </div>
                        <div className="outgoing"> </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-8">

                </div>
            </div>
        </>
    );
};


export default VideoComponent;
