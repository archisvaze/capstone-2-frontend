import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../../slices/mySlice';
import profile from "../../icons/profile.svg";
import ConsultationCard from './ConsultationCard';
import PreviousConsultation from './PreviousConsultation';


export default function DoctorHome() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.myState);
  const navigate = useNavigate();

  const [consultations, setConsultations] = useState([])
  const [showNotes, setShowNotes] = useState(false)
  const [patient, setPatient] = useState({})
  const [consultationID, setConsultationID] = useState("")
  const [notes, setNotes] = useState('')

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
  }, [showNotes])

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
        console.log(data);
      })

  }


  return (
    <div className='doctor-home page'>

      <h3>New Appointments</h3>
      <div className="upcoming-consultations-container">
        {consultations.map(obj => {
          if (obj?.status === false) {

            return (
              <ConsultationCard key={obj._id} obj={obj} setNotes={setNotes} setConsultationID={setConsultationID} setPatient={setPatient} setShowNotes={setShowNotes} />
            )
          }
        })}
      </div>

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
        <h3>Previous Consultations</h3>
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
