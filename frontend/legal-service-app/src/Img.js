import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const Img = ({ height = 170, width = 170, src, alt }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            "& > *": {
                height: height,
                width: width,
            },
        },
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar alt={alt} src={src}>
                <img alt="error loading" src="/undraw_male_avatar.svg" />
            </Avatar>
        </div>
    );
};

const Clone = ({src, className, alt, style, overwrite = true}) => {
    const OnError = (e) => {
        e.target.src = "/undraw_male_avatar.svg";
        e.target.onError = null;
    };
    const ImgStyle = {maxHeight: '100%', maxWidth: '100%', margin: 'auto', display: 'block', ...style};
    return (
        <img
            src={src ? src : ""}
            className={className ? className : ""}
            alt={alt ? alt : "img"}
            style={overwrite ? ImgStyle : style}
            onError={OnError}
        />
    );
}
export default Img;
