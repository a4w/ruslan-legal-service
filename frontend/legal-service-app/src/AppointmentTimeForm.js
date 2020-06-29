import React, {useState, useEffect, useMemo} from "react";
import moment from "moment";
import {FaCheck} from "react-icons/fa";
import Config from "./Config";
import {request} from "./Axios"

const AppointmentTimeForm = ({lawyer_id}) => {

    const MINUTES_PER_DAY = 60 * 24;
    const minutesToClock = (minutes) => {
        minutes = minutes % MINUTES_PER_DAY
        return ("0" + Math.floor(minutes / 60)).substr(-2) + ":" + ("0" + (minutes % 60)).substr(-2);
    };

    // Calender start
    const [fromDateTime, setFromDateTime] = useState(moment()); // Default now

    // Calender
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        request({
            url: `/lawyer/${lawyer_id}/schedule`,
            method: 'POST',
            data: {
                days_to_show: 7
            }
        }).then(response => {
            console.debug(response);

        }).catch(error => {
            console.log(error);
        });
    }, []);

    // Selected slots
    const [selectedSchedule, setSelectedSchedule] = useState([]);

    const changeFromDateTime = (amount) => {
        const i_amount = parseInt(amount);
        setFromDateTime(
            moment(fromDateTime)
                .add(i_amount, "days")
                .format(Config.momentsjs_default_date_format)
        );
    };

    const handleSlotClick = (event) => {};

    const handleContinueClick = (event) => {
    };


    return (
        <>
            <div className="card booking-schedule">
                <div className="schedule-header">
                    <div className="row">
                        <div className="col-12">
                            <div className="day-slot">
                                <ul>
                                    <li className="left-arrow">
                                        <button
                                            className="btn btn-link"
                                            onClick={() => {
                                                changeFromDateTime(-1);
                                            }}
                                        >
                                            <i className="fa fa-chevron-left"></i>
                                        </button>
                                    </li>
                                    {schedule !== null && schedule.data.map((day, i) => {
                                        return (
                                            <li key={i}>
                                                <span>{day.name}</span>
                                                {<span className="slot-date">
                                                    {moment(day.date).format(
                                                        "DD MMM"
                                                    )}{" "}
                                                    <small>2020</small>
                                                </span>}
                                            </li>
                                        );
                                    })}
                                    <li className="right-arrow">
                                        <button
                                            className="btn btn-link"
                                            onClick={() => {
                                                changeFromDateTime(+1);
                                            }}
                                        >
                                            <i className="fa fa-chevron-right"></i>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="schedule-cont">
                    <div className="row">
                        <div className="col-12">
                            <div className="time-slot">
                                <ul className="clearfix">
                                    {schedule !== null && schedule.data.map((day, i) => {
                                        return (
                                            <li key={day.date}>
                                                {day.slots.map((slot, j) => {
                                                    return (
                                                        <button
                                                            key={slot.id}
                                                            disabled={
                                                                slot.reserved
                                                            }
                                                            onClick={
                                                                handleSlotClick
                                                            }
                                                            data-day={i}
                                                            data-slot={j}
                                                            className="timing btn-block"
                                                        >
                                                            <span>
                                                                {slot.from} - {slot.to}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="submit-section proceed-btn text-right">
                        <button
                            onClick={handleContinueClick}
                            className="btn btn-primary submit-btn"
                        >
                            <FaCheck />
                            &nbsp;Continue
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppointmentTimeForm;
