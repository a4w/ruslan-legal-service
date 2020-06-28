import React, {useState, useEffect, useRef} from "react";
import { createPortal } from "react-dom";
import History from "./History";

const modalStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.2)",
    alignItems: "center",
    justifyContent: "center",
    color: "##FFF",
    display: "flex"
};
const ModalPortal = (props) => {
    return createPortal(
        <div
            style={modalStyle}
            onClick={props.onClick}
        >
            {props.children}
        </div>,
        document.getElementById("modal_root")
    );
};

const Modal = (props) => {
    const ref = useRef(null);
    const [clicked, setClickedOutside] = useState(false);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setClickedOutside(true);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    const OnClick = () => {
        if (clicked) History.goBack();
    };
    return (
        <ModalPortal onClick={OnClick}>
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    pointerEvents: "auto",
                    backgroundColor: "#fff",
                    backgroundClip: "padding-box",
                    border: "1px solid rgba(0,0,0,.2)",
                    borderRadius: ".3rem",
                    outline: "0",
                    width: "90%",
                    margin: "auto",
                }}
                ref={ref}
            >
                {props.children}
            </div>
        </ModalPortal>
    );
};

export default Modal;
