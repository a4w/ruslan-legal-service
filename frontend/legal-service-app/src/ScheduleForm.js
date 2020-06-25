import React, {useState, useEffect, useRef} from "react";
import {FaArrowCircleRight, FaClock} from "react-icons/fa";
import ErrorMessageSelect from "./ErrorMessageSelect"
import ErrorMessageInput from "./ErrorMessageInput"
import {ButtonGroup, Button} from "reactstrap"
import StickyBox from "react-sticky-box"
import moment from "moment"
import TimeKeeper from 'react-timekeeper';
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import {OverlayTrigger, Popover} from "react-bootstrap"

const ScheduleForm = ({}) => {

    const TIME_FORMAT = "HH:mm";

    // Schedule (This will contain the selected slots and their data
    const [schedule, setSchedule] = useState([
        {name: "Monday", slots: []},
        {name: "Tuesday", slots: []},
        {name: "Wednesday", slots: []},
        {name: "Thursday", slots: []},
        {name: "Friday", slots: []},
        {name: "Saturday", slots: []},
        {name: "Sunday", slots: []},
    ]);

    // Slot properties
    const time = moment();
    time.minute(time.minute() - (time.minute() % 5));
    const [slotProperties, setSlotProperties] = useState({
        time: time,
        weekday: 0,
        length: 60,
        price: 0,
        discount_type: 0, // 0 -> no discount, 1 -> percent discount, 2 -> percent discount
        discount_amount: 0,
        discount_end: new Date()
    });

    const [isTimeSelectorShown, setIsTimeSelectionShown] = useState(false);

    // On load
    useEffect(() => {
        // Load schedule from backend
    }, []);

    const handleSelection = ({name, value}) => {
        setSlotProperties({...slotProperties, [name]: value});
    };
    const handleChange = (event) => {
        const {name, value} = event.target;
        setSlotProperties({...slotProperties, [name]: value});
    };

    const handleButtonClick = () => {
        const dayIdx = slotProperties.weekday;
        // Check if valid
        const end_time = slotProperties.time.clone().add(slotProperties.length, "minutes")
        for (let slot of schedule[dayIdx].slots) {
            if ((slotProperties.time.isSameOrAfter(slot.time) && slotProperties.time.isSameOrBefore(slot.end_time)) ||
                (end_time.isSameOrAfter(slot.time) && end_time.isSameOrBefore(slot.end_time))) {
                toast.error("A slot is found within this time range");
                return;
            }
        }
        const nextSchedule = schedule.slice();
        const newSlot = Object.assign({end_time}, slotProperties);

        nextSchedule[dayIdx].slots.push(newSlot);
        setSchedule(nextSchedule);
    };

    const handleTimeSelection = (time) => {
        const clock = ("0" + time.hour).slice(-2) + ":" + time.minute;
        setSlotProperties({...slotProperties, time: moment(clock, "HH:mm")});
    };

    const toggleTimePicker = () => {
        setIsTimeSelectionShown(!isTimeSelectorShown);
    };

    const handleDeleteSlot = (event) => {
        const button = event.currentTarget;
        const dayIdx = button.dataset.day;
        const slotIdx = button.dataset.slot;
        const nextSchedule = schedule.slice();
        nextSchedule[dayIdx].slots.splice(slotIdx, 1);
        setSchedule(nextSchedule);
    }


    const slotOptions = [
        {label: '30 minutes', value: 30},
        {label: '45 minutes', value: 45},
        {label: '60 minutes', value: 60},
        {label: '90 minutes', value: 90},
    ];

    const weekDayOptions = [
        {label: 'Monday', value: 0},
        {label: 'Tuesday', value: 1},
        {label: 'Wednesday', value: 2},
        {label: 'Thursday', value: 3},
        {label: 'Friday', value: 4},
        {label: 'Saturday', value: 5},
        {label: 'Sunday', value: 6},
    ];

    return (
        <>
            <div className="row no-gutters">
                <div className="col-3">
                    <StickyBox>
                        <div className="p-3">
                            <h4 className="text-center">Add appointment</h4>
                            <div className="form-group">
                                <ErrorMessageSelect
                                    multi={false}
                                    name="weekday"
                                    className="floating"
                                    value={slotProperties.weekday}
                                    placeholder="Weekday"
                                    options={weekDayOptions}
                                    OnChangeHandler={handleSelection}
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-dark btn-block" onClick={toggleTimePicker}>
                                    <FaClock />&nbsp;{slotProperties.time.format(TIME_FORMAT)}
                                </button>
                                {isTimeSelectorShown && <div className="timepicker-container">
                                    <FocusWrapper close={() => {setIsTimeSelectionShown(false)}}>
                                        <TimeKeeper style={{position: 'absolute'}} time={slotProperties.time.format(TIME_FORMAT)} hour24Mode={true} forceCoarseMinutes={true} onChange={handleTimeSelection} />

                                    </FocusWrapper>
                                </div>}
                            </div>
                            <div className="form-group">
                                <ErrorMessageSelect
                                    multi={false}
                                    name="length"
                                    className="floating"
                                    value={slotProperties.length}
                                    placeholder="Length (in minutes)"
                                    options={slotOptions}
                                    OnChangeHandler={handleSelection}
                                />
                            </div>
                            <div className="form-group">
                                <ErrorMessageInput
                                    type={"text"}
                                    name="price"
                                    value={slotProperties.price}
                                    OnChangeHandler={handleChange}
                                    placeholder={"Price"}
                                />
                            </div>
                            <div className="form-group">
                                <ButtonGroup className="w-100">
                                    <Button color="info" onClick={() => {setSlotProperties({...slotProperties, discount_type: 0})}} active={slotProperties.discount_type === 0}>No discount</Button>
                                    <Button color="info" onClick={() => {setSlotProperties({...slotProperties, discount_type: 1})}} active={slotProperties.discount_type === 1}>Percent discount</Button>
                                    <Button color="info" onClick={() => {setSlotProperties({...slotProperties, discount_type: 2})}} active={slotProperties.discount_type === 2}>Fixed discount</Button>
                                </ButtonGroup>
                            </div>
                            {slotProperties.discount_type !== 0 && <div className="form-group">
                                <ErrorMessageInput
                                    disabled={slotProperties.discount_type === 0}
                                    type={"text"}
                                    name="discount_amount"
                                    value={slotProperties.discount_amount}
                                    OnChangeHandler={handleChange}
                                    placeholder={"Discount"}
                                />
                            </div>}
                            {slotProperties.discount_type !== 0 && <div className="form-group">

                                <DatePicker
                                    className="form-control mb-0"
                                    placeholderText="Available on"
                                    onChange={(date) => {setSlotProperties({...slotProperties, discount_end: date})}}
                                    selected={slotProperties.discount_end}
                                    showTimeSelect
                                    dateFormat={"Y-MM-dd HH:mm:ss"}
                                />
                            </div>}
                            <button onClick={handleButtonClick} className="btn btn-block btn-primary">
                                <FaArrowCircleRight />&nbsp;Add appointment
                            </button>
                        </div>
                    </StickyBox>
                </div>

                <div className="col-9">
                    <div className="card booking-schedule">
                        <div className="schedule-header">
                            <div className="row">
                                <div className="col-12">
                                    <div className="day-slot">
                                        <ul>
                                            {schedule.map((day, i) => {
                                                return (
                                                    <li key={i}>
                                                        <span>{day.name}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="schedule-cont">
                            <div className="row">
                                {schedule.map((day, i) => {
                                    return (
                                        <div className="col" key={day.date}>
                                            {day.slots.map((slot, j) => {
                                                return (
                                                    <OverlayTrigger
                                                        placement={"bottom"}
                                                        overlay={
                                                            <Popover>
                                                                <Popover.Title as="h3" className="text-center">
                                                                    {slot.length} minutes
                                                                </Popover.Title>
                                                                <Popover.Content>
                                                                    <span className="slot-info-popover-body"><strong>Price:</strong>&nbsp;{slot.price} GBP</span>
                                                                    {slot.discount_type !== 0 &&
                                                                        <>
                                                                            <span className="slot-info-popover-body"><strong>Discount:</strong>&nbsp;{slotProperties.discount} {slot.discount_type === 1 ? '%' : 'GBP'}</span>
                                                                            <span className="slot-info-popover-body"><strong>Discount end:</strong>&nbsp;{slot.discount_end.toLocaleString()}</span>
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
                                                            onDoubleClick={handleDeleteSlot}
                                                        >
                                                            <span>
                                                                {slot.time.format("HH:mm")} - {slot.end_time.format("HH:mm")}
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

                </div>
            </div>
        </>
    );
};

export default ScheduleForm;

function FocusWrapper({children, close}) {
    const container = useRef(null);

    function handleClick(e) {
        const wrapper = container.current;
        const target = e.target;
        if (!document.contains(target)) {
            return;
        }
        if (!wrapper.contains(target)) {
            return close();
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick, false);
        return () => {
            document.removeEventListener("click", handleClick, false);
        };
    }, []);

    return (
        <div ref={container} style={{display: "inline-block"}}>
            {children}
        </div>
    );
}
