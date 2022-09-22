import { spacing } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Consultation(props) {
    const state = useSelector((state) => state.myState);
    const doctor = state.consultation.doctor;
    const patient = state.consultation.patient;

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [times, setTimes] = useState([])

    const minDate = new Date().toISOString().split("T")[0];

    function getTimes() {
        if (date.length <= 1) {
            console.log("date is not set")
        }
        else if (doctor.doctor_id) {
            fetch(`http://localhost:8000/doctor/timings/${doctor.doctor_id}/${date}`, { method: "get", headers: { "Authorization": `Bearer ${state.accessToken}` } })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setTimes(data.times)
                })
        }
    }


    useEffect(() => {
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
                doctor_id: doctor.doctor_id, time, date
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
            <h3>Book an appointment with Dr {doctor?.username}</h3>
            <p>Select a Date</p>
            <p>Availability:  every {doctor?.days.map(day => <span key={day}>{day}</span>)}</p>
            <input onChange={(e) => {
                setDate(e.target.value)
            }} type="date" name="" id="" min={minDate} />
            <div className="consultation-times-container">
                {times.map(t => {
                    return (
                        <p style={{ border: time === t ? "2px solid yellowgreen" : "2px solid transparent" }} onClick={() => {
                            setTime(t)
                        }} key={t}>{t}</p>
                    )
                })}
            </div>
            <button onClick={() => bookConsultation()}>Book</button>
        </div>
    )
}
