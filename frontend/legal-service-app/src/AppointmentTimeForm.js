import React, {useState, useEffect} from "react";
import moment from "moment";
import {FaCheck} from "react-icons/fa";
import Config from "./Config";

const AppointmentTimeForm = ({calender = true, slotLength = 60, initialDateTime = (moment().format(Config.momentsjs_default_date_format)), numberOfDays = 7, initialSelectedSlots = {}, handleSelection = () => {}}) => {

    const MINUTES_PER_DAY = 60 * 24;
    const minutesToClock = (minutes) => {
        minutes = minutes % MINUTES_PER_DAY
        return ("0" + Math.floor(minutes / 60)).substr(-2) + ":" + ("0" + (minutes % 60)).substr(-2);
    };

    const [fromDateTime, setFromDateTime] = useState(initialDateTime);

    const slotsPerDay = MINUTES_PER_DAY / slotLength;

    let initSlots = [];
    for (let i = 0; i < slotsPerDay; ++i) {
        const time_from = i * slotLength;
        const time_to = time_from + slotLength;
        initSlots.push({
            id: i,
            from: minutesToClock(time_from),
            to: minutesToClock(time_to),
        });
    }
    let initSchedule = [];
    let date = moment(initialDateTime);
    for (let i = 1; i <= numberOfDays; ++i) {
        const dayIdx = calender ? date.weekday() : i;
        initSchedule.push({
            name: moment.weekdays(dayIdx),
            slots: initSlots.slice(),
            date: calender ? date.format(Config.momentsjs_default_date_format) : null
        });
        date.add(1, "days");
    }

    const [schedule, setSchedule] = useState({data: initSchedule});
    const [selectedSchedule, setSelectedSchedule] = useState(initialSelectedSlots);

    useEffect(() => {
        //
    }, []);

    const changeFromDateTime = (amount) => {
        if (calender) {
            const i_amount = parseInt(amount);
            setFromDateTime(
                moment(fromDateTime)
                    .add(i_amount, "days")
                    .format(Config.momentsjs_default_date_format)
            );
        }
    };

    const handleSlotClick = (event) => {
        const button = event.currentTarget;
        const dayIdx = button.dataset.day;
        const slotIdx = button.dataset.slot;
        const slot = schedule.data[dayIdx].slots[slotIdx];
        // Find day or create it
        if (typeof selectedSchedule[dayIdx] === "undefined") {
            selectedSchedule[dayIdx] = {date: schedule.data[dayIdx].date, name: schedule.data[dayIdx].name, selectedSlots: []};
        }
        const currentDay = selectedSchedule[dayIdx];
        if (button.classList.contains("selected")) {
            button.classList.remove("selected");
            const nextSlots = currentDay.selectedSlots.filter((item) => {
                if (item.id === slot.id) {
                    return false;
                }
                return true;
            });
            const nextSchedule = {...selectedSchedule, [dayIdx]: {...currentDay, selectedSlots: nextSlots}};
            setSelectedSchedule(nextSchedule);
        } else {
            button.classList.add("selected");
            const nextSchedule = {...selectedSchedule, [dayIdx]: {...currentDay, selectedSlots: [...currentDay.selectedSlots, slot]}};
            setSelectedSchedule(nextSchedule);
        }
    };

    const handleContinueClick = (event) => {
        handleSelection(selectedSchedule);
    };
    return (
        <>
            <div className="card booking-schedule">
                <div className="schedule-header">
                    <div className="row">
                        <div className="col-12">
                            <div className="day-slot">
                                <ul>
                                    {calender && <li className="left-arrow">
                                        <button
                                            className="btn btn-link"
                                            onClick={() => {
                                                changeFromDateTime(-1);
                                            }}
                                        >
                                            <i className="fa fa-chevron-left"></i>
                                        </button>
                                    </li>}
                                    {schedule.data.map((day, i) => {
                                        return (
                                            <li key={i}>
                                                <span>{day.name}</span>
                                                {calender && <span className="slot-date">
                                                    {moment(day.date).format(
                                                        "DD MMM"
                                                    )}{" "}
                                                    <small>2020</small>
                                                </span>}
                                            </li>
                                        );
                                    })}
                                    {calender && <li className="right-arrow">
                                        <button
                                            className="btn btn-link"
                                            onClick={() => {
                                                changeFromDateTime(+1);
                                            }}
                                        >
                                            <i className="fa fa-chevron-right"></i>
                                        </button>
                                    </li>}
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
                                    {schedule.data.map((day, i) => {
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
