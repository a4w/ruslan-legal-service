import React from "react";

const BlogImg = ({src, className, alt, style}) => {
    return (
        <img
            src={src ? src : "/blog-02.jpg"}
            className={className ? className : ""}
            alt={alt ? alt : "img"}
            style={{maxHeight: '100%', maxWidth: '100%', width: 'unset', margin: 'auto', display: 'block', ...style}}
        />
    );
}
export default BlogImg;
