import { useState } from 'react'
import Home from './pages/home'
import About from './pages/about'
import Services from './pages/services'
import Find_Doctors from './pages/find_doctors'
import Emergency from './pages/emergency'
import Contacts from './pages/contacts'
import Patient_Portal from './pages/portal'
import Appointments from './pages/appointment'
import RollUpPage from './components/rollUp'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {
  return(
    <Router>
      <RollUpPage />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path='/services' element={<Services />}></Route>
        <Route path='/doctors' element={<Find_Doctors />}></Route>
        <Route path='/emergency' element={<Emergency />}></Route>
        <Route path='/contacts' element={<Contacts />}></Route>
        <Route path='/patient-portal' element={<Patient_Portal />}></Route>
        <Route path='/appointments' element={<Appointments />}></Route>
      </Routes>
    </Router>
  )
  
}

export default App
