import React from 'react'
import { Rating } from '@mui/material';
import phone from "../../icons/phone.svg";
import profile from "../../icons/profile.svg";

export default function AppointmentCard(props) {
    let obj = props.obj
    return (
        <div className="previous-consultation">

            <div className="pc-contact-info">
                <img style={{ width: "35px", height: "35px", borderRadius: "70px", objectFit: "cover" }} src={obj.doctor.img === null ? profile : obj.doctor.img} alt="" />
                <div className="pc-contact">
                    <p style={{ fontWeight: "bold" }}>Dr. {obj.doctor.username}</p>
                    <p style={{ color: "grey", fontSize: "14px" }}>{obj.doctor.qualification}</p>
                </div>
            </div>

            <div className="pc-rating">
                <p>{obj.doctor.speciality}</p>
            </div>


            <div className="pc-time">
                <p>{obj.date}</p>
            </div>

            <div className="pc-time">
                <p>{obj.time}</p>
            </div>

        </div>
    )
}
