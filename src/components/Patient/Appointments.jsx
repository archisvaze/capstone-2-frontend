import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setLogout, setAlert } from '../../slices/mySlice';
import AppointmentCard from './AppointmentCard';
import PreviousApointment from './PreviousApointment';
import { motion } from 'framer-motion';

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
    }, [state.alert])

    function getAppointments() {
        fetch(`https://doc-seek-server.onrender.com/consultation/patient/${state.user.patient_id}`, { method: "get", headers: { "Authorization": `Bearer ${state.accessToken}` } })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAppointments(data)
            })
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='appointments-page page user-patient'>
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

            <h3 style={{ marginTop: "100px" }}>Previous Appointments -</h3>
            <div className="ap-previous-appointments">
                {appointments.sort((a, b) => a.date - b.date).map(obj => {
                    if (obj.status === true) {
                        return (
                            <PreviousApointment key={obj._id} obj={obj} />
                        )
                    } else return (<></>)
                })}
            </div>
        </motion.div>
    )
}
