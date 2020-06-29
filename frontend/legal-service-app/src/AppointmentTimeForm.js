import React, {useState, useEffect, useMemo} from "react";
import moment from "moment";
import {FaCheck} from "react-icons/fa";
import Config from "./Config";
import {request} from "./Axios"
import {OverlayTrigger, Popover} from "react-bootstrap"

const AppointmentTimeForm = ({lawyer_id}) => {

    const MINUTES_PER_DAY = 60 * 24;
    const minutesToClock = (minutes) => {
        minutes = minutes % MINUTES_PER_DAY
        return ("0" + Math.floor(minutes / 60)).substr(-2) + ":" + ("0" + (minutes % 60)).substr(-2);
    };

    const calculateDiscountedPrice = (price) => {
        if (schedule.discount_type === 1) {
            price -= price * (schedule.discount_amount / 100);
        } else {
            price -= schedule.discount_amount;
        }
        return price;
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
                days_to_show: 7,
                from: fromDateTime.format(Config.momentsjs_default_datetime_format)
            }
        }).then(response => {
            response.discount_type = response.enable_discount ? response.is_percent_discount ? 1 : 2 : 0;
            setSchedule({...response, days: [...response.schedule.days]});

        }).catch(error => {
            console.log(error);
        });
    }, [fromDateTime]);

    useEffect(() => {console.log(schedule)}, [schedule]);

    // Selected slots
    const [selectedSlots, setSelectedSlots] = useState([]);

    const changeFromDateTime = (amount) => {
        const i_amount = parseInt(amount);
        setFromDateTime(
            moment(fromDateTime)
                .add(i_amount, "days")
        );
    };

    const handleSlotClick = (event) => {
        const button = event.currentTarget;
        const dayIdx = button.dataset.day;
        const slotIdx = button.dataset.slot;
        const slot = schedule.days[dayIdx].slots[slotIdx];
        slot.datetime = schedule.days[dayIdx].date + " " + slot.time;
        if (button.classList.contains('selected')) {
            const nextSelectedSlots = selectedSlots.filter(currentSlot => {
                if (currentSlot == slot) {
                    return false;
                }
                return true;
            });
            setSelectedSlots(nextSelectedSlots);
            button.classList.remove('selected');
        } else {
            button.classList.add('selected');
            setSelectedSlots([...selectedSlots, slot]);
        }
    };

    const handleContinueClick = (event) => {
        request({
            url: `/appointment/${lawyer_id}/select-slots`,
            method: 'POST',
            data: {slots: selectedSlots}
        }).then(response => {
        }).catch(error => {
        });
    };


    return (
        <>
            <div className="card booking-schedule">
                <div className="schedule-header">
                    <div className="row">
                        <div className="col-12">
                            <div className="day-slot">
                                <ul>
                                    <li class="left-arrow">
                                        <button className="btn btn-link" onClick={() => {changeFromDateTime(-1)}}>
                                            <i class="fa fa-chevron-left"></i>
                                        </button>
                                    </li>
                                    {schedule !== null && schedule.days.map((day, i) => {
                                        return (
                                            <li key={i}>
                                                <span>{day.name}</span>
                                                <span class="slot-date">{moment(day.date).format('D MMM Y')}</span>
                                            </li>
                                        );
                                    })}
                                    <li class="right-arrow">
                                        <button className="btn btn-link" onClick={() => {changeFromDateTime(+1)}}>
                                            <i class="fa fa-chevron-right"></i>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="schedule-cont">
                    <div className="row">
                        {schedule !== null && schedule.days.map((day, i) => {
                            return (
                                <div className="col" key={day.date}>
                                    {day.slots.map((slot, j) => {
                                        const discountedPrice = calculateDiscountedPrice((slot.length / 60) * schedule.price_per_hour)
                                        return (
                                            <OverlayTrigger
                                                placement={"bottom"}
                                                overlay={
                                                    <Popover size="lg">
                                                        <Popover.Title as="h3" className="text-center">
                                                            {slot.length} minutes
                                                                </Popover.Title>
                                                        <Popover.Content>
                                                            <span className="slot-info-popover-body"><strong>Price:</strong>&nbsp;{discountedPrice} GBP</span>
                                                            {schedule.discount_type !== 0 &&
                                                                <>
                                                                    <span className="slot-info-popover-body"><strong>Discount:</strong>&nbsp;{schedule.discount_amount} {schedule.discount_type === 1 ? '%' : 'GBP'}</span>
                                                                    <span className="slot-info-popover-body"><strong>Discount end:</strong>&nbsp;{schedule.discount_end}</span>
                                                                </>}
                                                            <span className="slot-info-delete-notice text-xs text-info d-block text-center">Double click to delete this slot</span>
                                                        </Popover.Content>
                                                    </Popover>
                                                }
                                            >
                                                <button
                                                    key={slot.id}
                                                    data-day={i}
                                                    data-slot={j}
                                                    className="timing btn-block"
                                                    onClick={handleSlotClick}
                                                >
                                                    <span>
                                                        {slot.time} - {slot.to}
                                                    </span>
                                                </button>
                                            </OverlayTrigger>
                                        );
                                    })}
                                </div>
                            );
                        })}
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
