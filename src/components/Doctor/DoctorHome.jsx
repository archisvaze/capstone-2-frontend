import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../../slices/mySlice';
import calendar from "../../icons/calendar.svg";
import clock from "../../icons/clock.svg";
import health from "../../icons/health.svg";
import phone from "../../icons/phone.svg";
import profile from "../../icons/profile.svg";


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

      <h3>New Appointments</h3>
      <div className="upcoming-consultations-container">
        {consultations.map(obj => {
          if (obj?.status === false) {

            return (
              <div key={obj._id} className="dh-consultation">

                <div className="dh-contact-info">
                  <p><img src={profile} alt="" />{obj.patient.username}</p>
                  <p><img src={phone} alt="" />{obj.patient.phone}</p>
                </div>

                <div className="dh-date-time-container">
                  <p> <img src={calendar} alt="" />{obj.date}</p>
                  <p><img src={clock} alt="" />{obj.time}</p>
                </div>

                <p className='dh-conditions'>{obj.patient.conditions}</p>

                <div className="dh-actions">
                  <button style={{ backgroundColor: "crimson" }}>Cancel</button>
                  <button style={{ backgroundColor: "#22c55e" }}>Mark Done</button>
                </div>
              </div>
            )
          }
        })}
      </div>

    </div>
  )
}
