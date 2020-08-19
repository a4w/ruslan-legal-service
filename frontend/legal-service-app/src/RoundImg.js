import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const RoundImg = ({ diameter = 170, src, alt }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            "& > *": {
                height: diameter,
                width: diameter,
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

export default RoundImg;
