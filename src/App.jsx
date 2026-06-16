import { useState } from 'react'
import Home from './pages/home'
import About from './pages/about'
import Services from './pages/services'
import Find_Doctors from './pages/find_doctors'
import Emergency from './pages/emergency'
import Contacts from './pages/contacts'
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
import Portal_sidebar from './pages/patient/components/sidebar'
import PatientNotifications from './pages/patient/patientNotifications'
import Doctor_Portal_sidebar from './pages/doctor/components/sidebar'
import DoctorAppointments from './pages/doctor/doctorAppointments'
import DoctorPatients from './pages/doctor/doctorPatients'
import DoctorPrescriptions from './pages/doctor/doctorPrescriptions'
import DoctorMedicalNotes from './pages/doctor/doctorMedNotes'
import DoctorProfile from './pages/doctor/doctorProfile'
import DoctorMessages from './pages/doctor/doctorMessages'
import DoctorNotifications from './pages/doctor/doctorNotifications'
import MyPatientDetails from './pages/doctor/doctorPatientDetails'

  

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
          <Route path='/register' element={<RegisterPage />}></Route>

          // patient url routes

          <Route path='/patient' element={<ProtectedRoute allowedRole="patient">
                <Portal_sidebar />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path='dashboard' element={<PatientDashboard />}></Route>
            <Route path='appointments' element = {<PatientAppointments />}></Route>
            <Route path='records' element = {<PatientRecords />}></Route>
            <Route path='prescriptions' element = {<PatientPrescriptions />}></Route>
            <Route path='messages' element = {<PatientMessages />}></Route>
            <Route path='settings' element = {<PaitientSettings />}></Route>
            <Route path='notifications' element={<PatientNotifications />}></Route>
          </Route>

          // doctor url routes
          <Route path='/doctor' element={<ProtectedRoute allowedRole="doctor">
                <Doctor_Portal_sidebar />
              </ProtectedRoute>
            }
          >
            <Route path='dashboard' element={<DoctorDashboard />}></Route>
            <Route path='appointments' element={<DoctorAppointments />}></Route>
            <Route path='mypatients' element={<DoctorPatients />}></Route>
            <Route path='mypatients/:id' element={<MyPatientDetails />}></Route>
            <Route path='prescriptions' element={<DoctorPrescriptions />}></Route>
            <Route path='messages' element={<DoctorMessages />}></Route>
            <Route path='notes' element={<DoctorMedicalNotes />}></Route>
            <Route path='profile' element = {<DoctorProfile />}></Route>
            <Route path='notifications' element={<DoctorNotifications />}></Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </Router>
    </AuthProvider>
    
  )
  
}

export default App
