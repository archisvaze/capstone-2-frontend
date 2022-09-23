import React, { useEffect, useState } from 'react'
// import FileBase64 from 'react-file-base64';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { specialities } from "../../specialities"
// import { allDays, allTimes } from "../../times"
// import { setLogout, setOnboard } from '../../slices/mySlice';

export default function DoctorEdit() {
    console.log("hello")
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state.myState);
//   const navigate = useNavigate();

//   const [city, setCity] = useState(state.user.city);
//   const [country, setCountry] = useState(state.user.country)
//   const [img, setImg] = useState(state.user.img)
//   const [speciality, setSpeciality] = useState(state.user.speciality)
//   const [showMenu, setShowMenu] = useState(false)
//   const [qualification, setQualification] = useState(state.user.qualification)
//   const [experience, setExperience] = useState(state.user.experience)
//   const [hospital, setHospital] = useState(state.user.hospital)
//   const [cost, setCost] = useState(state.user.cost)
//   const [days, setDays] = useState(state.user.days)
//   const [times, setTimes] = useState(state.user.times)
//   const [showDays, setShowDays] = useState(false)
//   const [showTimes, setShowTimes] = useState(false)

//   useEffect(() => {
//     if (state.isLoggedIn === false) {
//       dispatch(setLogout())
//       navigate("/")
//     } else if (state.user.doctor_id === undefined) {
//       dispatch(setLogout())
//       navigate("/")
//     }
//   }, [])


//   function onboard() {
//     if (city.length <= 1 ||
//       country.length <= 1 ||
//       speciality.length <= 1 ||
//       qualification.length < 1 ||
//       experience < 1 ||
//       cost <= 1 ||
//       hospital.length <= 1 ||
//       days.length < 1 ||
//       times.length < 1) {
//       console.log("all fields must be filled")
//       return;
//     }
//     const reqOptions = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "Authorization": `Bearer ${state.accessToken}`
//       },
//       body: JSON.stringify({ email: state.user.email, city, country, speciality, cost, img, hospital, experience, days, times, qualification })
//     }

//     fetch(`http://localhost:8000/doctor/onboard/`, reqOptions)
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//         if (data.error) { }
//         else {
//           dispatch(setOnboard(data))
//           navigate("/doctor-home")
//         }
//       })
//   }

//   function addDays(day) {
//     let clone = JSON.parse(JSON.stringify(days))
//     if (clone.includes(day)) {
//       for (let i = 0; i < clone.length; i++) {
//         if (clone[i] === day) {
//           clone.splice(i, 1)
//           setDays([...clone]);
//           return;
//         }
//       }
//     } else {
//       setDays([...days, day])
//       return;
//     }
//   }

//   function addTimes(time) {
//     let clone = JSON.parse(JSON.stringify(times))
//     if (clone.includes(time)) {
//       for (let i = 0; i < clone.length; i++) {
//         if (clone[i] === time) {
//           clone.splice(i, 1)
//           setTimes([...clone]);
//           return;
//         }
//       }
//     } else {
//       setTimes([...times, time])
//       return;
//     }
//   }


  return (
    <div className='doctor-onboarding fullpage'>
      <h1>Let's get you on board!</h1>
      {/* <div className="onboarding-container">

        <img style={{ display: img === null ? "none" : "flex", width: "120px", height: "120px", border: "2px solid grey", borderRadius: "60px", objectFit: "cover" }} src={img} alt="" />

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

          <p>{speciality === "" ? "What is your speciality?" : "I am a " + speciality}</p>

          <button onClick={() => {
            setShowMenu(!showMenu)
          }}>Select</button>

          <div style={{ display: showMenu === true ? "flex" : "none" }} className="specialities" onMouseLeave={() => { setShowMenu(false) }}>
            {specialities.map(l => {
              return (
                <p style={{ background: speciality === l ? "#0eca2d" : "white", color: speciality === l ? "white" : "black" }} onClick={() => {
                  setSpeciality(l);
                  setShowMenu(false)
                }} key={l}>{l}</p>
              )
            })}

          </div>
        </div>
        <div className="day-time-container">
          <div className="days-container">
            <p>Select the days you are available</p>
            <button onClick={() => {
              setShowDays(!showDays)
            }}>Select</button>
            <div className="days" style={{ display: showDays === true ? "flex" : "none" }} onMouseLeave={() => { setShowDays(false) }}>
              {allDays.map(d => {
                return (
                  <p onClick={() => {
                    addDays(d);
                  }} style={{ background: days.includes(d) ? "#0eca2d" : "white", color: days.includes(d) ? "white" : "black" }} key={d}>{d}</p>
                )
              })}
            </div>
          </div>
          <div className="times-container">
            <p>Select the timings you are available</p>
            <button onClick={() => {
              setShowTimes(!showTimes)
            }}>Select</button>
            <div className="times" style={{ display: showTimes === true ? "flex" : "none" }} onMouseLeave={() => { setShowTimes(false) }}>
              {allTimes.map(t => {
                return (
                  <p onClick={() => {
                    addTimes(t);
                  }} style={{ background: times.includes(t) ? "#0eca2d" : "white", color: times.includes(t) ? "white" : "black" }} key={t}>{t}</p>
                )
              })}
            </div>
          </div>
        </div>


        <div className="other-data">
          <input onChange={(e) => setHospital(e.target.value)} type="text" placeholder='Hospital' value={hospital} />
          <input onChange={(e) => setCost(e.target.value)} type="number" placeholder='Cost/consultation' value={cost} />
          <input type="text" onChange={(e) => setQualification(e.target.value)} placeholder="Qualifications" value={qualification} />
        </div>

        <button onClick={() => { onboard() }} className="save-btn">Save</button>

      </div> */}
    </div>
  )
}
