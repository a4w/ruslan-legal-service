import React, {useState, useEffect} from "react";
import "./App.css";
import {Route, Router, Switch, Redirect, useLocation} from "react-router-dom";
import history from "./History";
import "bootstrap/dist/js/bootstrap.bundle"
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "tempusdominus-bootstrap/build/css/tempusdominus-bootstrap.css";
import "./assets/css/datepicker.css";
import "./assets/css/style.css";
import LoadingOverlay from "react-loading-overlay"
import {useCookies} from "react-cookie"
import moment from "moment"
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import ScrollToTop from "./ScrollToTop";

export const LoadingOverlayContext = React.createContext(null);
export const AuthContext = React.createContext(null);
export const NotificationContext = React.createContext(null);

function App() {
    const [isLoadingOverlayShown, setIsLoadingOverlayShown] = useState(false);
    const [loadingOverlayText, setLoadingOverlayText] = useState("Loading...");
    const [notificationsState, setNotificationsState] = useState({
        shouldNotNotify: () => {return false}
    });

    const [cookies, setCookie,] = useCookies(['accessToken', 'accountType', 'refreshToken', 'isLoggedIn', 'accountId']);

    // Attempt loading persistent data
    const defaultAuthState = {
        accessToken: cookies.accessToken || null,
        accountType: cookies.accountType || null,
        refreshToken: cookies.refreshToken || null,
        isLoggedIn: (cookies.isLoggedIn === "true") || false,
        accountId: cookies.accountId || null
    };
    const [auth, setAuth] = useState(defaultAuthState);

    useEffect(() => {
        const persistent_cookies = ['refreshToken'];
        for (const key in auth) {
            let config = {
                path: '/'
            };
            if (persistent_cookies.includes(key)) {
                config.expires = moment().add(30, "days").toDate();
            }
            setCookie(key, auth[key], config);
        }
    }, [auth])

    return (
        <>
            <AuthContext.Provider value={[auth, setAuth]}>
                <NotificationContext.Provider value={{notificationsState, setNotificationsState}}>
                    <LoadingOverlayContext.Provider value={{isLoadingOverlayShown, setIsLoadingOverlayShown, loadingOverlayText, setLoadingOverlayText}}>
                        <LoadingOverlay
                            active={isLoadingOverlayShown}
                            spinner
                            text={loadingOverlayText}
                            styles={{
                                overlay: (base) => ({
                                    ...base,
                                    position: 'fixed',
                                }),
                                wrapper: (base) => ({
                                    ...base,
                                    zIndex: '99999',
                                })
                            }}
                        ></LoadingOverlay>
                        <ToastContainer />
                        <Router history={history}>
                            <ScrollToTop />
                            <Switch>
                                <Route path="/admin" component={AdminRoutes} />
                                <Route path="/" component={UserRoutes} />
                            </Switch>
                        </Router>
                    </LoadingOverlayContext.Provider>
                </NotificationContext.Provider>
            </AuthContext.Provider>
        </>
    );
}

export default App;
