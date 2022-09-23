import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'
import Landing from './Landing'

import DoctorLogin from './Doctor/DoctorLogin'
import DoctorOnboarding from './Doctor/DoctorOnboarding'
import DoctorHome from './Doctor/DoctorHome'

import PatientLogin from './Patient/PatientLogin'
import PatientOnboarding from './Patient/PatientOnboarding'
import PatientHome from "./Patient/PatientHome"
import DoctorEdit from './Doctor/DoctorEdit'




function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* routes for doctor */}
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-onboarding" element={<DoctorOnboarding />} />
        <Route path="/doctor-edit" element={<DoctorEdit />} />
        <Route path="/doctor-home" element={<DoctorHome />} />

        {/* routes for patient */}
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-onboarding" element={<PatientOnboarding />} />
        <Route path="/patient-home" element={<PatientHome />} />
      </Routes>
    </BrowserRouter>

  )
}
export default App;
