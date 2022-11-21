import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setLogout, setAlert } from '../../slices/mySlice';
import profile from "../../icons/profile.svg";
import ConsultationCard from './ConsultationCard';
import PreviousConsultation from './PreviousConsultation';
import { allDays } from '../../times';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';

export default function DoctorHome() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.myState);
  const navigate = useNavigate();

  const [consultations, setConsultations] = useState([])
  const [showNotes, setShowNotes] = useState(false)
  const [patient, setPatient] = useState({})
  const [consultationID, setConsultationID] = useState("")
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState(new Date())
  const [formatedDate, setFormatedDate] = useState("")
  const [earnings, setEarnings] = useState(0)

  useEffect(() => {
    if (state.isLoggedIn === false) {
      dispatch(setLogout())
      navigate("/")
    } else if (state.user.doctor_id === undefined) {
      dispatch(setLogout())
      navigate("/")
    } else if (state.user.onboarded === false) {
      navigate("/doctor-onboarding")
    } else if (state.user.suspended === true) {
      dispatch(setLogout())
      navigate("/account-suspended")
    } else {
      getConsultations();
    }
  }, [])

  useEffect(() => {
    //get earnings
    let money = 0;
    for (let obj of consultations) {
      if (obj.status === true) {
        money += state.user.cost
      }
    }
    setEarnings(money)

  }, [consultations])

  useEffect(() => {
    getConsultations();
  }, [state.alert])

  function alert(text, flag) {
    dispatch(setAlert([text, true, flag]))
    setTimeout(() => {
      dispatch(setAlert([text, false, flag]))
    }, 4000)
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
    setnewDate(date)
  }, [date])


  function getConsultations() {
    fetch(`https://doc-seek.herokuapp.com/consultation/doctor/${state.user.doctor_id}`, { method: "get", headers: { "Authorization": `Bearer ${state.accessToken}` } })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setConsultations(data)
      })
  }

  function updateConsultation() {
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${state.accessToken}`
      },
      body: JSON.stringify({ notes: notes })
    }

    fetch(`https://doc-seek.herokuapp.com/consultation/doctor/${consultationID}`, reqOptions)
      .then(res => res.json())
      .then(data => {
        alert(data.message, "alert")
        console.log(data);
      })

  }

  function cancelConsultation(id) {
    const reqOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${state.accessToken}`
      }
    }
    fetch(`https://doc-seek.herokuapp.com/consultation/${id}`, reqOptions)
      .then(res => res.json())
      .then(data => {
        alert(data.message, "alert")
        console.log(data)
      })
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='doctor-home page user-doctor'>
      <div className="dh-top">
        <Calendar
          onChange={setDate}
          value={date}
        />
        <div className="dh-upcoming-container">
          <h3>{allDays[new Date(date).getDay()]}'s Appointments</h3>
          <div className="upcoming-consultations-container">
            {consultations.map(obj => {
              if (obj?.status === false && obj?.date === formatedDate) {

                return (
                  <ConsultationCard key={obj._id} obj={obj} setNotes={setNotes} setConsultationID={setConsultationID} setPatient={setPatient} setShowNotes={setShowNotes} cancelConsultation={cancelConsultation} />
                )
              } else {
                return (<></>)
              }
            })}
          </div>
        </div>
      </div>

      {/* POP UP DIV */}
      <div style={{ display: showNotes === true ? "flex" : "none" }} className="notes-container">

        <div className="notes">
          <p>Add Notes / Prescriptions for <img src={profile} alt="" />{patient?.username}</p>
          <textarea onChange={(e) => {
            setNotes(e.target.value)
          }} style={{ resize: "none" }} rows="4" type="text" value={notes} />
          <button onClick={() => {
            updateConsultation();
            setShowNotes(false)
          }} style={{ backgroundColor: "#388e3c", borderRadius: "5px" }}>Mark Done</button>

        </div>
        <div onClick={() => {
          setShowNotes(false)
        }} className="filter"></div>
      </div>


      <div className="done-consultations-container">
        <div className="earnings">
          <h3>Previous Consultations -</h3>
          <h3 className='earned'>Total Earned ${earnings}</h3>
        </div>

        <div className="preivous-consultations-container">
          <div className="previous-consultation titles">
            <p>Patient</p>
            <p>Review</p>
            <p>Appointment</p>
            <p>Phone</p>
            <p>Your Notes</p>
          </div>
          {consultations.map(obj => {
            if (obj?.status === true) {
              return (
                <PreviousConsultation key={obj._id} obj={obj} />
              )
            } else {
              return (
                <></>
              )
            }
          })}
        </div>
      </div>

    </motion.div>
  )
}
