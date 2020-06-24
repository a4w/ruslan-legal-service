import React, {useState, useEffect} from "react";
import moment from "moment";
import {FaCheck} from "react-icons/fa";
import Config from "./Config";

const AppointmentTimeForm = ({calender = true, slotLength = 60, initialDateTime = (moment().format(Config.momentsjs_default_date_format)), numberOfDays = 7, selectedSlots = []}) => {
    /*
        This will show the date from today (current hour) -> 7 days ahead (same week day next week)
    */

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
        console.log(minutesToClock(time_to));
        initSlots.push({
            id: i,
            from: minutesToClock(time_from),
            to: minutesToClock(time_to)
        });
    }
    let initSchedule = [];
    for (let i = 1; i <= 7; ++i) {
        initSchedule.push({
            name: moment.weekdays(i),
            slots: initSlots.slice()
        });
    }

    const [schedule, setSchedule] = useState({data: initSchedule});

    useEffect(() => {

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
        const slot = {
            day: button.dataset.day,
            slot_id: button.dataset.slot,
        };
        if (button.classList.contains("selected")) {
            button.classList.remove("selected");
            const nextSlots = selectedSlots.filter((item) => {
                if (item.slot_id === slot.slot_id && item.day === slot.day) {
                    return false;
                }
                return true;
            });
            //setSelectedSlots(nextSlots);
        } else {
            button.classList.add("selected");
            const nextSlots = [...selectedSlots, slot];
            //setSelectedSlots(nextSlots);
        }
    };

    const handleContinueClick = (event) => {
        console.log(selectedSlots);
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
                                    {schedule.data.map((day) => {
                                        return (
                                            <li key={day.date}>
                                                {day.slots.map((slot) => {
                                                    return (
                                                        <button
                                                            key={slot.id}
                                                            disabled={
                                                                slot.reserved
                                                            }
                                                            onClick={
                                                                handleSlotClick
                                                            }
                                                            data-day={day.date}
                                                            data-slot={slot.id}
                                                            className="timing btn-block"
                                                        >
                                                            <span>
                                                                {slot.from} -{" "}
                                                                {slot.to}
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
