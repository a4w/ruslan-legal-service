import axios from "axios";

axios.defaults.headers.common = {
    headers: {
        "Content-Type": "application/json",
        Accept: "appliation/json",
    },
};

export default axios;
