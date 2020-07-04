import React, { useState, useEffect } from "react";
import moment from "moment";
import "./LawyerAgenda.css";
import {request} from "./Axios";

const LawyerAgenda = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthAppointments, setMonthAppointments] = useState(null);
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
        request({url: "/lawyer/appointments", method: "GET"})
            .then((data) => {
                setAppointments(data.appointments);
            })
            .catch((err) => {});
    }, []);
    useEffect(() => {
        const next = new Array(moment(currentDate). daysInMonth() + 1);
        for (let index = 0; index < next.length; index++) {
            next[index] = new Array();
        }
        appointments.forEach((appointment) => {
            const appDay = appointment.appointment_time;
            if (moment(appDay).isSame(currentDate, "month")) {
                const n = appDay.getDate();
                next[n].push(appointment);
            }
        });
        setMonthAppointments(next);     
    }, [currentDate, appointments]);
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="calendar">
                            <div>
                                <Header
                                    currentDate={currentDate}
                                    prevMonth={prevMonth}
                                    nextMonth={nextMonth}
                                />
                            </div>
                            <div>
                                <HeaderDays />
                            </div>
                            <div>
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
    );
};
const CalendarEvent = ()=>{
    return (
        <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end bg-success fc-draggable">
            <div className="fc-content">
                <span className="fc-time">1:08a</span>{" "}
                <span className="fc-title">Test Event 1</span>
            </div>
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
                    <span className="number">{formattedDate}</span>
                    <span className="bg">{formattedDate}</span>
                    <div className="fc">
                        {todaysAppointments &&
                            todaysAppointments.map((appointment, i) => (
                                <CalendarEvent key={i} />
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

export default LawyerAgenda;
