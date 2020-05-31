import React, {useState, useEffect} from "react";
import moment from "moment"
import {FaCheck} from "react-icons/fa"
import Config from "./Config";

const AppointmentTimeForm = (props) => {
    /*
        This will show the date from today (current hour) -> 7 days ahead (same week day next week)
    */
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [fromDatetime, setFromDatetime] = useState(moment().format(Config.momentsjs_default_date_format));
    const [schedule, setSchedule] = useState({
        data: []
    });
    // console.log(fromDatetime);

    const days_to_show = 7;

    const getScheduleDate = (lawyer_id, from_datetime, days_to_show) => {
        // this should talk to backend to fetch the lawyer's schedule
        const nextSchedule = {
            from: '2020-05-28 10:22:15', // now
            days: days_to_show,
            data: [
                {
                    name: 'Sunday',
                    date: '2020-05-28',
                    slots: [
                        {
                            id: 1,
                            from: '00:00',
                            to: '01:00',
                            reserved: false
                        },
                        {
                            id: 2,
                            from: '01:00',
                            to: '02:00',
                            reserved: true
                        }
                    ] // This will contain all of the available slots
                },
                {
                    name: 'Monday',
                    date: '2020-05-29',
                    slots: [
                        {
                            id: 1,
                            from: '00:00',
                            to: '01:00',
                            reserved: false
                        },
                        {
                            id: 2,
                            from: '01:00',
                            to: '02:00',
                            reserved: true
                        },
                        {
                            id: 3,
                            from: '03:00',
                            to: '04:00',
                            reserved: false
                        }
                    ] // This will contain all of the available slots
                },
                {
                    name: 'Tuesday',
                    date: '2020-05-30',
                    slots: [
                        {
                            id: 1,
                            from: '00:00',
                            to: '01:00',
                            reserved: false
                        },
                        {
                            id: 2,
                            from: '01:00',
                            to: '02:00',
                            reserved: true
                        }
                    ] // This will contain all of the available slots
                },
            ]
        };
        setSchedule(nextSchedule);
    };

    useEffect(() => {
        getScheduleDate(props.lawyer_id, fromDatetime, days_to_show);
        console.log(fromDatetime);
    }, [fromDatetime]);

    const changeFromDateTime = (amount) => {
        const i_amount = parseInt(amount);
        setFromDatetime(moment(fromDatetime).add(i_amount, 'days').format(Config.momentsjs_default_date_format));
    };

    const handleSlotClick = (event) => {
        const button = event.currentTarget;
        const slot = {
            day: button.dataset.day,
            slot_id: button.dataset.slot
        }
        if (button.classList.contains("selected")) {
            button.classList.remove("selected");
            const nextSlots = selectedSlots.filter((item) => {
                if (item.slot_id === slot.slot_id && item.day === slot.day) {
                    return false;
                }
                return true;
            });
            setSelectedSlots(nextSlots);
        } else {
            button.classList.add("selected");
            const nextSlots = ([...selectedSlots, slot]);
            setSelectedSlots(nextSlots);
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
                                    <li className="left-arrow">
                                        <button className="btn btn-link" onClick={() => {changeFromDateTime(-1)}}>
                                            <i className="fa fa-chevron-left"></i>
                                        </button>
                                    </li>
                                    {schedule.data.map((day) => {
                                        return (
                                            <li key={day.date}>
                                                <span>{day.name}</span>
                                                <span className="slot-date">{moment(day.date).format('DD MMM')} <small>2020</small></span>
                                            </li>
                                        );
                                    })}
                                    <li className="right-arrow">
                                        <button className="btn btn-link" onClick={() => {changeFromDateTime(+1)}}>
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
                                    {
                                        schedule.data.map((day) => {
                                            return (
                                                <li key={day.date}>
                                                    {day.slots.map((slot) => {
                                                        return (
                                                            <button key={slot.id} disabled={slot.reserved} onClick={handleSlotClick} data-day={day.date} data-slot={slot.id} className="timing btn-block">
                                                                <span>{slot.from} - {slot.to}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="submit-section proceed-btn text-right">
                            <button onClick={handleContinueClick} className="btn btn-primary submit-btn"><FaCheck />&nbsp;Continue</button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}


export default AppointmentTimeForm;
