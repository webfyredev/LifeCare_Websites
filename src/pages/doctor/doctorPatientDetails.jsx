import { useEffect, useState } from "react";
import { LuArrowLeft, LuPill, LuFileText, LuMessageSquare, LuX, LuPlus } from 'react-icons/lu'
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
export default function PatientDetails(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [patient, setPatient] = useState(null)
    const [loading, setLoading] = useState(true)
    const [noteModal, setNodeModal] = useState(false)
    const [prescribeModal, setPrescribeModal] = useState(false)
    
    useEffect(() => {
        api.get(`/doctors/patients/${id}/`)
        .then((res) => {
            setPatient(res.data)
            document.title = `${res.data.name} - LifeCare`
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }, [id])

    const getAge = (dob) => {
        if (!dob) return 'N/A'
        const diff = new Date() - new Date(dob)
        return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))
    }

    const statusStyle = (status) => {
        if (status === 'confirmed') return 'bg-blue-50 text-blue-600'
        if (status === 'completed') return 'bg-green-50 text-green-600'
        if (status === 'cancelled') return 'bg-red-50 text-red-400'
        return 'bg-amber-50 text-amber-600'
    }

    if (loading) return <div className='p-8 text-center text-sm text-slate-400'>Loading patient...</div>
    if (!patient) return <div className='p-8 text-center text-sm text-slate-400'>Patient not found</div>

    return(
        <div className="w-full flex flex-col space-y-5 border">
            <div className="flex items-center space-x-4">
                <button onClick={() => navigate('/doctor/patients')} className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <LuArrowLeft  className="w-4 h-4 text-slate-600"/>
                </button>
                <div className="flex items-center space-x-3">
                    {patient.profile_picture ? (
                        <img src={patient.profile_picture} className='w-12 h-12 rounded-full object-cover' alt='' />
                    ) : (
                        <div className='w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold'>
                            {patient.initials}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-slate-800">{patient.name}</h1>
                        <p className='text-sm text-slate-400'>
                            {patient.gender} · {getAge(patient.date_of_birth)} yrs · {patient.blood_type || 'N/A'} · {patient.allergies || 'No known allergies'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}