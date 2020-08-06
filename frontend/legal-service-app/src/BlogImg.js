import React from "react";

const BlogImg = ({src, className, alt, style, containerStyle}) => {
    return (
        <div
            style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                ...containerStyle,
            }}
        >
            <img
                src={src ? src : "/blog-02.jpg"}
                className={className ? className : ""}
                alt={alt ? alt : "img"}
                style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    width: "unset",
                    margin: "auto",
                    display: "block",
                    ...style,
                }}
            />
        </div>
    );
}
export default BlogImg;
