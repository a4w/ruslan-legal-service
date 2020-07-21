import React, {useState, useEffect, useMemo, useContext} from "react";
import moment from "moment";
import {FaCheck} from "react-icons/fa";
import Config from "./Config";
import {OverlayTrigger, Popover} from "react-bootstrap"
import {toast} from "react-toastify";
import {LoadingOverlayContext} from "./App"
import useRequests from "./useRequests";

const AppointmentTimeForm = ({lawyer_id, handleSelection}) => {


    const calculateDiscountedPrice = (price) => {
        if (schedule.discount_type === 1) {
            price -= price * (schedule.discount_amount / 100);
        } else {
            price -= schedule.discount_amount;
        }
        return price;
    };

    const {request} = useRequests();

    const loadingContext = useContext(LoadingOverlayContext);

    // Calender start
    const [fromDateTime, setFromDateTime] = useState(moment()); // Default now

    // Calender
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        const width = window.innerWidth;
        const days = Math.min(7, Math.max(1, Math.floor(width / 200)));
        console.log(days);
        request({
            url: `/lawyer/${lawyer_id}/schedule`,
            method: 'POST',
            data: {
                days_to_show: days,
                from: fromDateTime.utc().format(Config.momentsjs_default_date_format)
            }
        }).then(response => {
            response.discount_type = response.enable_discount ? response.is_percent_discount ? 1 : 2 : 0;
            // Convert to local timezone
            const days = response.schedule.days;
            const nextDays = days.map((day) => {
                return {name: day.name, date: day.date, slots: []}
            });
            for (let i = 0; i < days.length; ++i) {
                const date = days[i].date;
                const slots = days[i].slots;
                let day_idx = i;
                for (let j = 0; j < slots.length; ++j) {
                    const slot = slots[j];
                    const appointment_date = moment.utc(date + " " + slot.time).local();
                    const utc_time = moment.utc(date + " " + slot.time);
                    console.log(appointment_date);
                    if (utc_time.format(Config.momentsjs_default_date_format) < appointment_date.format(Config.momentsjs_default_date_format)) {
                        console.log("OFF PLUS");
                        day_idx++;
                    } else if (utc_time.format(Config.momentsjs_default_date_format) > appointment_date.format(Config.momentsjs_default_date_format)) {
                        console.log("OFF MINUS");
                        day_idx--;
                    }
                    if (day_idx >= 0 && day_idx < days.length) {
                        const end_date = moment.utc(date + " " + slot.to).local();
                        nextDays[day_idx].slots.push({
                            ...slot,
                            time: appointment_date.format('HH:mm'),
                            to: end_date.format("HH:mm")
                        });
                    }
                }
            }
            setSchedule({...response, days: nextDays});

        }).catch(error => {
            console.log(error);
        });
    }, [fromDateTime]);

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
        slot.datetime = moment(schedule.days[dayIdx].date + " " + slot.time).utc().format("Y-MM-DD HH:mm");
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
        if (selectedSlots.length === 0) {
            toast.error("At least one slot must be selected");
            return;
        }
        loadingContext.setIsLoadingOverlayShown(true);
        loadingContext.setLoadingOverlayText("Please wait while we hold these slots for you");
        request({
            url: `/appointment/${lawyer_id}/select-slots`,
            method: 'POST',
            data: {slots: selectedSlots}
        }).then(response => {
            // Go to checkout with the client secret
            toast.info("You will proceed to checkout, please note that the slots you selected will be held for only 15 minutes");
            const client_secret = response.client_secret;
            const appointments = response.appointments;
            const total_price = response.total_price;
            const currency_symbol = response.currency_symbol;

            handleSelection({client_secret, appointments, total_price, currency_symbol});
        }).catch(error => {
        }).finally(() => {
            loadingContext.setIsLoadingOverlayShown(false);
        });
    };


    return (
        <>
            <div className="card booking-schedule">
                <div className="schedule-header">
                    <div className="row no-gutters">
                        <div className="col-12">
                            <div className="day-slot">
                                <div className="row no-gutters">
                                    <div className="col-1">
                                        <button className="btn btn-link" onClick={() => {changeFromDateTime(-1)}}>
                                            <i class="fa fa-chevron-left"></i>
                                        </button>
                                    </div>
                                    {schedule !== null && schedule.days.map((day, i) => {
                                        return (
                                            <div className="col" key={day.date}>
                                                <span style={{
                                                    fontSize: '14px',
                                                    margin: '0px 10px 0px 10px'
                                                }}>{day.name}</span>
                                                <span class="slot-date">{moment(day.date).format('D MMM Y')}</span>
                                            </div>
                                        );
                                    })}
                                    <div className="col-1">
                                        <button className="btn btn-link" onClick={() => {changeFromDateTime(+1)}}>
                                            <i class="fa fa-chevron-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="schedule-cont" style={{
                    overflowY: 'auto',
                    maxHeight: '350px'
                }}>
                    <div className="row no-gutters">
                        <div className="col-1"></div>
                        {schedule !== null && schedule.days.map((day, i) => {
                            return (
                                <div className="col" key={day.date}>
                                    {day.slots.length === 0 && (<span className="d-block text-center text-muted" style={{fontSize: '10px'}}>No slots</span>)}
                                    {day.slots.map((slot, j) => {
                                        const discountedPrice = calculateDiscountedPrice((slot.length / 60) * schedule.price_per_hour)
                                        return (
                                            <OverlayTrigger
                                                placement={"bottom"}
                                                overlay={
                                                    <Popover size="lg" style={{zIndex: '9999'}}>
                                                        <Popover.Title as="h3" className="text-center">
                                                            {slot.length} minutes
                                                                </Popover.Title>
                                                        <Popover.Content>
                                                            <span className="slot-info-popover-body"><strong>Price:</strong>&nbsp;{discountedPrice} GBP</span>
                                                            {schedule.discount_type !== 0 &&
                                                                <>
                                                                    <span className="slot-info-popover-body"><strong>Discount:</strong>&nbsp;{schedule.discount_amount} {schedule.discount_type === 1 ? '%' : 'GBP'}</span>
                                                                    <span className="slot-info-popover-body"><strong>Discount end:</strong>&nbsp;{moment(schedule.discount_end).toDate().toLocaleString()}</span>
                                                                </>}
                                                        </Popover.Content>
                                                    </Popover>
                                                }
                                            >
                                                <button
                                                    disabled={slot.reserved}
                                                    key={slot.id}
                                                    data-day={i}
                                                    data-slot={j}
                                                    className="timing"
                                                    onClick={handleSlotClick}
                                                >
                                                    <span>
                                                        {slot.time} ➡ {slot.to}
                                                    </span>
                                                </button>
                                            </OverlayTrigger>
                                        );
                                    })}
                                </div>
                            );
                        })}
                        <div className="col-1"></div>
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
