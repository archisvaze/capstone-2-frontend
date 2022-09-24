import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './Landing'

import DoctorLogin from './Doctor/DoctorLogin'
import DoctorOnboarding from './Doctor/DoctorOnboarding'
import DoctorHome from './Doctor/DoctorHome'

import PatientLogin from './Patient/PatientLogin'
import PatientOnboarding from './Patient/PatientOnboarding'
import PatientHome from "./Patient/PatientHome"
import DoctorEdit from './Doctor/DoctorEdit'


import { AnimatePresence } from 'framer-motion'

export default function AnimnatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
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
        </AnimatePresence>
    )
}
