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
        <div key={obj._id} className="dh-consultation">

            <div className="dh-contact-info">
                <p><img src={profile} alt="" />{obj.patient.username}</p>
                <p><img src={phone} alt="" />{obj.patient.phone}</p>
            </div>

            <div className="dh-date-time-container">
                <p> <img src={calendar} alt="" />{obj.date}</p>
                <p><img src={clock} alt="" />{obj.time}</p>
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
                }} style={{ backgroundColor: "#22c55e" }}>Mark Done</button>
            </div>
        </div>
    )
}
