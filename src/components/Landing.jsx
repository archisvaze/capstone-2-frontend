import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../slices/mySlice';
import { motion } from 'framer-motion'

export default function Landing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.myState);

  useEffect(() => {
    dispatch(setLogout())
  }, [])

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100vw" }}
      exit={{ width: 0 }}
      className='landing fullpage'>
      <section className='doctor-section'>
        <h1>I am a doctor</h1>
        <div className="section-actions">
          <button className='login-btn' onClick={() => { navigate("/doctor-login") }}>Login</button>
          <button className='signup-btn'>Signup</button>
        </div>

      </section>
      <section className='patient-section'>
        <h1>I am looking for a doctor</h1>
        <div className="section-actions">
          <button className='login-btn' onClick={() => { navigate('/patient-login') }}>Login</button>
          <button className='signup-btn'>Signup</button>
        </div>
      </section>
    </motion.div>
  )
}
