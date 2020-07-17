import React from "react";
import { FaSpinner } from "react-icons/fa";

const SpinnerButton = (props) => {
    const { loading, className, type = "submit", onClick } = { ...props };
    return (
        <button
            className={className + (loading ? " cursor-not-allowed" : "")}
            type={type}
            disabled={loading}
            onClick={onClick}
        >
            {loading && <FaSpinner className="icon-spin" />}
            &nbsp;{loading ? "" : props.children}
        </button>
    );
};

export default SpinnerButton;