import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

export default function DoctorDashboard() {
  const { user, logout } = useAuth()
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    api.get('/doctors/dashboard/')
      .then((res) => setDashboard(res.data))
      .catch(console.error)
  }, [])

  return (
    <div>
      <h1>Welcome, Dr. {user?.last_name}</h1>
      <button onClick={logout}>Log out</button>

      {dashboard && (
        <div>
          <h2>Today's Appointments</h2>
          {dashboard.today_appointments.map((apt) => (
            <div key={apt.id}>
              <p>{apt.patient} — {apt.date} at {apt.time}</p>
              <p>Reason: {apt.reason}</p>
            </div>
          ))}
          <p>Total patients seen: {dashboard.total_patients}</p>
        </div>
      )}
    </div>
  )
}