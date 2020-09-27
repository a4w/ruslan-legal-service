import React from "react";

const Img = ({src, className, alt, style, overwrite = true}) => {
    const OnError = (e) => {
        e.target.src = "/undraw_male_avatar.svg";
        e.target.onError = null;
    };
    const ImgStyle = {maxHeight: '100%', maxWidth: '100%', margin: 'auto', display: 'block', ...style};
    return (
        <img
            src={src ? src : ""}
            className={className ? className : ""}
            alt={alt ? alt : "img"}
            style={overwrite ? ImgStyle : style}
            onError={OnError}
        />
    );
}

const AcImg = (props) => {
    const ImgStyle = {maxHeight: '100%', maxWidth: '100%', ...props.style};
    const accreditation = props.accreditation;
    return (
        <img
            {...props}
            alt={accreditation.accreditation}
            src={`/accreditation/ac_${accreditation.id}`}
            style={ImgStyle}
        />
    );
}
export default Img;
export {AcImg};
