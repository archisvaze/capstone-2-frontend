import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../slices/mySlice';

export default function Landing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.myState);

  useEffect(() => {
    dispatch(setLogout())
  }, [])

  return (
    <div className='landing fullpage'>
      <section className='doctor-section'>
        <h1>I am a doctor</h1>
        <div className="section-actions">
          <button onClick={() => { navigate("/doctor-login") }}>login</button>
          <button>signup</button>
        </div>

      </section>
      <section className='patient-section'>
        <h1>I am looking for a doctor</h1>
        <div className="section-actions">
          <button onClick={() => { navigate('/patient-login') }}>login</button>
          <button>signup</button>
        </div>
      </section>
    </div>
  )
}
