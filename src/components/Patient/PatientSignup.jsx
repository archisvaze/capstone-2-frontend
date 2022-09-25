import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { setAlert } from '../../slices/mySlice';
import { useDispatch } from 'react-redux'
import patient from "../../backgrounds/patient.jpg"

export default function PatientSignup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function alert(text, flag) {
        dispatch(setAlert([text, true, flag]))
        setTimeout(() => {
            dispatch(setAlert([text, false, flag]))
        }, 4000)
    }

    const signup = (values) => {
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }

        fetch(`http://localhost:8000/auth/patient/signup`, reqOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    alert(data.alert.message, "error")
                }
                else {
                    alert("Signed Up! Please Login now", "alert")
                    navigate("/")
                }
            })
    }
    return (
        <div className='login fullpage user-patient'>
            <div className="form-container">
                <Formik
                    initialValues={{ email: "", password: "", username: "" }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.username) {
                            errors.username = "Required";
                        }
                        if (!values.email) {
                            errors.email = "Required";
                        }
                        else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = "Invalid Email Address"
                        }
                        if (!values.password) {
                            errors.password = "Required"
                        }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        signup(values);

                        values.username = "";
                        values.email = "";
                        values.password = "";
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>

                            <Field
                                placeholder="Enter your full name"
                                name="username" />
                            <ErrorMessage
                                style={{ color: "crimson" }}
                                name="username"
                                component="div"
                                className='error-msg' />
                            <Field
                                placeholder="Enter email"
                                name="email" />
                            <ErrorMessage
                                style={{ color: "crimson" }}
                                name="email"
                                component="div"
                                className='error-msg' />


                            <Field
                                placeholder="Enter password"
                                name="password"
                                type="password" />
                            <ErrorMessage
                                style={{ color: "crimson" }}
                                name="password"
                                component="div"
                                className='error-msg' />

                            <button
                                id="submit-btn"
                                type='submit'
                                disabled={isSubmitting}
                            >
                                Signup
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="background">
                <img src={patient} alt="" />
            </div>

        </div>
    )
}
