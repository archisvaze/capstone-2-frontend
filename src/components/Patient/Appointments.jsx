import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../../slices/mySlice';
import AppointmentCard from './AppointmentCard';

export default function Appointments() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.myState);
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        if (state.isLoggedIn === false) {
            dispatch(setLogout())
            navigate("/")
        } else if (state.user.patient_id === undefined) {
            dispatch(setLogout())
            navigate("/")
        } else {
            getAppointments();
        }
    }, [])

    function getAppointments() {
        fetch(`http://localhost:8000/consultation/patient/${state.user.patient_id}`, { method: "get", headers: { "Authorization": `Bearer ${state.accessToken}` } })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAppointments(data)
            })
    }
    return (
        <div className='appointments-page page'>
            <h3>Your Upcoming Appointments -</h3>
            <div className="preivous-consultations-container">
                <div className="previous-consultation titles">
                    <p>Doctor</p>
                    <p>Spciality</p>
                    <p>Date</p>
                    <p>Time</p>
                </div>
                {appointments.sort((a, b) => a.date - b.date).map(obj => {
                    if (obj.status === false) {
                        return (
                            <AppointmentCard key={obj._id} obj={obj} />
                        )
                    } else return (<></>)
                })}
            </div>

            <div className="ap-previous-appointments">

            </div>
        </div>
    )
}
