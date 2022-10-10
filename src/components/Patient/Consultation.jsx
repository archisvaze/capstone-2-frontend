import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { allDays } from '../../times';
import { setAlert } from '../../slices/mySlice';
import Calendar from 'react-calendar';
import avatar from "../../images/avatar-placeholder.webp"

export default function Consultation(props) {
    const dispatch = useDispatch();
    let showPopUp = props.showPopUp;
    let setShowPopUp = props.setShowPopUp;
    let alert = props.alert;
    const state = useSelector((state) => state.myState);
    const doctor = state.consultation.doctor;
    const patient = state.consultation.patient;

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [times, setTimes] = useState([])

    const [formatedDate, setFormatedDate] = useState("")


    useEffect(() => {
        setDate(new Date())
        setTime("")
        setTimes([])

    }, [showPopUp])

    function getTimes() {
        if (date.length <= 1) {
            console.log("date is not set")
        }
        else if (doctor?.doctor_id) {
            fetch(`https://doc-seek.herokuapp.com/doctor/timings/${doctor.doctor_id}/${date}`, { method: "get", headers: { "Authorization": `Bearer ${state.accessToken}` } })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setTimes(data.times)
                })
        }
    }

    function setnewDate(date) {
        console.log(date)
        let day = new Date(date).getDate();
        let month = new Date(date).getMonth();
        let year = new Date(date).getFullYear();
        let newDate = `${year}-${month + 1}-${day}`
        console.log(newDate)
        setFormatedDate(newDate)
    }

    useEffect(() => {
        console.log(date)
        setnewDate(date)
        getTimes();
    }, [date])

    function bookConsultation() {
        if (time.length < 1 || date.length < 1) {
            console.log("all fields muust be filled");
            return;
        }
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${state.accessToken}`
            },
            body: JSON.stringify({
                patient_id: patient.patient_id,
                doctor_id: doctor.doctor_id, time, date: formatedDate
            })
        }
        dispatch(setAlert(["Booking ", true, "alert", true ]))
        fetch(`https://doc-seek.herokuapp.com/consultation/`, reqOptions)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error, "error")
                }
                if (data.message) {
                    alert(data.message, "alert");
                    setShowPopUp(false)
                }
            })
    }


    return (
        <div className='consultation-container user-patient'>
            <div className="calendar-container">
                <p className='select-date'>Select a Date</p>
                <p className='availability'> Dr. {doctor?.username} is available every <br />{doctor?.days.map(day => <span key={day}>{day} &nbsp;</span>)}</p>
                <Calendar
                    onChange={setDate}
                    value={date}
                    minDate={new Date()}
                />
            </div>

            <div className="consultation-info-container">
                <div className="consultation-doctor-info">
                    <img style={{ width: "90px", height: "90px", borderRadius: "100px", objectFit: 'cover' }} src={doctor?.img === null ? avatar : doctor?.img} alt="" />
                    <h3>Book an appointment with Dr {doctor?.username}</h3>
                    <p style={{ fontSize: "14px" }}>{doctor?.speciality}</p>

                    <div className="dc-cost">
                        <p style={{ fontSize: "15px" }}>Cost / Consultation: <span style={{ fontWeight: "bold" }}> $ {doctor?.cost}</span></p>

                    </div>
                </div>


                <div className="consultation-times-container">

                    {doctor?.days.includes(allDays[new Date(date).getDay()]) ? times.map(t => {
                        return (
                            <p style={{ backgroundColor: time === t ? "#3175db" : "white", color: time === t ? "white" : "black" }} onClick={() => {
                                setTime(t)
                            }} key={t}>{t}</p>
                        )
                    }) : <p style={{ border: "none" }}>No Consultations on this day</p>}
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    <button onClick={() => {
                        setShowPopUp(false)
                    }} className="cancel-btn">Cancel</button>
                    <button style={{ backgroundColor: time === "" ? "" : "#3175db", color: time === "" ? "black" : "white" }} onClick={() => bookConsultation()}>Book</button>
                </div>
            </div>

        </div>
    )
}
