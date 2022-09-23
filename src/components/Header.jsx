import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../slices/mySlice';
import Logo from "./Logo"

export default function Header() {
    const state = useSelector((state) => state.myState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <header>
            
            <div style={{ top: state.alert[1] === true ? "90px" : "-20vh", backgroundColor: state.alert[2] === "error" ? "crimson" : "mediumseagreen" }} className="alert">{state.alert[0]}</div>

            <nav>
                <div className="logo-container">
                    <Logo />
                    <div style={{ display: state.isLoggedIn === false ? "none" : state.user.doctor_id ? "flex" : "none" }} className="user-header">
                        <img style={{ width: "30px", height: "30px", borderRadius: "15px", objectFit: "cover" }} src={state.user.img} alt="" />
                        <p style={{ fontWeight: "bold" }}>Dr. {state.user.username}</p>
                    </div>

                </div>

                <button onClick={() => {
                    dispatch(setLogout())
                    navigate("/")
                }} className="logout-btn">Logout</button>
            </nav>
        </header>
    )
}
