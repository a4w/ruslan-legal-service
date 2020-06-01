import React, { useState } from "react";
import BlogList from "./BlogList";

const Blogs = () => {
    const blogs = [
        {
            id: "1",
        },
        {
            id: "2",
        },
        {
            id: "3",
        },
        {
            id: "4",
        },
        {
            id: "5",
        },
    ];
    return (
        <div className="row">
            <div className="col-lg-8 col-md-12">
                <BlogList blogs={blogs} />
            </div>
            <div className="col-lg-4 col-md-12 sidebar-right theiaStickySidebar">
                <Search />
            </div>
        </div>
    );
};

const Search = () => {
    const [searchInput, setSearchInput] = useState("");
    const OnChangeHandler = ({ target: { value } }) => {
        setSearchInput(value);
    };
    const OnSubmitHandler = (e) => {
        e.preventDefault();
    };
    return (
        <div className="card search-widget">
            <div className="card-body">
                <form className="search-form" onSubmit={OnSubmitHandler}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="form-control"
                            value={searchInput}
                            name="searchInput"
                            onChange={OnChangeHandler}
                        />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Blogs;
