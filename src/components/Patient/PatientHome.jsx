import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from '@mui/material';
import Consultation from './Consultation';
import { useNavigate } from 'react-router-dom';
import { setConsultation, setLogout } from '../../slices/mySlice';
import avatar from "../../images/avatar-placeholder.webp"


export default function PatientHome() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.myState);
  const navigate = useNavigate();

  const [consultations, setConsultations] = useState([])
  const [doctors, setDoctors] = useState([])
  const [speciality, setSpeciality] = useState(null)

  const [showPopUp, setShowPopUp] = useState(false)

  useEffect(() => {
    if (state.isLoggedIn === false) {
      dispatch(setLogout())
      navigate("/")
    } else if (state.user.patient_id === undefined) {
      dispatch(setLogout())
      navigate("/")
    } else {
      getDoctors(speciality);
    }
  }, [])

  function getMyConsultations() {

  }

  function getDoctors(speciality) {
    if (speciality === null || speciality === undefined) {
      fetch(`http://localhost:8000/doctor/`, { method: 'get', headers: { "Authorization": `Bearer ${state.accessToken}` } })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setDoctors(data)
        })
    } else {
      fetch(`http://localhost:8000/doctor/${speciality}`, { method: 'get', headers: { "Authorization": `Bearer ${state.accessToken}` } })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setDoctors(data)
        })
    }
  }

  return (
    <div className="patient-home page">

      <div className="ph-left">

      </div>

      <div className="ph-right">
        <div className="ph-consultations-container">

        </div>

        <div className="ph-doctors-container">
          {doctors.map(obj => {
            if (obj.onboarded === true) {
              return (
                <div key={obj.doctor_id} className="ph-doctor-card">
                  <div className="doctor-card-left">
                    <img style={{ width: "115px", height: "115px", objectFit: "cover", borderRadius: "100px" }} src={obj.img === null ? avatar : obj.img} alt="" />
                    <Rating name="rating-read" value={obj.rating} readOnly />
                    <p className='dc-name'>Dr. {obj.username}</p>
                    <p className="dc-speciality">{obj.speciality}</p>

                  </div>
                  <div className="doctor-card-right">

                    <p className='dc-tag'>Degree</p>
                    <p className="dc-tag-body">{obj.qualification}</p>

                    <p className='dc-tag'>Hospital</p>
                    <p className="dc-tag-body">{obj.hospital}</p>

                    <p className='dc-tag'>Cost / Consultation</p>
                    <p className="dc-tag-body"> $ {obj.cost}</p>



                    <button onClick={() => {
                      dispatch(setConsultation({ doctor: obj, patient: state.user }))
                      setShowPopUp(true);
                    }}>Book a Consultation</button>

                  </div>
                </div>
              )
            } else { return (<></>) }
          })}
        </div>
      </div>


      <div style={{ display: showPopUp === true ? "flex" : "none" }} className="conultation-page-container">
        <Consultation showPopUp={showPopUp} />
        <div onClick={() => {
          setShowPopUp(false)
        }} className="filter"></div>
      </div>

    </div>
  )
}
