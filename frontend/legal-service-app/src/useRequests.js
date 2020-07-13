import Config from "./Config"
import {useEffect, useContext} from "react";
import {AuthContext} from "./App";
import {useHistory, useRouteMatch} from "react-router";
import axios from "axios";

const axiosClient = axios.create({
    baseURL: Config.api_url,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

function useRequests() {

    const [auth, setAuth] = useContext(AuthContext);
    const history = useHistory();
    const routeMatch = useRouteMatch();

    useEffect(() => {
        axiosClient.defaults.headers.common = {
            Authorization: `Bearer ${auth.accessToken}`,
        };
    }, [auth]);

    function requireLogin() {
        setAuth({...auth, isLoggedIn: false});
        if (routeMatch.params[routeMatch.params.length - 1] === "login") {
            history.push(routeMatch.params[0]);
        }
    }

    function fetchNewAccessToken() {
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
                    setAuth({
                        ...auth,
                        accessToken: response.data.access_token,
                        accountType: response.data.account_type,
                        isLoggedIn: true
                    });
                    resolve();
                }).catch(() => {
                    reject();
                });
            } else {
                reject();
            }
        });
    }

    function refreshAccessToken() {
        return new Promise((resolve, reject) => {
            axiosClient.request({
                method: "POST",
                url: "/auth/refresh-current-token"
            }).then((response) => {
                setAuth({
                    ...auth,
                    accessToken: response.data.access_token,
                    accountType: response.data.account_type,
                    isLoggedIn: true
                });
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    function Logout() {
        request({
            url: 'auth/logout',
            method: 'POST',
            data: null
        }).finally(() => {
            setAuth({});
        });
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
                    fetchNewAccessToken().catch(requireLogin);
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

    return {request, Logout, fetchNewAccessToken, refreshAccessToken};
}

export default useRequests;