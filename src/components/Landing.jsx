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
    <div className='landing page'>
      <section>
        <h1>I am a doctor</h1>
        <button onClick={() => { navigate("/doctor-login") }}>login</button>
        <button>signup</button>
      </section>
      <section>
        <h1>I am looking for a doctor</h1>
        <button onClick={() => { navigate('/patient-login') }}>login</button>
        <button>signup</button>
      </section>
    </div>
  )
}
