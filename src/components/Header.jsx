import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../slices/mySlice';
import Logo from "./Logo"
import avatar from "../images/avatar-placeholder.webp"

export default function Header() {
    const state = useSelector((state) => state.myState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <header className={state.user.patient_id === undefined ? 'user-doctor' : 'user-patient'}>

            <div style={{ top: state.alert[1] === true ? "90px" : "-20vh", backgroundColor: state.alert[2] === "error" ? "crimson" : state.user.patient_id === undefined ? "#388e3c" : "#3175db" }} className="alert">{state.alert[0]}</div>

            <nav>
                <div className="logo-container">
                    <Logo />
                    <p className="logo-text">DOCSeek</p>

                    {/* Doctor */}
                    <div style={{ display: state.isLoggedIn === false ? "none" : state.user.doctor_id ? "flex" : "none" }} className="user-header">
                        <img style={{ width: "30px", height: "30px", borderRadius: "15px", objectFit: "cover" }} src={state.user.img === null ? avatar : state.user.img} alt="" />
                        <p style={{ fontWeight: "bold" }}>Dr. {state.user.username}</p>
                    </div>
                    {/* Patient */}
                    <div style={{ display: state.isLoggedIn === false ? "none" : state.user.patient_id ? "flex" : "none" }} className="user-header">
                        <img style={{ width: "30px", height: "30px", borderRadius: "15px", objectFit: "cover" }} src={state.user.img === null ? avatar : state.user.img} alt="" />
                        <p style={{ fontWeight: "bold" }}>{state.user.username}</p>
                    </div>


                </div>

                <div className="header-actions-container">

                    {/* Doctor */}
                    <div style={{ display: state.isLoggedIn === false ? "none" : state.user.doctor_id ? "flex" : "none" }} className="user-header-actions">
                        <a onClick={() => {
                            if (state.user.onboarded === true) {
                                navigate("/doctor-home")
                            }
                        }}>Consultations</a>

                        <a onClick={() => {
                            if (state.user.onboarded === true) {
                                navigate("/doctor-edit")
                            }
                        }}>Edit Profile</a>
                    </div>

                    {/* Patient */}
                    <div style={{ display: state.isLoggedIn === false ? "none" : state.user.patient_id ? "flex" : "none" }} className="user-header-actions">
                        <a onClick={() => {
                            if (state.user.onboarded === true) {
                                navigate("/patient-home")
                            }
                        }}>Home</a>

                        <a onClick={() => {
                            if (state.user.onboarded === true) {
                                navigate("/patient-appointments")
                            }
                        }}>Appointments</a>

                        <a onClick={() => {
                            if (state.user.onboarded === true) {
                                navigate("/patient-edit")
                            }
                        }}>Edit Profile</a>
                    </div>


                    <button style={{ display: state.isLoggedIn === false ? "none" : "flex", borderRadius: "5px" }} onClick={() => {
                        dispatch(setLogout())
                        navigate("/")
                    }} className="logout-btn">Logout</button>
                </div>
            </nav>
        </header>
    )
}
