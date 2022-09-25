import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../slices/mySlice';
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function PreviousApointment(props) {
    const state = useSelector((state) => state.myState);
    const dispatch = useDispatch();
    let obj = props.obj;
    const [value, setValue] = useState(2.5);
    const [hover, setHover] = useState(-1);
    const [review, setReview] = useState("")

    function alert(text, flag) {
        dispatch(setAlert([text, true, flag]))
        setTimeout(() => {
            dispatch(setAlert([text, false, flag]))
        }, 4000)
    }

    useEffect(() => {
        if (obj.review !== null) {
            setReview(obj.review)
        }
        if (obj.rating !== null) {
            setValue(obj.rating)
        }
    }, [])



    function postReview() {
        if (review.length <= 2) {
            alert("Please add a review", "error")
            return;
        }

        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${state.accessToken}`
            },
            body: JSON.stringify({ review: review, rating: value })
        }

        fetch(`http://localhost:8000/consultation/patient/${obj._id}`, reqOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    alert(data.error, "error")

                } else {
                    alert(data.message, "alert")
                }
            })

    }

    return (
        <div className='previous-appointment user-patient'>
            <p className='pa-name'>Consultation with Dr.{obj.doctor.username}</p>
            <p className="charged">Charged: $ {obj.cost}</p>
            <p className='pa-notes-tag'>Doctors Notes: </p>
            <div className="pa-notes">
                <p>{obj.notes}</p>
            </div>
            <div className="pa-actions">
                <p style={{ display: obj.rating === null ? "flex" : "none" }}>Give a Rating</p>
                <Box
                    sx={{
                        width: 200,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                            if (obj.rating === null) {
                                setValue(newValue);
                            }
                        }}
                        onChangeActive={(event, newHover) => {
                            if (obj.rating === null) {
                                setHover(newHover);
                            }
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {value !== null && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                </Box>
                <p style={{ display: obj.review === null ? "flex" : "none" }}>Write a Review</p>
                <textarea onChange={(e) => {
                    if (obj.review === null) {
                        setReview(e.target.value)
                    }
                }} className='pa-text' style={{ resize: "none" }} rows="4" type="text" value={review} />

                <button style={{ display: obj.rating === null ? "flex" : "none" }} onClick={() => {
                    postReview();
                }} className="post-btn">Send</button>

            </div>

        </div>
    )
}
