import axios from "axios";
import Config from "./Config";

const client = axios.create({
    baseURL: Config.api_url,
    headers: {
        "Content-Type": "application/json",
        Accept: "appliation/json",
    },
});

const setAccessToken = (access_token) => {
    console.log("Set Successful!", access_token);
    client.defaults.headers.common.headers = {
        access_token: `Bearer ${access_token}`,
    };
    console.log("Set Successful!", client.defaults.headers.common.headers);
};

const request = function (options) {
    const onSuccess = function (response) {
        console.log("Request Successful!", response);
        return response.data;
    };

    const onError = function (error) {
        console.error("Request Failed:", error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            console.error("Headers:", error.response.headers);
        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.error("Error Message:", error.message);
        }
        if (error.response.data) return error.response.data;
        return Promise.reject(error.response.data || error.message);
    };

    return client(options).then(onSuccess).catch(onError);
};

export { request, setAccessToken };

// axios.defaults.headers.common = {
//     "Content-Type": "application/json",
//     Accept: "appliation/json",
// };

// export default axios;
