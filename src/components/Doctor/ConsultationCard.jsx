import React from 'react'
import calendar from "../../icons/calendar.svg";
import clock from "../../icons/clock.svg";
import phone from "../../icons/phone.svg";
import profile from "../../icons/profile.svg";


export default function ConsultationCard(props) {
    let obj = props.obj;
    let setNotes = props.setNotes
    let setConsultationID = props.setConsultationID
    let setPatient = props.setPatient
    let setShowNotes = props.setShowNotes;
    let cancelConsultation = props.cancelConsultation;
    return (
        <div key={obj._id} className="dh-consultation user-doctor">

            <div className="dh-date-time-container">
                <p style={{fontSize: "13px", marginLeft : "20px"}}>Consultation Appointment</p>
                <div className='dh-date-time'>
                <p className='dh-date'> <img src={calendar} alt="" />{obj.date}</p>
                <p className='dh-time'><img src={clock} alt="" />{obj.time}</p>
                </div>
            </div>

            <div className="dh-contact-info">
                <p><img style={{width: "30px"}} src={obj.patient.img} alt="" />{obj.patient.username}</p>
                <p><img src={phone} alt="" />{obj.patient.phone}</p>
            </div>

            <div className='dh-conditions'>
                <p>{obj.patient.conditions}</p> </div>

            <div className="dh-actions">
                <button
                    onClick={() => {
                        cancelConsultation(obj._id)
                    }}
                    style={{ backgroundColor: "crimson" }}>Cancel</button>
                <button onClick={() => {
                    setNotes("")
                    setConsultationID("")
                    setPatient({});
                    setPatient(obj.patient)
                    setConsultationID(obj._id)
                    setShowNotes(true)
                }} style={{ backgroundColor: "#388e3c" }}>Mark Done</button>
            </div>
        </div>
    )
}
