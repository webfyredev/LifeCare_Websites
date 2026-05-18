import { useState } from 'react'
import Home from './pages/home'
import About from './pages/about'
import Services from './pages/services'
import Find_Doctors from './pages/find_doctors'
import Emergency from './pages/emergency'
import Contacts from './pages/contacts'
import Appointments from './pages/appointment'
import RollUpPage from './components/rollUp'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import { AuthProvider } from './context/AuthContext'
import PatientDashboard from './pages/patient/patientDashboard'
import doctorDashboard from './pages/doctor/doctorDashboard'
import ProtectedRoute from './components/protectedRoute'
import DoctorDashboard from './pages/doctor/doctorDashboard'
import PatientAppointments from './pages/patient/patientAppointments'
import PatientRecords from './pages/patient/patientRecords'
import PatientPrescriptions from './pages/patient/patientPrescription'
import PatientMessages from './pages/patient/patientMessages'
import PaitientSettings from './pages/patient/patientSettings'

  

function App() {
  return(
    <AuthProvider >
      <Router>
        <RollUpPage />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path='/services' element={<Services />}></Route>
          <Route path='/doctors' element={<Find_Doctors />}></Route>
          <Route path='/emergency' element={<Emergency />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/appointments' element={<Appointments />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/doctor/dashboard' element={<ProtectedRoute allowedRole="doctor"><DoctorDashboard /></ProtectedRoute>}></Route>

          // patient url routes
          <Route path='/patient/dashboard' element={<ProtectedRoute allowedRole="patient"><PatientDashboard /></ProtectedRoute>}></Route>

          <Route path='/patient-appointments' element = {<PatientAppointments />}></Route>
          <Route path='/patient-records' element = {<PatientRecords />}></Route>
          <Route path='/patient-prescriptions' element = {<PatientPrescriptions />}></Route>
          <Route path='/patient-messages' element = {<PatientMessages />}></Route>
          <Route path='/patient-settings' element = {<PaitientSettings />}></Route>


          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </Router>
    </AuthProvider>
    
  )
  
}

export default App
