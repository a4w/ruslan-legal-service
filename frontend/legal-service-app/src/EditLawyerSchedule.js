import React, {useState} from "react"
import ErrorMessageSelect from "./ErrorMessageSelect"
import ErrorMessageInput from "./ErrorMessageInput"
import {ButtonGroup, Button} from "reactstrap"
import ScheduleSelectionForm from "./ScheduleSelectionForm"
import StickyBox from "react-sticky-box"

const EditLawyerSchedule = ({}) => {
    const [scheduleOptions, setScheduleOptions] = useState({
        slot_length: 30,
        price_per_slot: 0,
        discount_amount: 0,
        discount_type: 0
    });
    const handleSelection = ({name, value}) => {
        setScheduleOptions({...scheduleOptions, [name]: value});
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setScheduleOptions({...scheduleOptions, [name]: value});
    };
    const slotOptions = [
        {label: '30 minutes', value: 30},
        {label: '45 minutes', value: 45},
        {label: '60 minutes', value: 60},
        {label: '90 minutes', value: 90},
    ];
    return (
        <>
            <div className="row form-row">
                <div className="col-3">
                    <StickyBox>
                        <div className="p-3">
                            <h4 className="text-center">Appointment options</h4>
                            <div className="form-group">
                                <ErrorMessageSelect
                                    multi={false}
                                    name="slot_length"
                                    className="floating"
                                    value={scheduleOptions.slot_length}
                                    placeholder="Select slot length"
                                    options={slotOptions}
                                    OnChangeHandler={handleSelection}
                                />
                            </div>
                            <div className="form-group">
                                <ErrorMessageInput
                                    type={"text"}
                                    name="price_per_slot"
                                    value={scheduleOptions.price_per_slot}
                                    OnChangeHandler={handleChange}
                                    placeholder={"Price per slot"}
                                />
                            </div>
                            <div className="form-group">
                                <ButtonGroup className="w-100">
                                    <Button color="info" onClick={() => {setScheduleOptions({...scheduleOptions, discount_type: 0})}} active={scheduleOptions.discount_type === 0}>No discount</Button>
                                    <Button color="info" onClick={() => {setScheduleOptions({...scheduleOptions, discount_type: 1})}} active={scheduleOptions.discount_type === 1}>Percent discount</Button>
                                    <Button color="info" onClick={() => {setScheduleOptions({...scheduleOptions, discount_type: 2})}} active={scheduleOptions.discount_type === 2}>Fixed discount</Button>
                                </ButtonGroup>
                            </div>
                            <div className="form-group">
                                <ErrorMessageInput
                                    disabled={scheduleOptions.discount_type === 0}
                                    type={"text"}
                                    name="discount_amount"
                                    value={scheduleOptions.discount_amount}
                                    OnChangeHandler={handleChange}
                                    placeholder={"Discount"}
                                />
                            </div>
                            <div className="form-group">
                                <ErrorMessageInput
                                    disabled={scheduleOptions.discount_type === 0}
                                    type={"text"}
                                    name="discount_end"
                                    value={scheduleOptions.discount_end}
                                    OnChangeHandler={handleChange}
                                    placeholder={"Discount end"}
                                />
                            </div>
                        </div>
                    </StickyBox>
                </div>
                <div className="col-9">
                    <ScheduleSelectionForm calender={false} slotLength={scheduleOptions.slot_length} />
                </div>
            </div>
        </>
    );
};

export default EditLawyerSchedule;
