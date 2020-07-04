import React from "react";

const Img = ({src, className, alt}) => {
    return (
        <img
            src={src ? src : "/undraw_male_avatar.svg"}
            className={className ? className : ""}
            alt={alt ? alt : "img"}
        />
    );
}
export default Img;