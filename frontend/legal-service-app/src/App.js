import React, {useState, useEffect} from "react";
import "./App.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Route, Router, Switch, BrowserRouter, Redirect} from "react-router-dom";
import history from "./History";
import "bootstrap/dist/js/bootstrap.bundle"
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import LawyerList from "./LawyerList";
import Blogs from "./Blogs";
import ResetPassword from "./ResetPassword";
import Home from "./Home";
import LawyerDashboard from "./LawyerDashboard";
import LawyerProfile from "./LawyerProfile";
import ClientDashboard from "./ClientDashboard";
import ForgotPassword from "./ForgotPassword";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoComponent from "./VideoComponent";
import "tempusdominus-bootstrap/build/css/tempusdominus-bootstrap.css";
import "./assets/css/datepicker.css";
import "./assets/css/style.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Cookies from "universal-cookie";
import UserCalendar from "./UserCalendar";
import BookLawyerModal from "./BookLawyerModal";
import BlogDetails from "./BlogDetails"
import ResponsiveChatPage from "./ResponsiveChatPage";
import RatingModal from "./RatingModal";
import NotFound from "./NotFound";
import LoadingOverlay from "react-loading-overlay"
import AppointmentDetails from "./AppointmentDetails";
import PrivateRoute from "./PrivateRoute";
import {useCookies} from "react-cookie"

const cookie = new Cookies();

export const LoadingOverlayContext = React.createContext(null);
export const AuthContext = React.createContext(null);

function App() {
    const [cookies, ,] = useCookies(['access_token', 'logged_in', 'refresh_token', 'account_type']);
    const [isLoadingOverlayShown, setIsLoadingOverlayShown] = useState(false);
    const [loadingOverlayText, setLoadingOverlayText] = useState("");

    const [auth, setAuth] = useState({
        accessToken: cookies.access_token,
        refreshToken: cookies.refresh_token,
        isLoggedIn: cookies.logged_in === "true",
        isClient: cookies.account_type === "CLIENT"
    });

    useEffect(() => {
        setAuth({
            accessToken: cookies.access_token,
            refreshToken: cookies.refresh_token,
            isLoggedIn: cookies.logged_in === "true",
            isClient: cookies.account_type === "CLIENT"
        });
    }, [cookies])

    return (
        <>
            <AuthContext.Provider value={{auth, setAuth}}>
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
                    >
                    </LoadingOverlay>
                    <BrowserRouter>
                        <ToastContainer />
                        <Router history={history}>
                            {/* <NavBar /> */}
                            <Route component={NavBar} />
                            <Route path="(.+)/login" render={(props) => {
                                if (cookie.get('logged_in')) {
                                    return <Redirect to={props.match.params[0]} />
                                } else {
                                    return <LoginModal back={props.match.params[0]} />
                                }
                            }} />
                            <Route path="(.+)/register" render={(props) => {
                                if (cookie.get('logged_in')) {
                                    return <Redirect to={props.match.params[0]} />
                                } else {
                                    return <RegisterModal back={props.match.params[0]} />
                                }
                            }} />
                            <Route path="(.+)/book-lawyer/:LawyerId" component={BookLawyerModal} />
                            <Route path="(.+)/rate-lawyer/:appId/:lawyerId" component={RatingModal} />
                            <Route path="(.+)/details/:appId" component={AppointmentDetails} />
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/home" />
                                </Route>
                                <Route path="/home">
                                    <Home />
                                </Route>
                                <Route path="/list">
                                    <LawyerList />
                                </Route>
                                <Route path="/blogs">
                                    <Route path="/blogs" component={Blogs} />
                                </Route>

                                <Route path="/blog/:blogId" component={BlogDetails} />
                                <Route
                                    exact
                                    path="/reset/:Token"
                                    component={ResetPassword}
                                />
                                <PrivateRoute path="/dashboard" component={LawyerDashboard} />
                                <Route
                                    path="/profile/:LawyerId"
                                    component={LawyerProfile}
                                />
                                <PrivateRoute path="/client-dashboard" component={ClientDashboard} />
                                <Route path="/forgot-password">
                                    <ForgotPassword />
                                </Route>
                                <PrivateRoute path="/chat" component={ResponsiveChatPage} />
                                <Route path="/video/:AppointmentId" render={(props) => {
                                    return <VideoComponent appointment_id={props.match.params.AppointmentId} />;
                                }}>
                                </Route>
                                <Route path="/logout">
                                    <Redirect replace to="/" />
                                </Route>
                                <Route path="/calendar">
                                    <UserCalendar />
                                </Route>
                                <Route path="/not-found">
                                    <NotFound />
                                </Route>
                                <Route>
                                    <Redirect replace to="/not-found" />
                                </Route>
                            </Switch>
                            <Route component={Footer} />
                            {/* <Footer /> */}
                        </Router>
                    </BrowserRouter>
                </LoadingOverlayContext.Provider>
            </AuthContext.Provider>
        </>
    );
}

export default App;
