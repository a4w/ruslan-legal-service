import React from "react";

const Img = ({src, className, alt, style}) => {
    const OnError = (e) => {
        e.target.src = "/undraw_male_avatar.svg";
        e.target.onError = null;
    };
    return (
        <img
            src={src ? src : ""}
            className={className ? className : ""}
            alt={alt ? alt : "img"}
            style={{height: '100%', maxWidth: '100%', width: 'unset', margin: 'auto', display: 'block', ...style}}
            onError={OnError}
        />
    );
}
export default Img;
