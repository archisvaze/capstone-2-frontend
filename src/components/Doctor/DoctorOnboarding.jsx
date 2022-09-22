import React, { useState } from 'react'
import FileBase64 from 'react-file-base64';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { specialities } from "../../specialities"
import { allDays, allTimes } from "../../times"

export default function DoctorOnboarding() {




  const state = useSelector((state) => state.myState);
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("")
  const [img, setImg] = useState(null)
  const [speciality, setSpeciality] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const [qualification, setQualification] = useState('')
  const [experience, setExperience] = useState('')
  const [hospital, setHospital] = useState('')
  const [cost, setCost] = useState("")
  const [days, setDays] = useState([])
  const [times, setTimes] = useState([])
  const [showDays, setShowDays] = useState(false)
  const [showTimes, setShowTimes] = useState(false)



  function onboard() {
    if (city.length <= 1 ||
      country.length <= 1 ||
      speciality.length <= 1 ||
      qualification.length < 1 ||
      experience < 1 ||
      cost <= 1 ||
      hospital.length <= 1 ||
      days.length < 1 ||
      times.length < 1) {
      console.log("all fields must be filled")
      return;
    }
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${state.user.accessToken}`
      },
      body: JSON.stringify({ email: state.user.email, city, country, speciality, cost, img, hospital, experience, days, times, qualification })
    }

    fetch(`http://localhost:8000/doctor/onboard/`, reqOptions)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.error) { }
        else {
          navigate("/doctor-home")
        }
      })
  }

  function addDays(day) {
    let clone = JSON.parse(JSON.stringify(days))
    if (clone.includes(day)) {
      for (let i = 0; i < clone.length; i++) {
        if (clone[i] === day) {
          clone.splice(i, 1)
          setDays([...clone]);
          return;
        }
      }
    } else {
      setDays([...days, day])
      return;
    }
  }

  function addTimes(time) {
    let clone = JSON.parse(JSON.stringify(times))
    if (clone.includes(time)) {
      for (let i = 0; i < clone.length; i++) {
        if (clone[i] === time) {
          clone.splice(i, 1)
          setTimes([...clone]);
          return;
        }
      }
    } else {
      setTimes([...times, time])
      return;
    }
  }


  return (
    <div className='doctor-onboarding page'>
      <h1>Let's get you on board!</h1>
      <div className="onboarding-container">

        <FileBase64
          multiple={false}
          onDone={({ base64 }) => setImg(base64)} />

        <div className="contact-info">
          <input onChange={(e) => setCity(e.target.value)} type="text" placeholder='City' value={city} />
          <input onChange={(e) => setCountry(e.target.value)} type="text" placeholder='Country' value={country} />
        </div>

        <div className="experience">
          <p>Describe your Experience in Detail. List your years of medical practice and your acheivments</p>

          <textarea onChange={(e) => setExperience(e.target.value)} style={{ resize: "none" }} rows="4" type="text" value={experience} />
        </div>

        <div className="specialities-container">

          <p>What is your speciality?</p>

          <button onClick={() => {
            setShowMenu(!showMenu)
          }}>Speciality<span style={{ transform: showMenu === true ? "rotate(180deg)" : "rotate(0deg)", transition: "0.5s" }}>▼</span></button>

          <div style={{ display: showMenu === true ? "flex" : "none" }} className="specialities" onMouseLeave={() => { setShowMenu(false) }}>
            {specialities.map(l => {
              return (
                <p onClick={() => {
                  setSpeciality(l);
                  setShowMenu(false)
                }} key={l}>{l}</p>
              )
            })}

          </div>
        </div>

        <div className="days-container">
          <p>Select the days you are available</p>
          <button onClick={() => {
            setShowDays(!showDays)
          }}>Days</button>
          <div className="days" style={{ display: showDays === true ? "flex" : "none" }} onMouseLeave={() => { setShowDays(false) }}>
            {allDays.map(d => {
              return (
                <p onClick={() => {
                  addDays(d);
                }} style={{ border: days.includes(d) ? "2px solid yellowgreen" : "2px solid transparent" }} key={d}>{d}</p>
              )
            })}
          </div>
        </div>

        <div className="times-container">
          <p>Select the timings you are available</p>
          <button onClick={() => {
            setShowTimes(!showTimes)
          }}>Timings</button>
          <div className="times" style={{ display: showTimes === true ? "flex" : "none" }} onMouseLeave={() => { setShowTimes(false) }}>
            {allTimes.map(t => {
              return (
                <p onClick={() => {
                  addTimes(t);
                }} style={{ border: times.includes(t) ? "2px solid yellowgreen" : "2px solid transparent" }} key={t}>{t}</p>
              )
            })}
          </div>
        </div>


        <div className="other-data">
          <input onChange={(e) => setHospital(e.target.value)} type="text" placeholder='Hospital' value={hospital} />
          <input onChange={(e) => setCost(e.target.value)} type="number" placeholder='Cost/consultation' value={cost} />
          <input type="text" onChange={(e) => setQualification(e.target.value)} placeholder="Qualifications" value={qualification} />
        </div>

        <button onClick={() => { onboard() }} className="submit">Submit</button>

      </div>
    </div>
  )
}
