import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setAdmin, setAlert } from '../../slices/mySlice';
import avatar from "../../images/avatar-placeholder.webp"
import { Rating } from '@mui/material';

export default function AdminLogin() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.myState);
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([])

    function alert(text, flag) {
        dispatch(setAlert([text, true, flag]))
        setTimeout(() => {
            dispatch(setAlert([text, false, flag]))
        }, 4000)
    }

    useEffect(() => {
        if (state.admin === false) {
            dispatch(setAdmin(false))
            navigate("/");
        } else {
            getDoctors();
        }
    }, [])

    const getDoctors = async () => {
        fetch('https://doc-seek-server.onrender.com/all-doctors')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
            })
    }

    const suspend = async (id) => {
        fetch(`https://doc-seek-server.onrender.com/suspend-doctor/${id}`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                getDoctors();
            })
    }

    const unsuspend = async (id) => {
        fetch(`https://doc-seek-server.onrender.com/unsuspend-doctor/${id}`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                getDoctors();
            })
    }
    return (
        <div className='admin-page'>
            <h3>Manage Doctors</h3>
            <div className="admin-doctors-container">
                {doctors.map(obj => {
                    if (obj.onboarded === true) {
                        return (
                            <div key={obj.doctor_id} className="ph-doctor-card">

                                <button style={{ opacity: obj.suspended === true ? "0" : "1" }} disabled={obj.suspended} onClick={() => {
                                    suspend(obj.doctor_id)
                                }} className="suspend-btn">
                                    Suspend Account
                                </button>

                                <button onClick={() => {
                                    unsuspend(obj.doctor_id)
                                }} style={{ display: obj.suspended === true ? "flex" : "none" }} className="unsuspend-btn">Unsuspend Account</button>

                                <p style={{ display: obj.suspended === true ? "flex" : "none" }} className="suspended">Account Suspended</p>
                                <div className="doctor-card-left">
                                    <img style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "100px" }} src={obj.img === null ? avatar : obj.img} alt="" />
                                    <Rating name="rating-read" value={obj.rating} readOnly />
                                    <p className='dc-name'>Dr. {obj.username}</p>
                                    <p className="dc-speciality">{obj.speciality}</p>

                                </div>
                                <div className="doctor-card-right">
                                    <p className='dc-tag'>City</p>
                                    <p className="dc-tag-body">{obj.city}</p>

                                    <p className='dc-tag'>Degree</p>
                                    <p className="dc-tag-body">{obj.qualification}</p>

                                    <p className='dc-tag'>Hospital</p>
                                    <p className="dc-tag-body">{obj.hospital}</p>

                                    <p className='dc-tag'>Cost / Consultation</p>
                                    <p className="dc-tag-body"> $ {obj.cost}</p>

                                </div>
                            </div>
                        )
                    } else { return (<></>) }
                })}

            </div>
        </div>
    )
}
