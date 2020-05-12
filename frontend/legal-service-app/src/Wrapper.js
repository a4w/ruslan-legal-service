import React from "react";

const Wrapper = (props) => {
    return (
        <div className='content'>
            <div className='container-fluid'>
                {props.children}
            </div>
        </div>
    );
};
export default Wrapper;
