import Config from "./Config"
import {useEffect, useContext} from "react";
import {AuthContext} from "./App";
import {useHistory, useRouteMatch} from "react-router";
import axios from "axios";
import {useCookies} from "react-cookie"

const axiosClient = axios.create({
    baseURL: Config.api_url,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

function useRequests() {

    const auth = useContext(AuthContext);
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'logged_in', 'refresh_token', 'account_type']);
    const history = useHistory();
    const routeMatch = useRouteMatch();

    useEffect(() => {
        console.log("Updating accessToken");
        console.log(auth);
        axiosClient.defaults.headers.common = {
            Authorization: `Bearer ${auth.accessToken}`,
        };
    }, [auth]);

    function requireLogin() {
        deleteAllCookies();
        if (routeMatch.params[routeMatch.params.length - 1] === "login") {
            history.push(routeMatch.params[0]);
        }
    }

    function deleteAllCookies() {
        removeCookie("logged_in");
        removeCookie("access_token");
        removeCookie("refresh_token");
        removeCookie("account_type");
    }

    function refreshAccessToken() {
        return new Promise((resolve, reject) => {
            if (auth.refreshToken) {
                const data = {
                    refresh_token: auth.refreshToken
                };
                axiosClient.request({
                    method: "POST",
                    url: "/auth/refresh",
                    data: data,
                }).then((response) => {
                    setCookie("access_token", response.data.access_token);
                    setCookie("account_type", response.data.account_type);
                    setCookie("logged_in", true);
                    resolve();
                }).catch(() => {
                    reject();
                });
            } else {
                reject();
            }
        });
    }

    function Logout() {
        request({
            url: 'auth/logout',
            method: 'POST',
            data: null
        }).finally(() => {
            deleteAllCookies();
        })
    }

    async function request(options) {
        const onSuccess = (response) => {
            return Promise.resolve(response.data);
        };
        const onError = (error) => {
            if (error) {
                const status = error.response.request.status;
                // Unauthorized request
                if (status === 401) {
                    // If there is a refresh token then refresh
                    refreshAccessToken().catch(requireLogin);
                } else if (status === 403) { // Forbidden
                    requireLogin();
                } else {
                    // Some other normal error occurred
                }
            } else {
                console.error(error);
            }
            return Promise.reject(error);
        }
        return await axiosClient.request(options).then(onSuccess).catch(onError);
    }

    return {request, Logout};
}

export default useRequests;
