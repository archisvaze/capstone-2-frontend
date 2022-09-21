import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
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
