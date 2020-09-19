import React, {useState, useEffect, useContext} from "react";
import moment from "moment";
import "./UserCalendar.css";
import {toast} from "react-toastify";
import useRequests from "./useRequests";
import {AuthContext} from "./App";
import {Link} from "react-router-dom";
import History from "./History";
import LoadingOverlay from "react-loading-overlay";

const UserCalendar = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthAppointments, setMonthAppointments] = useState(null);
    const [loading, setLoading] = useState(true);

    const {request} = useRequests();
    const [auth,] = useContext(AuthContext);

    const nextMonth = () => {
        setCurrentDate(moment(currentDate).add(1, 'month').toDate());

    };
    const prevMonth = () => {
        setCurrentDate(moment(currentDate).subtract(1, 'month').toDate());
    };
    const onDateClick = (day) => {
        console.log(day);

        setSelectedDate(day);
    };
    useEffect(() => {
        const type = auth.accountType;
        if (type)
            request({
                url: `/${type.toLowerCase()}/appointments`,
                method: "GET",
            })
                .then((data) => {
                    setAppointments(data.appointments);
                })
                .catch(() => {
                    toast.error("An error occurred couldn't load appointments");
                })
                .finally(() => {
                    setLoading(false);
                });
        else toast.error("An error occurred couldn't load appointments");
    }, []);
    useEffect(() => {
        const next = new Array(moment(currentDate).daysInMonth() + 1);
        for (let index = 0; index < next.length; index++) {
            next[index] = new Array();
        }
        appointments.forEach((appointment) => {
            const appDay = new Date(appointment.appointment_time);
            if (moment(appDay).isSame(currentDate, "month")) {
                const n = appDay.getDate();
                next[n].push(appointment);
            }
        });
        setMonthAppointments(next);
    }, [currentDate, appointments]);
    return (
        <LoadingOverlay active={loading} spinner text={"Loading"}>
            <div className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body" style={{overflowY: "auto"}}>
                            <div className="calendar">
                                <div>
                                    <Header
                                        currentDate={currentDate}
                                        prevMonth={prevMonth}
                                        nextMonth={nextMonth}
                                    />
                                </div>
                                <div style={{overflowX: "auto"}}>
                                    <div style={{minWidth: "750px"}}>
                                        <HeaderDays />
                                    </div>
                                    <div style={{minWidth: "750px"}}>
                                        <CalendarCells
                                            currentDate={currentDate}
                                            onDateClick={onDateClick}
                                            selectedDate={selectedDate}
                                            appointments={monthAppointments}
                                        />
                                    </div>
    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoadingOverlay>
   );
};
const CalendarEvent = ({appointment}) => {
    // let duration = new Date(0);
    // duration.setMinutes(appointment.duration);
    // duration = moment(duration).format("hh hours and mm minutes");
    // console.log(duration);

    return (
        <div className="test" onClick={()=>History.push(`${History.location.pathname}/details/${appointment.id}`)}> 
            <b>{moment(appointment.appointment_time).format("hh:mm a")}</b> for{" "}
            <b>{appointment.duration}</b> minutes
        </div>
    );
}
const HeaderDays = () => {
    const weekdayshort = moment.weekdaysShort();
    let weekdayshortname = weekdayshort.map((day, i) => {
        return (
            <div className="column col-center" key={i}>
                {day}
            </div>
        );
    });
    return <div className="days row">{weekdayshortname}</div>;
};

const Header = ({currentDate, prevMonth, nextMonth}) => {
    const dateFormat = "MMMM YYYY";
    return (
        <div className="header-calendar row flex-middle">
            <div className="column col-start">
                <div className="icon" onClick={prevMonth}>
                    <i className="fas fa-chevron-left mr-3 ml-2"></i>{" "}
                </div>
            </div>
            <div className="column col-center">
                <span>{moment(currentDate).format(dateFormat)}</span>
            </div>
            <div className="column col-end">
                <div className="icon" onClick={nextMonth}>
                    <i className="fas fa-chevron-right mr-3 ml-2"></i>
                </div>
            </div>
        </div>
    );
};

const CalendarCells = ({currentDate, onDateClick, selectedDate, appointments}) => {
    const startOfMonth = moment(currentDate).startOf("month").toDate();
    const endOfMonth = moment(currentDate).endOf("month").toDate();
    const monthStartDate = moment(startOfMonth).startOf("week").toDate();
    const monthEndDate = moment(endOfMonth).endOf("week").toDate();
    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = monthStartDate;
    let formattedDate = "";
    while (day <= monthEndDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = moment(day).format(dateFormat);
            const cloneDay = day;
            let todaysAppointments = null;
            if (moment(day).isSame(currentDate, "month") && appointments !== null)
                todaysAppointments = appointments[day.getDate()];
            days.push(
                <div
                    className={`column cell ${
                        moment(day).isSame(selectedDate, "day")
                            ? "selected"
                            : moment(day).isSame(startOfMonth, "month")
                                ? ""
                                : "disabled"
                        }`}
                    key={day.toISOString()}
                    onClick={() => onDateClick(cloneDay)}
                    id={moment(day).format("DD-MM-YYYY")}
                >
                    <span className="number" style={{zIndex: '0'}}>{formattedDate}</span>
                    <span className="bg" style={{zIndex: 1}}>{formattedDate}</span>
                    <div className="fc w-100" style={{zIndex: '0'}}>
                        {todaysAppointments &&
                            todaysAppointments.map((appointment, i) => (
                                <CalendarEvent appointment={appointment} key={i} />
                            ))}
                    </div>
                </div>
            );
            day = moment(day).add(1, "d").toDate();
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

export default UserCalendar;
