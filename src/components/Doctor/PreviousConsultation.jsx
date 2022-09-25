import React from 'react'
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import phone from "../../icons/phone.svg";
import profile from "../../icons/profile.svg";

export default function PreviousConsultation(props) {
    let obj = props.obj
    return (
        <div className="previous-consultation user-doctor">

            <div className="pc-contact-info">
                <img style={{ width: "35px", height: "35px", borderRadius: "70px", objectFit: "cover" }} src={obj.patient.img === null ? profile : obj.patient.img} alt="" />
                <div className="pc-contact">
                    <p style={{ fontWeight: "bold" }}>{obj.patient.username}</p>
                    <p style={{ color: "grey", fontSize: "14px" }}>{obj.patient.age} yrs, {obj.patient.gender} </p>
                </div>
            </div>

            <div className="pc-rating">
                <p>{obj.review === null ? "Not rated yet" : obj.review}</p>
                <Rating name="half-rating-read" defaultValue={obj.rating} precision={0.5} readOnly />
            </div>


            <div className="pc-time">
                <p>{obj.time}</p>
                <p style={{ color: "grey" }}>{obj.date}</p>
            </div>

            <div className="pc-phone">
                <img src={phone} alt="" />
                <p>{obj.patient.phone}</p>
            </div>

            <div className="pc-notes">
                <p>{obj.notes}</p>
            </div>

        </div>
    )
}
