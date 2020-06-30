import React, {useRef, useState, useEffect} from "react";
import Stackedit from "stackedit-js";
import {FaPencilAlt} from "react-icons/fa";
import ErrorMessageInput from "./ErrorMessageInput";
import Select from "react-dropdown-select";
import {request} from "./Axios"

const EditStyles = {
    backgroundColor: "#2c2c2c",
    padding: "5px",
    textAlign: "center",
    width: "100%",
    height: "60px",
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

    const loaderStackEdit = new Stackedit();

    const stackedit = new Stackedit();
    useEffect(() => {
        loaderStackEdit.openFile({
            name: "blog post",
            content: {
                text: md_initial[0]
            }
        }, true);

        loaderStackEdit.on("fileChange", (file) => {
            md_preview.current.innerHTML = file.content.html;
        });

    }, []);

    const handleClick = () => {
        stackedit.openFile({
            name: "blog post",
            content: {
                text: md_content.current.value,
                html: md_preview.current.innerHTML,
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
                    style={{height: "800px"}}
                    value={md_initial}
                    ref={md_content}
                    style={{visibility: "hidden"}}
                ></textarea>
            </div>
            <div
                className="p-4"
                style={{backgroundColor: "white"}}
                id="md-preview"
                ref={md_preview}
            ></div>
        </div>
    );
};

const BlogPage = () => {
    const [coverData, setCoverData] = useState({cover: "", coverFile: ""});
    const [title, setTitle] = useState("");
    const [tagOptions, setTagOptions] = useState([]);
    const [tags, selectedTags] = useState([]);
    const showSelectedCover = (e) => {
        const input = e.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCoverData({
                    cover: e.target.result,
                    coverFile: input.files[0],
                });
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    const dateString = (new Date()).toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    useEffect(() => {
        request({
            url: 'lawyer/practice-areas',
            method: 'GET'
        }).then(response => {
            const areas = response.areas.map((area, i) => {
                return {
                    label: area.area,
                    value: area.id
                };
            });
            setTagOptions(areas);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    return (
        <div className="blog blog-single-post">
            <div className="blog-image">
                <img alt="Cover" src={coverData.cover} className="img-fluid" style={{
                    maxHeight: '200px',
                    maxWidth: '100%',
                    width: 'unset',
                    margin: 'auto'
                }} />
            </div>
            <h3 className="blog-title">
                <ErrorMessageInput
                    placeholder="Title.."
                    type="text"
                    OnChangeHandler={({target: {value}}) => setTitle(value)}
                    value={title}
                />
            </h3>
            <div className="blog-info clearfix">
                <div className="post-left">
                    <ul>
                        <li>
                            <div className="post-author">
                                <div className="change-photo-btn">
                                    <span>
                                        <i className="fa fa-upload"></i> Upload
                                        Photo
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg,image/gif"
                                        onChange={showSelectedCover}
                                        className="upload"
                                    />
                                </div>
                            </div>
                        </li>
                        <li>
                            <i className="far fa-calendar"></i>
                            {dateString}
                        </li>
                        <li style={{display: "block ruby"}}>
                            <i className="fa fa-tags"></i>{" "}
                            <Select
                                options={tagOptions}
                                searchable
                                create={true}
                                values={tags}
                                onChange={(values) => {
                                    console.log(values);
                                    selectedTags(values);
                                }}
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="blog-content">
                <WriteBlog />
            </div>
            <button className="btn btn-primary">Submit blog for review</button>
        </div>
    );
};

export default BlogPage;
