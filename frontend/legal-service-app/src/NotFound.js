import React from "react";

const NotFound = () => {
    const ImgStyle = {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
        width: "100%",
        height: " auto",
    };
    return (
        <div
            style={{
                backgroundColor: "#fff",
            }}
        >
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    pointerEvents: "auto",
                    backgroundColor: "#fff",
                    backgroundClip: "padding-box",
                    borderRadius: ".3rem",
                    outline: "0",
                    width: "50%",
                    margin: "auto",
                }}
            >
                <img src="/undraw_page_not_found_su7k.svg" style={ImgStyle} />
            </div>
        </div>
    );
};
export default NotFound;
