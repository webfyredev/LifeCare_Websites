import { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import { buttonEffects } from "../../animations/effects"
import { LuArrowDown, LuArrowUp, LuChevronLeft, LuChevronRight, LuClipboardCheck, LuClipboardList, LuDownload, LuFileCheck2, LuFileX2, LuGripVertical, LuPill, LuPlus, LuSearch, LuShieldCheck, LuTriangleAlert, LuX } from "react-icons/lu"
import api from "../../api/axios"

export default function Lifecare_Prescriptions(){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState('all')
    const [doctors, setDoctors] = useState('all');
    const [page, setPage] = useState(1)
    const [feedback, setFeedback] = useState({message : "", type : ""})
    const [activeMenuId, setActiveMenuId] = useState(null)
    const [editModal, setEditModal] = useState({open : false, prescription: null})
    const [createPrescription, setCreatePrescription] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState({id : null, name : ""})
    const fetchPrescriptions = async() => {
        setLoading(true)
        try{
            const response = await api.get('/admin/manage-prescriptions/', {params : {search, status, doctors, page}})
            setData(response.data)
        }catch (err){
            console.error('Error fetching prescriptions data', err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPrescriptions();
    }, [search, status, doctors, page])

    const handlePrescriptionEdit = async (id, updatedData) => {
        try{
            await api.patch(`/doctors/prescriptions/${id}/`, updatedData)
            setEditModal({open : false, prescription : null})
            fetchPrescriptions()
        } catch (err) {console.error(err)}
    }

    const handleDeletePrescription = async(id) => {
        try{
            const res = await api.delete(`/doctors/prescriptions/${id}/`);
            setActiveMenuId(null);
            fetchPrescriptions()
            setFeedback({
                message: "Prescriptions deleted successfully", type : "success"
            })
        }catch (err){
            console.error('Failed to delete prescription', err)
            setFeedback({message : "Failed to delete presctiption.", type : "error"})
        }
    }


    useEffect(() => {
        document.title = 'Manage Prescriptions - Lifecare (Admin_Dashboard)'
    })

    const prescription_data = data?.prep_data || []
    const totalCount = data?.pagination?.count || 0
    
    const prescriptions_stats = [
        {
            label : 'Total Prescriptions',
            value : data?.stats?.total_prep ?? 0,
            change : data?.stats?.total_prep_change?.precentage ?? 0,
            direction : data?.stats?.total_prep_change?.direction,
            icon : LuClipboardList,
            style : 'bg-[#DBEAFE] text-[#2563EB]'
        },
        {
            label : 'Active Prescriptions',
            value : data?.stats?.active_prep ?? 0,
            change : data?.stats?.active_prep_change?.percentage ?? 0,
            direction : data?.stats?.active_prep_change?.direction,
            icon : LuClipboardCheck,
            style : 'bg-[#DCFCE7] text-[#16A34A]'
        },
        {
            label : 'Completed Prescriptions',
            value : data?.stats?.completed_prep ?? 0,
            change : data?.stats?.completed_prep_change?.percentage ?? 0,
            direction : data?.stats?.completed_prep_change?.direction,
            icon : LuFileCheck2,
            style : 'bg-[#F3E8FF] text-[#9333EA]'
        },
        {
            label : 'Cancelled Prescriptions',
            value : data?.stats?.cancelled_prep ?? 0,
            change : data?.stats?.cancelled_prep_change?.percentage ?? 0,
            direction : data?.stats?.cancelled_prep_change?.direction,
            icon : LuFileX2,
            style : 'bg-[#FEE2E2] text-[#DC2626]'
        }
    ]
    
    const statusStyle = {
        active : 'bg-[#DCFCE7] text-[#16A34A]',
        completed : 'bg-[#DBEAFE] text-[#2563EB]',
        cancelled : 'bg-[#FEE2E2] text-[#DC2626]',
    }
    return(
        <>
            <div className="w-full space-y-5">
                <div className="flex items-center justify-between w-full">
                    <div className='w-auto flex flex-col space-y-1'>
                        <h3 className='font-bold text-2xl text-[#1e293b]'>Prescriptions</h3>
                        <p className='text-[13px] text-[#94a3b8]'>Manage patient prescriptions and medical records.</p>
                    </div>
                    <motion.button
                        {...buttonEffects}
                        onClick={() => setCreatePrescription(true)}
                        className="bg-blue-600 text-white hover:bg-blue-700 flex h-11 md:h-10 flex justify-center items-center px-4 text-sm font-semibold rounded-lg cursor-pointer"
                    >
                        <LuPlus className="mr-1" /> Add Prescription
                    </motion.button>
                </div>
                <div className="w-full py-2 mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {prescriptions_stats.map((data) => (
                        <div className="p-5 border bg-white flex space-x-2.5 border-1 border-gray-100 rounded-xl shadow-xs hover:shadow-sm transition-all duration-300">
                            <div className={`w-9 h-9 flex items-center justify-center ${data.style} rounded-lg`}>
                                <data.icon size={18} />
                            </div>
                            <div>
                                <p className="text-[13px] text-gray-500 font-medium">{data.label}</p>
                                <h3 className="font-bold text-2xl text-gray-800 mt-1">{data.value}</h3>
                                <span className={`flex mt-1 items-center space-x-2 text-[10px] ${data.direction === "up" ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>
                                    {data.direction === "up" ? <LuArrowUp /> : <LuArrowDown /> }
                                    {data.change}%
                                </span>
                                <p className="text-[10px] text-gray-500">vs. last month</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className='p-4 border-b border-gray-100 flex flex-col md:flex-row gap-3 items-center justify-between'>
                        <div className="relative w-full md:w-140">
                            <LuSearch className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="text" 
                                placeholder="Search by patient, doctor or medication..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4  py-2.5 border border-gray-200 rounded-lg text-sm outline-none  focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                            />
                        </div>
                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            
                            <select value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="cursor-pointer px-2 py-2 border border-gray-200 rounded-lg w-45 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            
                            <select value={doctors} 
                                onChange={(e) => setDoctors(e.target.value)} 
                                className="cursor-pointer px-2 py-2.5 border border-gray-200 rounded-lg w-35 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all">
                                <option value="all">All Doctors</option>
                                {prescription_data ? 
                                    <option>
                                        {prescription_data.doctor}
                                    </option>
                                    : <option>Nill</option>
                                }
                                
                            </select>
                            
                            <button
                                className="cursor-pointer p-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                                >
                                <LuDownload className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    {feedback.message && (
                        <div
                            className={`p-3.5 mb-4 w-[95%] ml-5 rounded-lg text-sm font-semibold flex items-center justify-between transition-all
                                ${feedback.type === "error" ? "bg-rose-50 text-rose-700" : 'bg-emerald-50 text-emerald-700'}
                            `}
                        >
                            <div className="flex items-center gap-2">
                                {feedback.type === "error" ? <LuTriangleAlert className="w-4 h-4" /> : <LuShieldCheck className="w-4 h-4" />}
                                <span>{feedback.message}</span>
                            </div>
                            <button
                                onClick={() => setFeedback({message : "", type: ""})}
                                className="p-1 hover:opacity-10 cursor-pointer"
                            >
                                <LuX className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                    {loading ? (
                        <p className="text-center py-12 text-gray-400">
                            Loading prescriptions...
                        </p>
                    ) : prescription_data.length === 0 ? (
                        <div className="w-full p-12 flex items-center justify-center flex-col">
                            <LuPill size={22}  className="text-gray-400 mb-3"/>
                            <p className="text-sm text-gray-700 font-medium">Prescriptions not Found</p>
                            <p className="text-xs text-gray-400 mt-1">We couldn't find a prescription matching your search</p>
                        </div>
                    ) : (
                        <div className="w-full overflow-x-auto min-h-[300px]">
                            <table className="min-w-max w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 text-[12px] text-gray-500 bg-gray-50/50">
                                        <th className="p-4 w-10">
                                            <input type="checkbox" className="rounded" />
                                        </th>
                                        <th className="p-4">Patient</th>
                                        <th className="p-4">Doctor</th>
                                        <th className="p-4">Medication</th>
                                        <th className="p-4">Frequency</th>
                                        <th className="p-4">Dosage</th>
                                        <th className="p-4">Prescribed Date</th>
                                        <th className="p-4">Instruction</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                
                                <tbody className="divide-y divide-gray-50 text-sm">
                                    {prescription_data.map((prep) => (
                                        <tr key={prep.id} className="hover:bg-ray-50/50 transition-colors">
                                            <td className="p-4">
                                                <input type="checkbox" className="rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className='text-gray-800 font-semibold'>{prep.patient}</span>
                                                    <a className="text-xs text-gray-500 font-medium hover:text-blue-600 transition-all duration-200" href={`mailto:${prep.patient_email}`}>{prep.patient_email}</a>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className='text-gray-800 font-semibold'>{prep.doctor}</span>
                                                    <a className="text-xs text-gray-500 font-medium hover:text-blue-600 transition-all duration-200" href={`mailto:${prep.doctor_email}`}>{prep.doctor_email}</a>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold'>{prep.medication}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-center text-gray-800 font-semibold'>{prep.frequency}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold'>{prep.dosage}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold'>{prep.prescribed_date}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold'>{prep.notes}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1.5 rounded-lg text-[11px] font-medium capitalize ${statusStyle[prep.status]}`}>{prep.status}</span>
                                            </td>
                                            <td className="p-4 text-center relative">
                                                <button
                                                    onClick={() => setActiveMenuId(activeMenuId === prep.id ? null : prep.id)}
                                                    className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 cursor-pointer"
                                                >
                                                    <LuGripVertical className="w-4 h-4" />
                                                </button>
                                                {activeMenuId === prep.id &&(
                                                    <div className="absolute right-6 top-10 w-45 bg-white rounded-xl shadow-lg border border-gray-100 z-10 p-1 text-left flex flex-col items-center justify-center">
                                                        {prep.status  === 'active' ? (
                                                            <button
                                                                onClick={() => { 
                                                                    setEditModal({open : true, prescription : prep
                                                                })
                                                                }}
                                                                className="w-full text-left flex items-center px-3 py-2 text-xs mb-1.5 font-medium rounded-md cursor-pointer bg-[#DBEAFE]/50 hover:bg-[#DBEAFE] text-[#2563EB] transition-all duration-300"
                                                            >   
                                                            Edit Prescription
                                                            </button>
                                                        ): (
                                                            <span></span>
                                                        )}
                                                        
                                                        <button
                                                                onClick={() => {handleDeletePrescription(prep.id)}}
                                                                className="w-full flex font-medium items-center text-left px-3 py-2 rounded-md cursor-pointer text-xs text-white bg-red-500 hover:bg-red-600"
                                                            >
                                                                Delete Prescription
                                                        </button>
                                                    
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <div>
                            Showing <span className="font-semibold">{prescription_data.length}</span> of <span className="font-semibold">{totalCount}</span> prescriptions
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                disabled={!data?.pagination?.previous}
                                onClick={() => setPage(page - 1)}
                                className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                            >
                                <LuChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 font-semibold text-gray-700">Page {page}</span>
                            <button
                                disabled={!data?.pagination?.next}
                                onClick={() => setPage(page + 1)}
                                className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                            >
                                <LuChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* <PrescribeModal 
                    patientId={sele}
                /> */}
                {editModal.open && (
                    <EditPrescriptionModal
                        prescription={editModal.prescription}
                        onClose={() => setEditModal({open : false, prescription : null})}
                        onSave = {handlePrescriptionEdit}
                    />
                )}
                {createPrescription && (
                    <PrescribeModal
                        patientId={selectedPatient.id}
                        patientName={selectedPatient.name}
                        onSaved={() => {
                            setCreatePrescription(false);
                            fetchPrescriptions();
                        }}
                        onClose={() => setCreatePrescription(false)}
                        isAdmin = {true}
                        
                    />
                )}
            </div>
        </>
    )
}

function PrescribeModal({patientId = '', patientName = '', onClose, onSaved, isAdmin=false, defaultDoctorId=''}){
    const [form, setForm] = useState({
        medication_name : '',
        dosage : '',
        frequency : '',
        duration : '',
        notes : '',
        doctor_id : defaultDoctorId || '',
        patient_id : patientId || ''
    })

    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchingDoctors, setFetchingDoctors] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        api.get('/admin/manage-users-list/')
        .then(res => setPatients(res.data.results || res.data || []))
        .catch(err => console.error('Failed to fetch patients', err))
    },[]);

    useEffect(() => {
        if(isAdmin){
            setFetchingDoctors(true)
            api.get('/admin/manage-doctors-list/')
            .then((res) => {
                const doctorList = res.data.results || res.data || []
                setDoctors(doctorList)
                if(!form.doctor_id && doctorList.length > 0){
                    setForm((prev) => ({...prev, doctor_id: doctorList[0].id }))
                }
            })
            .catch((err) => console.error('Failed to fetch doctors:', err))
            .finally(() => setFetchingDoctors(false))
        }
    }, [isAdmin])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const targetPatientId = form.patient_id || patientId
        if(!targetPatientId){
            setErrorMsg('Please select a patient for this prescription.')
            return;
        }

        if(isAdmin && !form.doctor_id){
            setErrorMsg("Please select a doctor for this prescription")
            return;
        }
        setLoading(true)
        try{
            const payload = {...form, patient_id: targetPatientId}
            if(!isAdmin){
                delete payload.doctor_id
            }
            await api.post('doctors/prescriptions/', payload)
            onSaved()
        }catch(err){
            console.error('Prescription submission failed:', err)
            setErrorMsg(err.response?.data?.error || 'Failed to create prescription.')
        } finally{
            setLoading(false)
        }
    }
    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="font-semibold text-slate-800">Write Prescription</h2>
                        {patientName && <p className="text-xs text-slate-400">{patientName}</p>}
                        
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <LuX className="w-5 h-5" />
                    </button>
                </div>
                {errorMsg && (
                    <div className="mb-3 p-2 bg-red-50 text-red-600 text-xs rounded border border-red-200">
                        {errorMsg}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                    {isAdmin && (
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-semibold text-slate-600">Assign Doctor</label>
                            <select
                                value={form.doctor_id}
                                onChange={(e) => setForm({...form, doctor_id: e.target.value})}
                                required
                                disabled={fetchingDoctors}
                                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 bg-white"
                            >
                                <option value="" disabled>
                                    Select a doctor...
                                </option>
                                {doctors.map((doc) => (
                                    <option key={doc.id} value={doc.id}>
                                        Dr. {doc.first_name || ''} {doc.last_name || doc.email}  ({doc.email})
                                    </option>
                                ))}

                            </select>
                        </div>
                    )}
                    {!patientId && (
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-semibold text-slate-600">Select Patient</label>
                            <select
                                value={form.patient_id}
                                onChange={(e) => setForm({...form, patient_id: e.target.value })}
                                required
                                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 bg-white"
                            >
                                <option value="">Choose Patient...</option>
                                {patients.map((p) => (
                                    <option key={p.id} value={p.id} className="capitalize">
                                        {p.name || `${p.first_name || ''} ${p.last_name || ''}`.trim() || p.username} ({p.email})
                                    </option>
                                ))}

                            </select>
                        </div>
                    )}
                    
                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Medication Name</label>
                        <input 
                            value={form.medication_name}
                            onChange={(e) => setForm({...form, medication_name: e.target.value})}
                            required
                            placeholder="e.g Metformin"
                            className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300"
                            type="text"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-semibold text-slate-600">Dosage</label>
                            <input 
                                value={form.dosage}
                                onChange={(e) => setForm({...form, dosage: e.target.value})}
                                required
                                placeholder="500mg"
                                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-semibold text-slate-600">Frequency</label>
                            <input 
                                value={form.frequency}
                                onChange={(e) => setForm({...form, frequency: e.target.value})}
                                required
                                placeholder="Twice daily"
                                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-semibold text-slate-600">Duration</label>
                            <input 
                                value={form.duration}
                                onChange={(e) => setForm({...form, duration: e.target.value})}
                                required
                                placeholder="30 days"
                                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Instructions</label>
                        <textarea
                            value={form.notes}
                            onChange={(e) => setForm({...form, notes:e.target.value})}
                            rows={2}
                            placeholder="e.g Take with food"
                            className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 resize-none"

                        />
                    </div>
                    <div className="flex space-x-3 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <motion.button
                            {...buttonEffects}
                            type="submit"
                            disabled={loading || (isAdmin && fetchingDoctors)}
                            className="flex-1 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-60"
                        >
                            {loading ? 'Prescribing...' : 'Confirm Prescription'}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
}
function EditPrescriptionModal({prescription, onClose, onSave}){
    const [form, setForm] = useState({
        id : prescription?.id || '',
        medication_name : prescription?.medication_name || '',
        dosage : prescription?.dosage || '',
        frequency : prescription?.frequency || '',
        duration : prescription?.duration || '',
        notes: prescription?.notes || '',
        status : prescription?.status || 'active',
    })

    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-lg'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='font-semibold text-slate-800'>Edit Prescription</h2>
                    <button onClick={onClose} className='text-slate-400 hover:text-slate-600 cursor-pointer'>
                        <LuX className='w-5 h-5' />
                    </button>
                </div>
                <div className='flex flex-col space-y-3'>
                    {[
                        { label: 'Medication Name', key: 'medication_name', placeholder: 'e.g. Metformin' },
                        { label: 'Dosage', key: 'dosage', placeholder: '500mg' },
                        { label: 'Frequency', key: 'frequency', placeholder: 'Twice daily' },
                        { label: 'Duration', key: 'duration', placeholder: '30 days' },
                    ].map(({ label, key, placeholder }) => (
                        <div key={key} className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>{label}</label>
                            <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                placeholder={placeholder} 
                                className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                            />
                        </div>
                    ))}
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Status</label>
                        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'>
                            <option value='active'>Active</option>
                            <option value='completed'>Completed</option>
                            <option value='cancelled'>Cancelled</option>
                        </select>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Instructions</label>
                        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            rows={2} className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 resize-none' />
                    </div>
                    <div className='flex space-x-3 pt-1'>
                        <button
                            type="button" 
                            onClick={onClose} 
                            className='flex-1 py-2.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer'
                            >
                                Cancel
                        </button>
                        <motion.button 
                            type="submit"
                            {...buttonEffects}
                            onClick={() => onSave(form.id, form)} 
                            className='flex-1 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer'>
                                Save Changes
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}