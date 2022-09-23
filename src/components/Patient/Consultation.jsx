import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { allDays } from '../../times';
import Calendar from 'react-calendar';


export default function Consultation(props) {
    const state = useSelector((state) => state.myState);
    const doctor = state.consultation.doctor;
    const patient = state.consultation.patient;

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [times, setTimes] = useState([])

    function getTimes() {
        if (date.length <= 1) {
            console.log("date is not set")
        }
        else if (doctor?.doctor_id) {
            fetch(`http://localhost:8000/doctor/timings/${doctor.doctor_id}/${date}`, { method: "get", headers: { "Authorization": `Bearer ${state.accessToken}` } })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setTimes(data.times)
                })
        }
    }

    function setnewDate() {
        console.log(date)
        const localDate = new Date(date).toISOString();
        const newDate = localDate.split("T")[0];
        console.log(newDate)
        return newDate;
    }

    useEffect(() => {
        getTimes();
    }, [date])

    function bookConsultation() {
        if (time.length < 1 || date.length < 1) {
            console.log("all fields muust be filled");
            return;
        }
        let newDate = setnewDate();
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${state.accessToken}`
            },
            body: JSON.stringify({
                patient_id: patient.patient_id,
                doctor_id: doctor.doctor_id, time, date: newDate
            })
        }
        fetch(`http://localhost:8000/consultation/`, reqOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }


    return (
        <div className='consultation-container'>
            <div className="calendar">
                <p className='select-date'>Select a Date</p>
                <p className='availability'>Availability:  every {doctor?.days.map(day => <span key={day}>{day}</span>)}</p>
                <Calendar
                    onChange={setDate}
                    value={date}
                />
            </div>

            <div className="consultation-info-container">
                <div className="consultation-doctor-info">
                    <img style={{ width: "90px", height: "90px", borderRadius: "100px", objectFit: 'cover' }} src={doctor?.img} alt="" />
                    <h3>Book an appointment with Dr {doctor?.username}</h3>
                </div>


                <div className="consultation-times-container">

                    {doctor?.days.includes(allDays[new Date(date).getDay()]) ? times.map(t => {
                        return (
                            <p style={{ backgroundColor: time === t ? "#0eca2d" : "white", color: time === t ? "white" : "black" }} onClick={() => {
                                setTime(t)
                            }} key={t}>{t}</p>
                        )
                    }) : <p style={{ border: "none" }}>No Consultations on this day</p>}
                </div>

                <button style={{ backgroundColor: time === "" ? "" : "#0eca2d", color: time === "" ? "black" : "white" }} onClick={() => bookConsultation()}>Book</button>
            </div>

        </div>
    )
}
