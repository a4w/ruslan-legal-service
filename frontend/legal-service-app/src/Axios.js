import axios from "axios";
import Config from "./Config";
import Cookies from "universal-cookie";
import history from "./History";
import moment from "moment";

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
    client.defaults.headers.common.headers = {
        Authorization: `Bearer ${access_token}`,
    };
    cookie.set("access_token", access_token);
    cookie.set("logged_in", true);
};
const setAccountType = (type) => {
    cookie.set("account_type", type);
};

const setRefreshToken = (refresh_token) => {
    cookie.set("refresh_token", refresh_token, {
        path: "/",
        expires: moment().add(30, "days").toDate()
    });
};

const onRefreshSuccess = (response) => {
    // Refresh access token and redo request
    setAccessToken(response.data.access_token);
    request(response.config);
};
const requireLogin = (error) => {
    console.log("Require login");
    // Remove refresh token cookie and redirect to login
    cookie.remove("refresh_token");
    cookie.remove("access_token");
    cookie.remove("logged_in");
    if (!history.location.pathname.endsWith("/login")) {
        history.push(history.location.pathname + '/login');
    }
};
const LogOut = (error) => {
    request({
        url: 'auth/logout',
        method: 'POST',
        data: null
    }).then(response => {

    }).catch(error => {
        console.log(error);
    }).finally(() => {
        cookie.remove("refresh_token");
        cookie.remove("access_token");
        cookie.remove("logged_in");
        history.push('/home/login');
        window.location.reload();
    });
    //history.push("/");
};

const refreshAccessToken = async () => {
    return new Promise((resolve, reject) => {
        const refresh_token = cookie.get("refresh_token");
        if (refresh_token) {
            client({
                method: "POST",
                url: "/auth/refresh",
                data: {refresh_token},
            }).then((response) => {
                onRefreshSuccess(response)
                resolve();
            }).catch(() => {
                reject();
            });
        } else {
            reject();
        }
    });
}

const request = function (options) {
    const onSuccess = function (response) {
        return response.data;
    };

    const onError = function (error) {
        if (error) {
            const status = error.response.request.status;
            // Unauthorized request
            if (status === 401) {
                // If there is a refresh token then refresh
                refreshAccessToken()
                    .catch(requireLogin);
            } else if (status === 403) { // Forbidden
                requireLogin();
            } else {
                // Some other normal error occurred
            }

            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            console.error("Headers:", error.response.headers);
        } else {
            console.error("Error Message:", error.message);
        }
        return Promise.reject(error);
    };

    return client(options).then(onSuccess).catch(onError);
};

export {request, setAccessToken, setRefreshToken, LogOut, setAccountType, refreshAccessToken};
