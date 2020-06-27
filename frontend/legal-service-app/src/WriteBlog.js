import React, { useRef, useEffect } from "react";
import Stackedit from "stackedit-js";
import { FaPencilAlt } from "react-icons/fa";

const EditStyles = {
    backgroundColor: "#2c2c2c",
    padding: "5px",
    textAlign: "center",
    width: "100%",
    height:"60px",
};

const ButtonStyles = {
    background: "transparent",
    borderColor: "transparent",
};

const WriteBlog = () => {
    const md_initial = [
        `
# This is a header
## This is a sub header
This is **bold**,  _italic_ and ~~strikethrough text~~.

> Blockquote

| Table| header|
|--|--|
| content| here|
## ordered list
 1. item 1
 2. item 2
 3. item 3
 ## unordered list
 - item 1
 - item 2
 - item 3
## check list
 - [ ] item 1
 - [x] item 2 _checked_
 - [ ] item 3

`,
    ];
    const md_preview = useRef(null);
    const md_content = useRef(null);

    const stackedit = new Stackedit();

    const handleClick = () => {
        stackedit.openFile({
            name: "blog post",
            content: {
                text: md_content.current.value,
                html: md_content.current.innerHTML,
            },
        });
    };

    stackedit.on("fileChange", (file) => {
        md_content.current.value = file.content.text;
        md_preview.current.innerHTML = file.content.html;
    });

    // stackedit.on("fileClose", (file) => {
    //     md_content.current.value = file.content.text;
    //     md_preview.current.innerHTML = file.content.html;
    // });

    return (
        <div>
            <div style={EditStyles} onClick={handleClick}>
                <button
                    className="btn btn-primary"
                    style={ButtonStyles}
                    onClick={handleClick}
                >
                    <FaPencilAlt />
                    &nbsp;Edit content
                </button>
                <textarea
                    className="form-control"
                    style={{ height: "800px" }}
                    value={md_initial}
                    ref={md_content}
                    style={{ visibility: "hidden" }}
                ></textarea>
            </div>
            <div
                className="p-4"
                style={{ backgroundColor: "white" }}
                id="md-preview"
                ref={md_preview}
            ></div>
        </div>
    );
};

export default WriteBlog;
