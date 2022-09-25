import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './Landing'

import DoctorSignup from './Doctor/DoctorSignup'
import DoctorOnboarding from './Doctor/DoctorOnboarding'
import DoctorHome from './Doctor/DoctorHome'

import PatientSignup from './Patient/PatientSignup'
import PatientOnboarding from './Patient/PatientOnboarding'
import PatientHome from "./Patient/PatientHome"
import DoctorEdit from './Doctor/DoctorEdit'
import PatientEdit from './Patient/PatientEdit'


import { AnimatePresence } from 'framer-motion'
import Appointments from './Patient/Appointments'

export default function AnimnatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing />} />

                {/* routes for doctor */}
                <Route path="/doctor-signup" element={<DoctorSignup />} />
                <Route path="/doctor-onboarding" element={<DoctorOnboarding />} />
                <Route path="/doctor-edit" element={<DoctorEdit />} />
                <Route path="/doctor-home" element={<DoctorHome />} />

                {/* routes for patient */}
                <Route path="/patient-signup" element={<PatientSignup />} />
                <Route path="/patient-onboarding" element={<PatientOnboarding />} />
                <Route path="/patient-edit" element={<PatientEdit />} />
                <Route path="/patient-home" element={<PatientHome />} />
                <Route path="/patient-appointments" element={<Appointments />} />
               
            </Routes>
        </AnimatePresence>
    )
}
