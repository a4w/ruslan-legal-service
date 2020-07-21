import React, {useState, useEffect, useRef} from "react";
import {FaArrowCircleRight, FaClock, FaSave, FaEye, FaPlusCircle, FaTimes} from "react-icons/fa";
import ErrorMessageSelect from "./ErrorMessageSelect"
import ErrorMessageInput from "./ErrorMessageInput"
import {ButtonGroup, Button, Collapse} from "reactstrap"
import StickyBox from "react-sticky-box"
import moment from "moment"
import TimeKeeper from 'react-timekeeper';
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import {OverlayTrigger, Popover} from "react-bootstrap"
import useValidation from "./useValidation";
import {scheduleSettingValidation} from "./Validations";
import useRequests from "./useRequests";
import SpinnerButton from "./SpinnerButton";
import Config from "./Config";

const ScheduleForm = ({}) => {
    const {request} = useRequests();

    const TIME_FORMAT = "HH:mm";

    // Controller status
    const [isSideShown, setIsSideShown] = useState(false);
    const [numberOfDaysShown, setNumberOfDaysShown] = useState(1);
    const [firstIndexShown, setFirstIndexShown] = useState(0);
    const [visibleSchedule, setVisibleSchedule] = useState([]);
    const [loading, setLoading] = useState(false);

    const schedule_container = useRef(null);

    // Schedule (This will contain the selected slots and their data
    const [schedule, setSchedule] = useState([
        {name: "Sunday", slots: []},
        {name: "Monday", slots: []},
        {name: "Tuesday", slots: []},
        {name: "Wednesday", slots: []},
        {name: "Thursday", slots: []},
        {name: "Friday", slots: []},
        {name: "Saturday", slots: []},
    ]);


    // Slot properties
    const time = moment();
    time.minute(time.minute() - (time.minute() % 5));
    const [slotProperties, setSlotProperties] = useState({
        time: time,
        weekday: 0,
        length: 60,
    });
    const [globalSettings, setGlobalSettings] = useState({
        price: 0,
        discount_type: 0, // 0 -> no discount, 1 -> percent discount, 2 -> percent discount
        discount_amount: 0,
        discount_end: new Date()
    });

    const [errors, , runValidation] = useValidation(scheduleSettingValidation);

    const [isTimeSelectorShown, setIsTimeSelectionShown] = useState(false);

    // On load
    useEffect(() => {
        // Calculate number of days to show
        console.log(schedule_container.current.offsetWidth);
        const nDays = Math.min(7, Math.max(1, (0.6 * schedule_container.current.offsetWidth) / 100));
        console.log(nDays);
        setNumberOfDaysShown(nDays);
        request({
            url: 'lawyer/schedule',
            method: 'GET'
        }).then(response => {
            console.log(response);
            //const nextSchedule = response.schedule.map((day, i) => {
            //    return {
            //        ...schedule[i],
            //        ...day,
            //        slots: day.slots.map(slot => {
            //            const time = moment(slot.time, "HH:mm");
            //            return {
            //                ...slot,
            //                time,
            //                end_time: time.clone().add(slot.length, "minutes")
            //            };
            //        })
            //    };
            //});
            // Process timezone
            const nextSchedule = schedule.slice();
            const weekReducer = (action, day) => {
                if (action === '+') {
                    return (day + 1) % 7;
                } else if (action === '-') {
                    return (day + 6) % 7;
                }
                return day;
            }
            for (let i = 0; i < response.schedule.length; ++i) {
                const slots = response.schedule[i].slots;
                for (let j = 0; j < slots.length; ++j) {
                    const slot = slots[j];
                    const time_obj = moment.utc(slot.time, "HH:mm").local();
                    const time_utc = moment.utc(slot.time, "HH:mm");
                    console.log(time_obj.format('D'), time_utc.format('D'));
                    let day = i;
                    if (time_utc.format(Config.momentsjs_default_date_format) < time_obj.format(Config.momentsjs_default_date_format)) {
                        day = weekReducer('+', day);
                    } else if (time_utc.day(Config.momentsjs_default_date_format) > time_obj.format(Config.momentsjs_default_date_format)) {
                        day = weekReducer('-', day);
                    }
                    console.log(time_obj);
                    nextSchedule[day].slots.push({
                        ...slot,
                        time: time_obj,
                        end_time: time_obj.clone().add(slot.length, "minutes")
                    });
                }
            }

            setSchedule(nextSchedule);
            const nextGlobalSettings = {
                price: response.price_per_hour,
                discount_type: response.enable_discount ? response.is_percent_discount ? 1 : 2 : 0,
                discount_amount: response.discount_amount,
                discount_end: response.discount_end === null ? new Date() : new Date(response.discount_end)
            };
            setGlobalSettings(nextGlobalSettings);
        }).catch(error => {
            console.debug(error);
        });
    }, []);

    const calculateDiscountedPrice = (price) => {
        if (globalSettings.discount_type === 1) {
            price -= price * (globalSettings.discount_amount / 100);
        } else {
            price -= globalSettings.discount_amount;
        }
        return price;
    };

    const handleSelection = ({name, value}) => {
        setSlotProperties({...slotProperties, [name]: value});
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setSlotProperties({...slotProperties, [name]: value});
    };

    const handleSettingsChange = (event) => {
        const {name, value} = event.target;
        setGlobalSettings({...globalSettings, [name]: value});
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
        nextSchedule[dayIdx].slots.sort((a, b) => {
            return a.time < b.time ? -1 : 1;
        });
        setSchedule(nextSchedule);
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

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

    const handleSaveClick = () => {
        runValidation(globalSettings).then((hasErrors) => {
            if (hasErrors) {
                setIsSideShown(true);
                return;
            }
            setLoading(true);

            const toSend = {
                schedule: {
                    days: schedule.map((day) => {
                        let newDay = {
                            ...day, slots: day.slots.map((slot) => {
                                let newSlots = {
                                    ...slot,
                                    time: slot.time.format(TIME_FORMAT),

                                };
                                delete newSlots.end_time;
                                return newSlots;
                            })
                        };
                        return newDay;
                    }),
                    settings: {
                        price_per_hour: globalSettings.price,
                        enable_discount: (globalSettings.discount_type !== 0),
                        is_percent_discount: (globalSettings.discount_type === 1),
                        discount_amount: globalSettings.discount_amount,
                        discount_end: globalSettings.discount_end,
                        timezone: moment().format('Z')
                    }
                }
            };
            request({
                url: '/lawyer/update-schedule',
                method: 'POST',
                data: toSend
            }).then((response) => {
                toast.success("Schedule saved successfully");
            }).catch((error) => {
                console.debug(error);
            }).finally(() => {
                setLoading(false);
            });
        });
    };

    const slotOptions = [
        {label: '30 minutes', value: 30},
        {label: '45 minutes', value: 45},
        {label: '60 minutes', value: 60},
        {label: '90 minutes', value: 90},
    ];

    const weekDayOptions = [
        {label: 'Sunday', value: 0},
        {label: 'Monday', value: 1},
        {label: 'Tuesday', value: 2},
        {label: 'Wednesday', value: 3},
        {label: 'Thursday', value: 4},
        {label: 'Friday', value: 5},
        {label: 'Saturday', value: 6},
    ];

    useEffect(() => {
        // Set the "visible" order
        const nextVisible = [];
        let n = 0;
        for (let i = firstIndexShown; n < numberOfDaysShown; i = (i + 1) % 7, n++) {
            nextVisible.push(schedule[i]);
        }
        setVisibleSchedule(nextVisible);
    }, [firstIndexShown, numberOfDaysShown, schedule]);

    return (
        <>
            <Collapse style={{position: 'absolute', zIndex: 10, backgroundColor: '#FFF'}} isOpen={isSideShown}>
                <button className="btn btn-link float-right" onClick={() => {setIsSideShown(false)}}><FaTimes /></button>
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
                    <button onClick={handleButtonClick} className="btn btn-block btn-primary">
                        <FaArrowCircleRight />&nbsp;Add appointment
                            </button>
                    <hr />
                    <h4 className="text-center"> Global appointment settings </h4>
                    <div className="form-group">
                        <ErrorMessageInput
                            type={"text"}
                            name="price"
                            value={globalSettings.price}
                            OnChangeHandler={handleSettingsChange}
                            placeholder={"Price per hour"}
                            errors={errors.price}
                        />
                    </div>
                    <div className="form-group">
                        <ButtonGroup>
                            <Button className="btn-sm" color="info" onClick={() => {setGlobalSettings({...globalSettings, discount_type: 0})}} active={globalSettings.discount_type === 0}>No discount</Button>
                            <Button className="btn-sm" color="info" onClick={() => {setGlobalSettings({...globalSettings, discount_type: 1})}} active={globalSettings.discount_type === 1}>Percent discount</Button>
                            <Button className="btn-sm" color="info" onClick={() => {setGlobalSettings({...globalSettings, discount_type: 2})}} active={globalSettings.discount_type === 2}>Fixed discount</Button>
                        </ButtonGroup>
                    </div>
                    {globalSettings.discount_type !== 0 && <div className="form-group">
                        <ErrorMessageInput
                            disabled={globalSettings.discount_type === 0}
                            type={"text"}
                            name="discount_amount"
                            value={globalSettings.discount_amount}
                            OnChangeHandler={handleSettingsChange}
                            placeholder={"Discount"}
                            errors={errors.discount_amount}
                        />
                    </div>}
                    {globalSettings.discount_type !== 0 && <div className="form-group">
                        <DatePicker
                            className="form-control"
                            placeholderText="Available on"
                            onChange={(date) => {setGlobalSettings({...globalSettings, discount_end: date})}}
                            selected={globalSettings.discount_end}
                            showTimeSelect
                            dateFormat={"Y-MM-dd HH:mm:ss"}
                        />
                        {errors["discount_end"] && errors["discount_end"].length > 0 &&
                            <label className="text-danger ml-2 font-weight-light text-xs">
                                {errors["discount_end"][0]}
                            </label>
                        }
                    </div>}
                </div>
            </Collapse>
            <div className="row no-gutters">
                <div className="col">
                    <div className="row form-row">
                        <div className="col-12">
                            <span className="text-muted p-2 float-left" style={{
                                backgroundColor: 'rgba(0,0,0,0.05)',
                                borderRadius: '5px',
                                margin: '5px 0px 5px 0px'
                            }}><FaClock />&nbsp;All times are shown in your local timezone <strong>(UTC{moment().format('Z')})</strong></span>
                            <button className="btn btn-sm btn-info float-right mb-1" onClick={
                                () => {
                                    setIsSideShown(!isSideShown);
                                }
                            }><FaPlusCircle />&nbsp;Add slot</button>
                        </div>
                    </div>
                    <div className="card booking-schedule">
                        <div className="schedule-header">
                            <div className="row">
                                <div className="col-12">
                                    <div className="day-slot">
                                        <div className="row no-gutters" ref={schedule_container}>
                                            <div className="col-1">
                                                <button className="btn btn-link" onClick={() => {setFirstIndexShown((firstIndexShown + 6) % 7)}}>
                                                    <i class="fa fa-chevron-left"></i>
                                                </button>
                                            </div>
                                            {visibleSchedule.map((day, i) => {
                                                console.log("DAY: ", i);
                                                return (
                                                    <div className="col" key={i}>
                                                        <span>{day.name}</span>
                                                    </div>
                                                );
                                            })}
                                            <div className="col-1">
                                                <button className="btn btn-link" onClick={() => {setFirstIndexShown((firstIndexShown + 1) % 7)}}>
                                                    <i class="fa fa-chevron-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="schedule-cont">
                            <div className="row">
                                <div className="col-1"></div>
                                {visibleSchedule.map((day, i) => {
                                    return (
                                        <div className="col" key={day.date}>
                                            {day.slots.map((slot, j) => {
                                                const discountedPrice = calculateDiscountedPrice((slot.length / 60) * globalSettings.price)
                                                return (
                                                    <OverlayTrigger
                                                        placement={"bottom"}
                                                        overlay={
                                                            <Popover>
                                                                <Popover.Title as="h3" className="text-center">
                                                                    {slot.length} minutes
                                                                </Popover.Title>
                                                                <Popover.Content>
                                                                    <span className="slot-info-popover-body"><strong>Price:</strong>&nbsp;{discountedPrice} GBP</span>
                                                                    {globalSettings.discount_type !== 0 &&
                                                                        <>
                                                                            <span className="slot-info-popover-body"><strong>Discount:</strong>&nbsp;{globalSettings.discount_amount} {globalSettings.discount_type === 1 ? '%' : 'GBP'}</span>
                                                                            <span className="slot-info-popover-body"><strong>Discount end:</strong>&nbsp;{globalSettings.discount_end.toLocaleString()}</span>
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
                                <div className="col-1"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row form-row">
                        <div className="col">
                            <SpinnerButton loading={loading} className="btn btn-success float-right btn-block" onClick={handleSaveClick}>
                                <FaSave />&nbsp;Save schedule
                            </SpinnerButton>
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
