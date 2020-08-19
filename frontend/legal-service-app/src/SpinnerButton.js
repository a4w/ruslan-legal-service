import React from "react";
import { FaSpinner } from "react-icons/fa";

const SpinnerButton = (props) => {
    const { loading, className, type = "submit", onClick, style } = { ...props };
    return (
        <button
            className={className + (loading ? " cursor-not-allowed" : "")}
            type={type}
            disabled={loading}
            onClick={onClick}
            style={style}
        >
            {loading ? <FaSpinner className="icon-spin" /> : props.children}
        </button>
    );
};

export default SpinnerButton;