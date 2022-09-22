import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from '@mui/material';
import Consultation from '../Consultation';
import { setConsultation } from '../../slices/mySlice';

export default function PatientHome() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.myState);
  const [consultations, setConsultations] = useState([])
  const [doctors, setDoctors] = useState([])
  const [speciality, setSpeciality] = useState(null)

  const [showPopUp, setShowPopUp] = useState(false)

  useEffect(() => {
    getDoctors(speciality);
  }, [])

  function getMyConsultations() {

  }

  function getDoctors(speciality) {
    if (speciality === null || speciality === undefined) {
      fetch(`http://localhost:8000/doctor/`, { method: 'get', headers: { "Authorization": `Bearer ${state.user.accessToken}` } })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setDoctors(data)
        })
    } else {
      fetch(`http://localhost:8000/doctor/${speciality}`, { method: 'get', headers: { "Authorization": `Bearer ${state.user.accessToken}` } })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setDoctors(data)
        })
    }
  }

  return (
    <div className="patient-home page">

      <div className="search-container">
        <input type="text" className="search" />
        <button>Search</button>
      </div>



      <div className="ph-consultations-container">

      </div>

      <div className="ph-doctors-container">
        {doctors.map(obj => {
          return (
            <div key={obj.doctor_id} className="ph-doctor-card">
              <div className="doctor-card-left">
                <img style={{ width: "115px", height: "115px" }} src={obj.img} alt="" />
                <Rating name="rating-read" value={obj.rating} readOnly />

              </div>
              <div className="doctor-card-right">
                <h3>Dr. {obj.username}</h3>
                <p className="doctor-card-exp">
                  {obj.experience}
                </p>
                <p>Associated with {obj.hospital}</p>
                <p>${obj.cost}/consultation</p>
                <button onClick={() => {
                  dispatch(setConsultation({ doctor: obj, patient: state.user }))
                  setShowPopUp(true);
                }}>Book a Consultation</button>

              </div>
            </div>
          )
        })}
      </div>

      <div style={{ display: showPopUp === true ? "flex" : "none" }} className="conultation-page-container">
        <Consultation />
        <div onClick={() => {
          setShowPopUp(false)
        }} className="filter"></div>
      </div>


    </div>
  )
}
