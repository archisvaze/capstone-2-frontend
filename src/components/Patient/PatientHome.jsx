import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from '@mui/material';
import Consultation from './Consultation';
import { useNavigate } from 'react-router-dom';
import { setConsultation, setLogout, setAlert } from '../../slices/mySlice';
import avatar from "../../images/avatar-placeholder.webp"
import { specialities } from "../../specialities"
import doctors_img from "../../images/doctors.svg"
import { motion } from 'framer-motion';

export default function PatientHome() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.myState);
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([])
  const [speciality, setSpeciality] = useState("All")
  const [showPopUp, setShowPopUp] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

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

  useEffect(() => {
    getDoctors(speciality)
  }, [speciality])

  function alert(text, flag) {
    dispatch(setAlert([text, true, flag]))
    setTimeout(() => {
      dispatch(setAlert([text, false, flag]))
    }, 4000)
  }

  function getDoctors(speciality) {
    if (speciality === "All" || speciality === undefined) {
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

  function getDoctorsByCity(city) {
    if (city === "" || city === undefined) {
      fetch(`http://localhost:8000/doctor/`, { method: 'get', headers: { "Authorization": `Bearer ${state.accessToken}` } })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setDoctors(data)
        })
    } else {
      fetch(`http://localhost:8000/doctor/city/${city}`, { method: 'get', headers: { "Authorization": `Bearer ${state.accessToken}` } })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setDoctors(data)
        })
    }
  }
  function getDoctorsByName(username) {
    if (username === "" || username === undefined) {
      fetch(`http://localhost:8000/doctor/`, { method: 'get', headers: { "Authorization": `Bearer ${state.accessToken}` } })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setDoctors(data)
        })
    } else {
      fetch(`http://localhost:8000/doctor/username/${username}`, { method: 'get', headers: { "Authorization": `Bearer ${state.accessToken}` } })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setDoctors(data)
        })
    }
  }

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
      className="patient-home page user-patient">

      <p className='heading'>Search Doctor, Make an Appointment</p>
      <p className='sub-heading'>Discover the best doctor in your city that meets your needs</p>
      <img style={{ width: "500px" }} src={doctors_img} alt="" />

      <div className="ph-search-container">
        <div className="ph-search">
          <p className="search-label">Search by Name</p>
          <input onChange={(e) => {
            if (e.target.value === "") {
              getDoctorsByName(e.target.value)
            }
          }} onKeyDown={(e) => {
            if (e.key === "Enter") {
              getDoctorsByName(e.target.value)
            }
          }} type="text" />
        </div>
        <div className="ph-search">
          <p className="search-label">Search by City</p>
          <input onChange={(e) => {
            if (e.target.value === "") {
              getDoctorsByCity(e.target.value)
            }
          }} onKeyDown={(e) => {
            if (e.key === "Enter") {
              getDoctorsByCity(e.target.value)
            }
          }} type="text" />
        </div>
        <div className="ph-specialities-container">

          <p className="search-label">Search by Speciality</p>

          <button onClick={() => {
            setShowMenu(!showMenu)
          }}>{speciality === "All" ? "Select" : `${speciality}`}</button>

          <div style={{ display: showMenu === true ? "flex" : "none" }} className="ph-specialities" onMouseLeave={() => { setShowMenu(false) }}>
            {specialities.map(l => {
              return (
                <p style={{ background: speciality === l ? "#3175db" : "white", color: speciality === l ? "white" : "black" }} onClick={() => {
                  setSpeciality(l);
                  setShowMenu(false)
                }} key={l}>{l}</p>
              )
            })}

          </div>
        </div>
      </div>

      <div className="ph-doctors-container">
        {doctors.map(obj => {
          if (obj.onboarded === true) {
            return (
              <div key={obj.doctor_id} className="ph-doctor-card">
                <div className="doctor-card-left">
                  <img style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "100px" }} src={obj.img === null ? avatar : obj.img} alt="" />
                  <Rating name="rating-read" value={obj.rating} readOnly />
                  <p className='dc-name'>Dr. {obj.username}</p>
                  <p className="dc-speciality">{obj.speciality}</p>

                </div>
                <div className="doctor-card-right">
                  <p className='dc-tag'>City</p>
                  <p className="dc-tag-body">{obj.city}</p>

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


      <div style={{ display: showPopUp === true ? "flex" : "none" }} className="conultation-page-container">
        <Consultation showPopUp={showPopUp} setShowPopUp={setShowPopUp} alert={alert} />
        <div onClick={() => {
          setShowPopUp(false)
        }} className="filter"></div>
      </div>

    </motion.div>
  )
}
