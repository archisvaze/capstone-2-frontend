import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function PatientHome() {
  const state = useSelector((state) => state.myState);
  const [consultations, setConsultations] = useState([])
  const [doctors, setDoctors] = useState([])
  const [speciality, setSpeciality] = useState(null)

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

      <main>

        <div className="ph-consultations-container">

        </div>

        <div className="ph-doctors-container">
          {doctors.map(obj => {
            return (
              <div key={obj.doctor_id} className="ph-doctor">
                <p>Dr. {obj.username}</p>
                <p>{obj.speciality}</p>
              </div>
            )
          })}
        </div>

      </main>
    </div>
  )
}
