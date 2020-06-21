import axios from "axios";
import Config from "./Config";
import Cookies from "universal-cookie";
import history from "./History";

const cookie = new Cookies();
const access_token = cookie.get('access_token');
const client = axios.create({
    baseURL: Config.api_url,
    headers: {
        "Content-Type": "application/json",
        Accept: "appliation/json",
        Authorization: `Bearer ${access_token}`
    },
});

const setAccessToken = (access_token) => {
    console.log("Set Successful!", access_token);
    client.defaults.headers.common.headers = {
        Authorization: `Bearer ${access_token}`,
    };
    cookie.set("access_token", access_token);
    console.log("Set Successful!", client.defaults.headers.common.headers);
};

const setRefreshToken = (refresh_token) => {
    cookie.set("refresh_token", refresh_token, {
        path: "/",
    });
    console.log("Set Successful!", cookie.get("refresh_token"));
};

const onRefreshSuccess = (response) => {
    // Refresh access token and redo request
    setAccessToken(response.data.access_token);
    request(response.config);
};
const onRefreshError = (error) => {
    // Remove refresh token cookie and redirect to login
    cookie.remove("refresh_token");
    history.push("/login");
};
const request = function (options) {
    const onSuccess = function (response) {
        console.log("Request Successful!", response);
        console.log("Config", response.config);
        return response.data;
    };

    const onError = function (error) {
        console.error("Request Failed:", error.config);
        if (error.response) {
            const status = error.response.status;
            if (
                status === 401 &&
                client.defaults.headers.common.headers.access_token
            ) {
                // If there is a refresh token then refresh
                const refresh_token = cookie.get("refresh_token");
                if (refresh_token)
                    return client({
                        method: "POST",
                        url: "/auth/refresh",
                        refresh_token: refresh_token,
                    })
                        .then(onRefreshSuccess)
                        .catch(onRefreshError);
            } else {
                // Else push to login
                history.push("/login");
            }
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            console.error("Headers:", error.response.headers);
        } else {
            console.error("Error Message:", error.message);
        }
        return Promise.reject(error.response.data);
    };

    return client(options).then(onSuccess).catch(onError);
};

export {request, setAccessToken, setRefreshToken};
