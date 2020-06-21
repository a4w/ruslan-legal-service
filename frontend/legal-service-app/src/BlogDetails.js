import React from "react";

const BlogDetails = () => {
    return <Post />;
};
const Post = () => {
    return (
        <div className="blog blog-single-post">
            <div className="blog-image">Blog Image</div>
            <h3 className="blog-title">Blog Title</h3>
            <div className="blog-info clearfix">
                <div className="post-left">
                    <ul>
                        <li>
                            <div className="post-author">
                                <a href="doctor-profile.html">
                                    {/* <img
                                        src="assets/img/doctors/doctor-thumb-02.jpg"
                                        alt="Post Author"
                                    />{" "} */}
                                    <span>Lawyer name</span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <i className="far fa-calendar"></i>Publish date
                        </li>
                        <li>
                            <i className="fa fa-tags"></i> Tag
                        </li>
                    </ul>
                </div>
            </div>
            <div className="blog-content">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                </p>
                <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas molestias excepturi sint
                    occaecati cupiditate non provident, similique sunt in culpa
                    qui officia deserunt mollitia animi, id est laborum et
                    dolorum fuga. Et harum quidem rerum facilis est et expedita
                    distinctio. Nam libero tempore, cum soluta nobis est
                </p>
            </div>
        </div>
    );
};
export default BlogDetails;
