import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout, setLogin, setAlert } from '../slices/mySlice';
import { motion } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import doctor from "../images/doctor.svg";
import patient from "../images/patient.svg";
import doctor_unselected from "../images/doctor_unselected.svg";
import patient_unselected from "../images/patient_unselected.svg";

export default function Landing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.myState);

  function alert(text, flag) {
    dispatch(setAlert([text, true, flag]))
    setTimeout(() => {
      dispatch(setAlert([text, false, flag]))
    }, 4000)
  }

  const [user, setUser] = useState("")

  useEffect(() => {
    dispatch(setLogout())
  }, [])

  const login = (values, user) => {

    if (user === "" || user === undefined) {
      alert("Please choose your account", "error")
      return;
    }
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    }

    console.log(`http://localhost:8000/auth/${user}/login`)

    fetch(`http://localhost:8000/auth/${user}/login`, reqOptions)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.error) {
          alert(data.error, "error")
        }
        else {
          if (data.user.onboarded === true) {
            dispatch(setLogin(data))
            navigate(`/${user}-home`)
          } else {
            dispatch(setLogin(data))
            navigate(`/${user}-onboarding`)
          }
        }
      })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='landing fullpage user-doctor'>
      <h1>{user === "" ? "Choose your Account" : `I am a ${user}`}</h1>

      <div className="account-container">
        <img onClick={() => {
          setUser("doctor")
        }} className='acc-img' src={user === "doctor" ? doctor : doctor_unselected} alt="" />
        <img onClick={() => {
          setUser("patient")
        }} className='acc-img' src={user === "patient" ? patient : patient_unselected} alt="" />
      </div>

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
            login(values, user);

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

              <p onClick={() => {
                if (user === "" || user === undefined) {
                  alert("Please choose your account", "error")
                }
                else {
                  window.open(`http://localhost:8000/auth/${user}/forgot-password`)
                }
              }} style={{ textAlign: "right", marginRight: "10px", color: "green", cursor: "pointer" }}>Forgot Password?</p>

              <button
                id="submit-btn"
                type='submit'
                disabled={isSubmitting}
              >
                Login
              </button>

              <p style={{ textAlign: "center" }}>Don't have an account? <span onClick={() => {
                if (user === "" || user === undefined) {
                  alert("Please choose your account", "error")
                }
                else {
                  navigate(`/${user}-signup`)
                }
              }} style={{ cursor: "pointer", textDecoration: "underline" }}>Signup</span> instead</p>

            </Form>
          )}
        </Formik>
      </div>

    </motion.div>
  )
}
