import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setLogout, setAlert } from '../../slices/mySlice';
import profile from "../../icons/profile.svg";
import ConsultationCard from './ConsultationCard';
import PreviousConsultation from './PreviousConsultation';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";
import { allDays } from '../../times';

export default function DoctorHome() {
  let today = new Date().toISOString().split("T")[0];
  let year = Number(today.split("-")[0])
  let month = Number(today.split("-")[1])
  let day = Number(today.split("-")[2])
  const defaultValue = {
    year: year,
    month: month,
    day: day,
  };
  const dispatch = useDispatch();
  const state = useSelector((state) => state.myState);
  const navigate = useNavigate();

  const [consultations, setConsultations] = useState([])
  const [showNotes, setShowNotes] = useState(false)
  const [patient, setPatient] = useState({})
  const [consultationID, setConsultationID] = useState("")
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState(defaultValue)
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
    }, 2000)
  }


  function getConsultations() {
    fetch(`http://localhost:8000/consultation/doctor/${state.user.doctor_id}`, { method: "get", headers: { "Authorization": `Bearer ${state.accessToken}` } })
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

    fetch(`http://localhost:8000/consultation/doctor/${consultationID}`, reqOptions)
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
    fetch(`http://localhost:8000/consultation/${id}`, reqOptions)
      .then(res => res.json())
      .then(data => {
        alert(data.message, "alert")
        console.log(data)
      })
  }


  return (
    <div className='doctor-home page'>
      <div className="dh-top">
        <Calendar
          value={date}
          onChange={setDate}
          shouldHighlightWeekends
        />
        <div className="dh-upcoming-container">
          <h3>{allDays[new Date(`${date.year}-${date.month}-${date.day}`).getDay()]}'s Appointments</h3>
          <div className="upcoming-consultations-container">
            {consultations.map(obj => {
              if (obj?.status === false && obj?.date === `${date.year}-${date.month}-${date.day}`) {

                return (
                  <ConsultationCard key={obj._id} obj={obj} setNotes={setNotes} setConsultationID={setConsultationID} setPatient={setPatient} setShowNotes={setShowNotes} cancelConsultation={cancelConsultation} />
                )
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
          }} style={{ backgroundColor: "#22c55e" }}>Mark Done</button>

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
            }
          })}
        </div>
      </div>

    </div>
  )
}
