import axios from "axios";
import Config from "./Config";
import Cookies from "universal-cookie";

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

const setRefreshToken = (refresh_token) => {
    const cookie = new Cookies();
    cookie.set("refresh_token", refresh_token, {
        path: "/",
    });
    console.log("Set Successful!", cookie.get("refresh_token"));
};

const request = function (options) {
    const onSuccess = function (response) {
        console.log("Request Successful!", response);
        return response.data;
    };

    const onError = function (error) {
        console.error("Request Failed:", error.config);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            console.error("Headers:", error.response.headers);
        } else {
            console.error("Error Message:", error.message);
        }
        // if (error.response.data) return error.response.data;
        return Promise.reject(error.response.data);
    };

    return client(options).then(onSuccess).catch(onError);
};

export { request, setAccessToken, setRefreshToken };
