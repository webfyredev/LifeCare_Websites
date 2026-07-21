import { useEffect, useState } from "react"
import api from "../../api/axios"
import { LuChevronDown, LuChevronUp, LuClock, LuPill, LuShield, LuTriangleAlert } from "react-icons/lu"

export default function PatientMedications(){
    const [prescriptions, setPrescriptions] = useState([])
    const [medicationGuides, setMedicationGuides] = useState([])
    const [loading, setLoading]  = useState(true)
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        document.title = 'Medications - LifeCare'
        
        api.get('/patients/prescriptions/?filter=active')
        .then((res) => {
            const presc = res.data.prescriptions || []
            setPrescriptions(presc)

            if (!presc.length){
                setLoading(false)
                return 
            }
            Promise.all(
                presc.map(p => 
                    api.get(`/patients/drug-info/?name=${encodeURIComponent(p.medication_name)}`)
                    .then(res => ({
                        ...res.data,
                        prescriptionId : p.id,
                        prescriptionName : p.medication_name,
                        dosage : p.dosage,
                        frequency : p.frequency,
                        duration : p.duration,
                        doctor_name : p.doctor_name,
                        prescribed_date : p.prescribed_date,
                        instructions : p.notes
                    }))
                    .catch(() => ({ 
                        found : false, 
                        prescriptionId: p.id,
                        prescriptionName : p.medication_name,
                        dosage : p.dosage, 
                        frequency : p.frequency,
                        duration : p.duration,
                        doctor_name : p.doctor_name,
                        prescribed_date : p.prescribed_date,
                        instructions : p.notes,
                    }))
                )
            ).then(guides => {
                setMedicationGuides(guides)
                setLoading(false)
            })
        })
        .catch((err) => {
            console.error('Failed to load prescriptions:', err)
            setLoading(false)
        })
    }, [])

    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {month : 'long', day: 'numeric', year : 'numeric'})

    const toggleExpand = (id) => {
        setExpandedId(prev => prev === id ? null : id)
    }
    if (loading) {
        return (
            <div className="w-full flex flex-col space-y-3">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg white border border-slate-100 rounded-xl p-5 animate-pulse">
                        <div className="flex space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex-shrink-0"></div>
                            <div className="flex-1 space-y-2">
                                <div className="w-1/3 h-3 bg-slate-100"></div>
                                <div className="w-1/3 h-3 bg-slate-100"></div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        )
    }
    return(
        <>
            <div className="w-full flex flex-col space-y-5 p-5">
                <div>
                    <h1 className='text-2xl font-bold text-[#1e293b]'>My Medications</h1>
                    <p className='text-[13px] text-[#94a3b8] mt-0.5'>
                        Detailed guides for your active prescriptions
                    </p>
                </div>
                {medicationGuides.length === 0 ? (
                    <div className="bg-white border border-slate-100 rounded-xl p-10 flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                            <LuPill className="w-5 h-5 text-slate-400" />
                        </div>
                        <p className="text-sm text-slate-400">No active prescriptions</p>
                        <p className="text-xs text-slate-400">Your medications guides will appear here</p>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-4">
                        {medicationGuides.map((guide) => (
                            <div key={guide.prescriptionId} className="bg-white border border-slate-100 rounded-xl overflow-hidden">
                                <div onClick={() => toggleExpand(guide.prescriptionId)} className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                                            <LuPill  className="w-5 h-5 text-purple-600"/>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="text-sm font-semibold text-slate-800">{guide.prescriptionName}</p>
                                                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">
                                                    Active
                                                </span>
                                                {guide.source === 'fallback' && (
                                                    <span className="text-[10px] bg-amber-50 text-amber-500 px-2 py-0.5 rounded-full">
                                                        General guide
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-400 mt-0.5 flex items-center">
                                                {guide.dosage} <span className="w-1 h-1 rounded-full mx-2 bg-slate-500"></span> {guide.frequency} <span className="w-1 h-1 rounded-full mx-2 bg-slate-500"></span> {guide.duration}
                                            </p>
                                            <p className="text-xs text-slate-400 flex items-center">
                                                Prescribed by {guide.doctor_name} <span className="w-1 h-1 rounded-full mx-2 bg-slate-500"></span> {guide.prescribed_date && ` ${formatDate(guide.prescribed_date)}`}
                                            </p>
                                        </div>
                                    </div>
                                    {expandedId === guide.prescriptionId ? <LuChevronUp  className="w-4 h-4 text-slate-400 flex-shrink-0"/> : <LuChevronDown  className="w-4 h-4 text-slate-400 flex-shrink-0"/>}
                                </div>
                                {expandedId === guide.prescriptionId && (
                                    <div className="px-5 pb-5 border-t border-slate-100 pt-4 flex flex-col space-y-4">
                                        {guide.instructions && (
                                            <div className="bg-blue-50 rounded-xl p-3">
                                                <p className="text-xs font-semibold text-blue-700 mb-1">
                                                    Doctor's instructions
                                                </p>
                                                <p className="text-xs text-blue-600">
                                                    {guide.instructions}
                                                </p>
                                            </div>
                                        )}
                                        {guide.purpose && (
                                            <div>
                                                <p className="text-xs font-semibold text-slate-600 mb-1.5">
                                                    What this medication does
                                                </p>
                                                <p className="text-xs text-slate-500 leading-relaxed">
                                                    {guide.purpose}
                                                </p>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {guide.side_effects && (
                                                <div className="bg-amber-50 rounded-xl p-3">
                                                    <div className="flex items-center space-x-1.5 mb-2">
                                                        <LuTriangleAlert  className="w-3.5 h-3.5 text-amber-600"/>
                                                        <p className="text-xs font-semibold text-amber-700">Possible side effects</p>
                                                    </div>
                                                    <p className="text-xs text-amber-700 leading-relaxed">
                                                        {guide.side_effects}
                                                    </p>
                                                </div>
                                            )}

                                            {guide.warnings && (
                                                <div className="bg-red-50 rounded-xl p-3">
                                                    <div className="flex items-center space-x-1.5 mb-1">
                                                        <LuShield  className="w-3.5 h-3.5 text-red-500"/>
                                                        <p className="text-xs font-semibold text-red-600">Warnings</p>
                                                    </div>
                                                    <p className="text-xs text-red-600 leading-relaxed">
                                                        {guide.warnings}
                                                    </p>
                                                </div>
                                            )}
                                            {guide.interactions && (
                                                <div className="bg-slate-50 rounded-xl p-3">
                                                    <div className="flex items-center space-x-1.5 mb-2">
                                                        <LuClock  className="w-3.5 h-3.5 text-slate-500"/>
                                                        <p className="text-xs font-semibold text-slate-600">Drug interactions</p>
                                                    </div>
                                                    <p className="text-xs text-slate-500 leading-relaxed">
                                                        {guide.interactions}
                                                    </p>

                                                </div>
                                            )}
                                        </div>
                                        {guide.storage && (
                                            <div className="border border-slate-100 rounded-xl p-3">
                                                <p className="text-xs font-semibold text-slate-600 mb-1">Storage</p>
                                                <p className="text-xs text-slate-500">{guide.storage}</p>
                                            </div>
                                        )}
                                        {guide.when_to_call_doctor && (
                                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                                                <p className="text-xs font-semibold text-blue-700 mb-1">
                                                    When to call your doctor
                                                </p>
                                                <p className="text-xs text-blue-600">{guide.when_to_call_doctor}</p>

                                            </div>

                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}