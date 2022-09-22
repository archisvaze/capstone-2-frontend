import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../../slices/mySlice';

export default function DoctorHome() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.myState);
  const navigate = useNavigate();

  const [consultations, setConsultations] = useState([])

  useEffect(() => {
    if (state.isLoggedIn === false) {
      dispatch(setLogout())
      navigate("/")
    } else if (state.user.doctor_id === undefined) {
      dispatch(setLogout())
      navigate("/")
    } else if (state.user.onboarded === false) {
      navigate("/doctor-onboarding")
    } else {
      getConsultations();
    }
  }, [])

  function getConsultations() {
    fetch(`http://localhost:8000/consultation/doctor/${state.user.doctor_id}`, { method: "get", headers: { "Authorization": `Bearer ${state.accessToken}` } })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setConsultations(data)
      })
  }


  return (
    <div className='doctor-home page'>

      <h3>Your Upcoming Appointments</h3>
      <div className="upcoming-consultations-container">
        {consultations.map(obj => {
          if (obj?.status === false) {

            return (
              <div key={obj._id} className="dh-consultation">
                <p>Date: {obj.date}</p>
                <p>Time: {obj.time}</p>
                <p>Patient Name: {obj.patient.username}</p>
                <p>Contact: {obj.patient.phone}</p>
                <p>Conditions: {obj.patient.conditions}</p>
              </div>
            )
          }
        })}
      </div>

    </div>
  )
}
