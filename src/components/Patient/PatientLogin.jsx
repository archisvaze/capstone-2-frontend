import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../../slices/mySlice';
import { useDispatch } from 'react-redux'
import patient from "../../backgrounds/patient.jpg"

export default function PatientLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (values) => {
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }

        fetch(`http://localhost:8000/auth/patient/login`, reqOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) { return; }
                else {
                    if (data.user.onboarded === true) {
                        dispatch(setLogin(data))
                        navigate("/patient-home")
                    } else {
                        dispatch(setLogin(data))
                        navigate("/patient-onboarding")
                    }
                }
            })
    }
    return (
        <div className='login fullpage'>
            <div className="form-container">
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validate={(values) => {
                        const errors = {};
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
                        login(values);

                        values.email = "";
                        values.password = "";
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>

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
                                Login
                            </button>

                            <p>Don't have an account? <span onClick={() => {
                                navigate("/patient-signup")
                            }} style={{ cursor: "pointer", textDecoration: "underline" }}>Signup</span> instead</p>

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
