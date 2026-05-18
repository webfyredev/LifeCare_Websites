import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'
import Portal_Navbar from './components/sidebar'

export default function PatientDashboard() {
  const { user, logout } = useAuth()
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    api.get('/patients/dashboard/')
      .then((res) => setDashboard(res.data))
      .catch(console.error)
  }, [])

  return (
    <>
        {/* <NavBar /> */}
        <Portal_Navbar />
        {/* <h1>Welcome, {user?.first_name}</h1>
        <button onClick={logout}>Log out</button>
        {dashboard && (
            <div>
            <h2>Upcoming Appointments</h2>
            {dashboard.upcoming_appointments.map((apt) => (
                <div key={apt.id}>
                <p>{apt.doctor} — {apt.date} at {apt.time}</p>
                <span>{apt.status}</span>
                </div>
            ))}
            <p>Total appointments: {dashboard.total_appointments}</p>
            </div>
        )} */}
        <Footer />
    </>
  )
}