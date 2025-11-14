import { useState } from 'react'
import Home from './pages/home'
import About from './pages/about'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </Router>
  )
  
}

export default App
