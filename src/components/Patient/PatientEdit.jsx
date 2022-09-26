import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import FileBase64 from 'react-file-base64';
import { specialities } from "../../specialities"
import { useNavigate } from 'react-router-dom';
import { setLogout, setOnboard } from '../../slices/mySlice';
import { motion } from 'framer-motion';

export default function PatientEdit() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.myState);
    const navigate = useNavigate();

    useEffect(() => {
        if (state.isLoggedIn === false) {
            dispatch(setLogout())
            navigate("/")
        } else if (state.user.patient_id === undefined) {
            dispatch(setLogout())
            navigate("/")
        }
    }, [])

    const [city, setCity] = useState(state.user.city);
    const [country, setCountry] = useState(state.user.city)
    const [phone, setPhone] = useState(state.user.phone)
    const [conditions, setConditions] = useState(state.user.conditions)
    const [bloodgroup, setBloodgroup] = useState(state.user.bloodgroup)
    const [age, setAge] = useState(state.user.age)
    const [gender, setGender] = useState(state.user.gender)
    const [img, setImg] = useState(state.user.img)
    const [lookingfor, setLookingfor] = useState(state.user.lookingfor)
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
                "Authorization": `Bearer ${state.accessToken}`
            },
            body: JSON.stringify({ email: state.user.email, city, country, conditions, age, bloodgroup, gender, img, phone, lookingfor })
        }

        fetch(`http://localhost:8000/patient/onboard/`, reqOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) { }
                else {
                    dispatch(setOnboard(data))
                    navigate("/patient-home")
                }
            })


    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='patient-onboarding fullpage user-patient'>

            <h1>Edit You Profile</h1>
            <p>This will help us serve your better.</p>
            <div className="onboarding-container">
                <img style={{ display: img === null ? "none" : "flex", width: "120px", height: "120px", border: "2px solid grey", borderRadius: "60px", objectFit: "cover" }} src={img} alt="" />
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

                    <p>{lookingfor === "" ? "What kind of a doctor are you looking for?" : "I am looking for a " + lookingfor}</p>

                    <button onClick={() => {
                        setShowMenu(!showMenu)
                    }}>Select</button>


                    <div style={{ display: showMenu === true ? "flex" : "none" }} className="specialities" onMouseLeave={() => { setShowMenu(false) }}>
                        {specialities.map(l => {
                            return (
                                <p style={{ background: lookingfor === l ? "#3175db" : "white", color: lookingfor === l ? "white" : "black" }} onClick={() => {
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

                <button onClick={() => { onboard() }} className="save-btn">Save</button>
            </div>
        </motion.div>
    )
}
