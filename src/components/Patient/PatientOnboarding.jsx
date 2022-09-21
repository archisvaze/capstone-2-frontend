import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import FileBase64 from 'react-file-base64';
import { specialities } from "../../specialities"
import { useNavigate } from 'react-router-dom';

export default function PatientOnboarding() {
  const state = useSelector((state) => state.myState);
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("")
  const [phone, setPhone] = useState("")
  const [conditions, setConditions] = useState("")
  const [bloodgroup, setBloodgroup] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [img, setImg] = useState(null)
  const [lookingfor, setLookingfor] = useState("")
  const [showMenu, setShowMenu] = useState(false)

  function onboard() {
    if (city.length <= 1 ||
      country.length <= 1 ||
      phone <= 1 ||
      conditions.length <= 1 ||
      bloodgroup.length < 1 ||
      age <= 1 ||
      lookingfor.length <= 1 ||
      gender.length <= 1) {
      console.log("all fields must be filled")
      return;
    }
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${state.user.accessToken}`
      },
      body: JSON.stringify({ email: state.user.email, city, country, conditions, age, bloodgroup, gender, img, phone, lookingfor })
    }

    fetch(`http://localhost:8000/patient/onboard/`, reqOptions)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.error) { }
        else {
          navigate("/patient-home")
        }
      })


  }
  return (
    <div className='patient-onboarding page'>
      <div className="onboarding-container">
        <FileBase64
          multiple={false}
          onDone={({ base64 }) => setImg(base64)} />
        <div className="contact-info">
          <input onChange={(e) => setCity(e.target.value)} type="text" placeholder='City' value={city} />
          <input onChange={(e) => setCountry(e.target.value)} type="text" placeholder='Country' value={country} />
          <input onChange={(e) => setPhone(e.target.value)} type="number" placeholder='Phone Number' value={phone} />
        </div>

        <div className="conditions">
          <p>Describe your Health Condition in detail. Include any symptoms or past health issues</p>

          <textarea onChange={(e) => setConditions(e.target.value)} style={{ resize: "none" }} rows="4" type="text" value={conditions} />
        </div>

        <div className="specialities-container">

          <p>What kind of a doctor are you looking for?</p>

          <button onClick={() => {
            setShowMenu(!showMenu)
          }}>Speciality<span style={{ transform: showMenu === true ? "rotate(180deg)" : "rotate(0deg)", transition: "0.5s" }}>▼</span></button>

          <div style={{ display: showMenu === true ? "flex" : "none" }} className="specialities">
            {specialities.map(l => {
              return (
                <p onClick={() => {
                  setLookingfor(l);
                  setShowMenu(false)
                }} key={l}>{l}</p>
              )
            })}

          </div>
        </div>

        <div className="health-data">
          <input onChange={(e) => setBloodgroup(e.target.value)} type="text" placeholder='Blood Group' value={bloodgroup} />
          <input onChange={(e) => setAge(e.target.value)} type="number" placeholder='Age' value={age} />
          <input onChange={(e) => setGender(e.target.value)} type="text" placeholder='Gender' value={gender} />
        </div>

        <button onClick={() => { onboard() }} className="submit">Submit</button>
      </div>
    </div>
  )
}
