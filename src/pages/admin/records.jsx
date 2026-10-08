import { useEffect, useState } from "react"
import api from "../../api/axios"
import { LuArrowDown, LuArrowUp, LuChevronLeft, LuChevronRight, LuClipboardList, LuDownload, LuFiles, LuFlaskConical, LuGripVertical, LuPlus, LuSearch, LuShieldCheck, LuStethoscope, LuTriangleAlert, LuX } from "react-icons/lu"
import { motion } from 'framer-motion'
import { buttonEffects } from "../../animations/effects"


export default function Lifecare_Records(){
    const [recordsData, setRecordsData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [recordType, setRecordType] = useState('all')
    const [feedback, setFeedback] = useState({message : "", type : ""})

    // const [recordModal, setRecordModal] = useState(false)
    const  [createRecords, setCreateRecords] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState({id : null, name : ""})
    const [activeMenuId, setActiveMenuId] = useState(null)
    const [editModal, setEditModal] = useState({open : false, records : null})
    const fetchMedicalRecords = async () => {
        setLoading(true)
        try{
            const response = await api.get('/admin/manage-records/', {params : {search, recordType, page}})
            setRecordsData(response.data)
        }catch(err){
            console.error('Error fetching medical records', err)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchMedicalRecords();
    }, [search, recordType, page])

    useEffect(() => {
        document.title = 'Manage Records - Lifecare (Admin Dashboard)'
    })

    useEffect(() => {
        api.get('/admin/manage-patients-list/')
        .then((res) => setPatientList(res.data))
        .catch((err) => console.error('Error fetching patients', err))
    }, []);

    const handleRecordsEdit = async (id, form) => {
        try{
            const formData = new FormData();

            formData.append('title', form.title)
            formData.append('record_type', form.record_type)
            formData.append('description', form.description)

            if(form.file instanceof File){
                formData.append('file', form.file);
            }
            await api.patch(`/patients/records/${id}/`, formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data',
                }
            });
            setFeedback({ message : "Record updated successfully", type : "success"})
            setEditModal({open : false, records: null})

            if(typeof fetchMedicalRecords === 'function'){
                fetchMedicalRecords()
            }

        }catch(err){
            setFeedback({ message : "Record updated failed", type : "error"})

        }


        
        // try{
        //     // co
        //     await api.patch(`/patients/records/${id}/`, updatedData)
        //     setEditModal({open : false, records : null})
        //     fetchMedicalRecords()
        //     setFeedback({ message : "Record updated successfully", type : "success"})
        // }catch(err) {
        //     console.error(err)
        //     setFeedback({ message : "Record updated failed", type : "error"})
        // }
    }

    const handleDeleteRecords = async(id) => {
        try{
            const res = await api.delete(`/patients/records/${id}/`);
            setActiveMenuId(null);
            fetchMedicalRecords()
            setFeedback({ message : "Record deleted successfully", type : "success"})
        }catch(err){
            console.error('Failed to delete records', err)
            setFeedback({message : "Failed to delete records", type:"error"})
        }
    }
    
    const records_data = recordsData?.records_data || []
    const totalCount = recordsData?.pagination?.count || 0
    const record_type_style = {
        lab_result : 'bg-purple-50 text-purple-700',
        imaging : 'bg-indigo-50 text-indigo-700',
        diagnosis : 'bg-amber-50 text-amber-700',
        surgery : 'bg-rose-50 text-rose-700',
        vaccination : 'bg-emerald-50 text-emerald-700',
        allergy : 'bg-red-50 text-red-700',
        general : 'bg-slate-100 text-slate-700'
    }
    const formatDateTime = (dt) => {
        return new Date(dt).toLocaleTimeString("en-US", {month : 'long', day:'numeric', year: 'numeric'})
    }
    const medical_records_stats = [
        {
            label : 'Total Records',
            value : recordsData?.stats?.total_records ?? 0,
            change : recordsData?.stats?.total_records_change?.percentage ?? 0,
            direction : recordsData?.stats?.total_records_change?.direction,
            icon : LuFiles,
            style : 'bg-[#DBEAFE] text-[#2563EB]'
        },
        {
            label : 'Lab Results',
            value : recordsData?.stats?.total_lab_results ?? 0,
            change : recordsData?.stats?.total_lab_results_change?.percentage ?? 0,
            direction : recordsData?.stats?.total_lab_results_change?.direction,
            icon : LuFlaskConical,
            style : 'bg-[#CFFAFE] text-[#0891B2]'
        },
        {
            label : 'Diagnosis',
            value : recordsData?.stats?.total_diagnosis_results ?? 0,
            change : recordsData?.stats?.total_diagnosis_result_change?.percentage ?? 0,
            direction : recordsData?.stats?.total_diagnosis_result_change?.direction,
            icon : LuStethoscope,
            style : 'bg-[#F3E8FF] text-[#9333EA]'
        },
        {
            label : 'General',
            value : recordsData?.stats?.total_general_results ?? 0,
            change : recordsData?.stats?.total_general_results_change?.percentage ?? 0,
            direction : recordsData?.stats?.total_general_results_change?.direction,
            icon : LuClipboardList,
            style : 'bg-[#FFEDD5] text-[#EA580C]'
        }
    ]
    return(
        <>
            <div className="w-full space-y-5">
                <div className="flex items-center justify-between w-full">
                    <div className='w-auto flex flex-col space-y-1'>
                        <h3 className='font-bold text-2xl text-[#1e293b]'>Medical Records</h3>
                        <p className='text-[13px] text-[#94a3b8]'>Access and manage patient medical records.</p>
                    </div>
                    <motion.button
                        {...buttonEffects}
                        onClick={() => setCreateRecords(true)}
                        className="bg-blue-600 text-white hover:bg-blue-700 flex h-11 md:h-10 flex justify-center items-center px-4 text-sm font-semibold rounded-lg cursor-pointer"
                    >
                        <LuPlus className="mr-1" /> Add Records
                    </motion.button>
                </div>
                <div className="w-full py-2 mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {medical_records_stats.map((data) => (
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
                                placeholder="Search by patient, record or title..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4  py-2.5 border border-gray-200 rounded-lg text-sm outline-none  focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                            />
                        </div>
                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            
                            <select value={recordType}
                                onChange={(e) => setRecordType(e.target.value)}
                                className="cursor-pointer px-2 py-2 border border-gray-200 rounded-lg w-45 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all"
                            >
                                <option value="all">All Record Types</option>
                                <option value="lab_result">Lab Results</option>
                                <option value="imaging">Imaging</option>
                                <option value="diagnosis">Diagnosis</option>
                                <option value="surgery">Surgery</option>
                                <option value="vaccination">Vaccination</option>
                                <option  value="allergy">Allergy</option>
                                <option value="general">General</option>
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
                            Loading records...
                        </p>
                    ) : records_data.length === 0 ? (
                        <div className="w-full p-12 flex items-center justify-center flex-col">
                            <LuFiles size={22}  className="text-gray-400 mb-3"/>
                            <p className="text-sm text-gray-700 font-medium">Records not Found</p>
                            <p className="text-xs text-gray-400 mt-1">We couldn't find records matching your search</p>
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
                                        <th className="p-4">Record Type</th>
                                        <th className="p-4">Title</th>
                                        <th className="p-4">Date Recorded</th>
                                        <th className="p-4">Doctor</th>
                                        <th className="p-4">Files</th>
                                        <th className="p-4">Description</th>
                                        <th className="p-4">Date Created</th>
                                        <th className="p-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                
                                <tbody className="divide-y divide-gray-50 text-sm">
                                    {records_data.map((record) => (
                                        <tr key={record.id} className="hover:bg-ray-50/50 transition-colors">
                                            <td className="p-4">
                                                <input type="checkbox" className="rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className='text-gray-800 font-semibold'>{record.patient}</span>
                                                    {/* <a className="text-xs text-gray-500 font-medium hover:text-blue-600 transition-all duration-200" href={`mailto:${prep.patient_email}`}>{prep.patient_email}</a> */}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1.5 rounded-lg text-[11px]  font-medium capitalize ${record_type_style[record.record_type]}`}>{record.record_type}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold'>{record.title}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-center text-gray-800 font-semibold'>{record.date}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold'>{record.doctor}</span>
                                            </td>
                                            {record.file ? (
                                                <td className="p-4">
                                                    <a
                                                    href={
                                                        record.file.startsWith('http')
                                                        ? record.file : `http://localhost:8000${record.file.startsWith('/') ? '' : '/'}${record.file}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className=" p-4 text-blue-500 hover:text-blue-700 underline font-medium cursor-pointer"
                                                    >
                                                        View Attached File
                                                    </a>
                                                </td>
                                                
                                            ) : (
                                                <td className="p-4">
                                                    <span className='text-gray-800 font-semibold'>No file attached</span>
                                                </td>
                                            )}
                                            <td className="p-4">
                                                <div className="w-90 text-left text-gray-800 font-medium">
                                                    {record.description || 'N/A'}
                                                </div>
                                            </td>
                                            
                                            <td className="p-4">
                                                <span className='text-center text-gray-800 font-semibold'>{formatDateTime(record.created_at)}</span>
                                            </td>
                                            {/* <td className="p-4">
                                                <span className={`px-3 py-1.5 rounded-lg text-[11px] font-medium capitalize`}>{formatDateTime(record.created_at)}</span>
                                            </td> */}
                                            <td className="p-4 text-center relative">
                                                <button
                                                    onClick={() => setActiveMenuId(activeMenuId === record.id ? null : record.id)}
                                                    className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 cursor-pointer"
                                                >
                                                    <LuGripVertical className="w-4 h-4" />
                                                </button>
                                                {activeMenuId === record.id &&(
                                                    <div className="absolute right-6 top-10 w-45 bg-white rounded-xl shadow-lg border border-gray-100 z-10 p-1 text-left flex flex-col items-center justify-center">
                                                        <button
                                                            onClick={() => setEditModal({open : true, records : record})}
                                                            className="w-full text-left flex items-center px-3 py-2 text-xs mb-1.5 font-medium rounded-md cursor-pointer bg-[#DBEAFE]/50 hover:bg-[#DBEAFE] text-[#2563EB] transition-all duration-300"
                                                        >   
                                                        Edit Record
                                                        </button>
                                                        <button
                                                                onClick={() => {handleDeleteRecords(record.id)}}
                                                                className="w-full flex font-medium items-center text-left px-3 py-2 rounded-md cursor-pointer text-xs text-white bg-red-500 hover:bg-red-600"
                                                            >
                                                                Delete Record
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
                            Showing <span className="font-semibold">{records_data.length}</span> of <span className="font-semibold">{totalCount}</span> records
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                disabled={!recordsData?.pagination?.previous}
                                onClick={() => setPage(page - 1)}
                                className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                            >
                                <LuChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 font-semibold text-gray-700">Page {page}</span>
                            <button
                                disabled={!recordsData?.pagination?.next}
                                onClick={() => setPage(page + 1)}
                                className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                            >
                                <LuChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    {createRecords && (
                        <AddRecordModal 
                            patientId={selectedPatient.id}
                            onSaved={() => {
                                setCreateRecords(false);
                                fetchMedicalRecords();
                            }}
                            onClose={() => setCreateRecords(false)}
                            isAdmin={true}
                        />
                    )}
                    {editModal.open && (
                        <EditRecordsModal 
                            records = {editModal.records}
                            onClose={() => setEditModal({open : false, records : null})}
                            onSave = {handleRecordsEdit}
                        />
                    )}
                    
                </div>
            </div>
        </>
    )
}

function EditRecordsModal({records, onClose, onSave}){
    const [form, setForm] = useState({
        id : records?.id || '',
        title : records?.title || '',
        record_type : records?.record_type || 'general',
        description : records?.description || '',
        file : null
        
    })

    useEffect(() => {
        if(records){
            setForm({
                id : records.id || '',
                title : records.title || '',
                record_type : records.record_type || '',
                description: records.description || '',
                file : null
            })
        }
    }, [records]);

    return(
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-lg space-y-2'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='font-semibold text-slate-800'>Edit Records</h2>
                    <button onClick={onClose} className='text-slate-400 hover:text-slate-600 cursor-pointer'>
                        <LuX className='w-5 h-5' />
                    </button>
                </div>
                <div  className='flex flex-col space-y-1'>
                    <label className='text-xs font-semibold text-slate-600'>Title</label>
                    <input 
                        value={form.title} 
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        // placeholder={placeholder} 
                        className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                    />
                </div>
                <div className='flex flex-col space-y-1'>
                    <label className='text-xs font-semibold text-slate-600'>Type</label>
                    <select value={form.record_type} onChange={(e) => setForm({ ...form, record_type: e.target.value })}
                        className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'>
                        <option value="lab_result"> Lab Result</option>
                        <option value="imaging"> Imaging</option>
                        <option value="diagnosis"> Diagnosis</option>
                        <option value="surgery"> Surgery</option>
                        <option value="vaccination"> Vaccination</option>
                        <option value="allergy"> Allergy</option>
                        <option value="general"> General</option>
                    </select>
                </div>
                <div className='flex flex-col space-y-1'>
                    <label className='text-xs font-semibold text-slate-600'>Description</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                        rows={2} className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 resize-none' />
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Change file</label>
                    <input
                        name="file"
                        type="file"
                        onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                    />
                        
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
    )
}
function AddRecordModal({patientId, patientName, onClose, onSaved, isAdmin=false, defaultDoctorId = ""}){
    const [form, setForm] = useState({
        patient_id : patientId || "",
        doctor_id : defaultDoctorId || "",
        title : "",
        record_type : "general",
        description : "",
        date_recorded : new Date().toISOString().split("T")[0],
    });

    const [file, setFile] = useState(null)
    const [patient, setPatient] = useState([])
    const [doctor, setDoctor] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchingDoctors, setFetchingDoctors] = useState(false)
    const [fetchingPatients, setFetchingPatients] = useState(false)
    const [feedback, setFeedback] = useState({message : "", type : ""})
    const [error, setError] = useState("");

    useEffect(() => {
        if(!isAdmin || patientId) return;

        const fetchPatients = async() => {
            setFetchingPatients(true)
            try{
                const response = await api.get('admin/manage-patients-list/');
                const patientList = response.data.results || response.data || [];
                setPatient(patientList)
            }catch(err){
                console.error('Failed to fetch records', err)
                setError('Failed to load records')
            }finally{
                setFetchingPatients(false);
            }
        };
        fetchPatients();
    }, [isAdmin, patientId]);

    useEffect(() => {
        if(!isAdmin) return;
        const fetchDoctors = async() => {
            setFetchingDoctors(true);

            try{
                const response = await api.get('/admin/manage-doctors-list/');
                const doctorList = response.data.results || response.data || [];

                setDoctor(doctorList)
                if(defaultDoctorId){
                    setForm((prev) => ({...prev, doctor_id: defaultDoctorId}))
                }
            }catch(err){
                console.error('Failed to fetch doctors', err);
                setError('Failed to load doctors')
            }finally{
                setFetchingDoctors(false);
            }
        };
        fetchDoctors()
    }, [isAdmin, defaultDoctorId]);

    const handleChange = (e) =>{
        const { name, value} = e.target;
        setForm((prev) => ({...prev, [name] : value,}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");

        if(!form.patient_id){
            setError("Please select a patient.");
            return;
        }

        if(isAdmin && !form.doctor_id){
            setError("Please select a doctor");
            return;
        }

        setLoading(true)

        try{
            const formData = new FormData();

            formData.append('patient_id', form.patient_id);
            formData.append('title', form.title),
            formData.append('record_type', form.record_type),
            formData.append('description', form.description),
            formData.append('date_recorded', form.date_recorded);

            if(isAdmin){
                formData.append("doctor_id", form.doctor_id);
            }
            if(file){
                formData.append("file", file);
            }
            await api.post('/patients/records/add/', formData);
            setFeedback({message : "Record Added successfully", type : "success"})
            onSaved()

        }catch(err){
            // console.error('Record submission failed:', err)
            setFeedback({message : "Record submission failed", type : "error"})
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="font-semibold text-slate-800">Add Records</h2>
                        {/* {patientName && <p className="text-xs text-slate-400">{patientName}</p>} */}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <LuX className="w-5 h-5" />
                    </button>
                </div>
                {/* {error && (
                    <div className="mb-3 p-2 bg-red-50 text-red-600 text-xs rounded border border-red-200">
                        {errorMsg}
                    </div>
                )} */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                    {!patientId && (
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-semibold text-slate-600">Select Patient</label>
                            <select
                                name="patient_id"
                                value={form.patient_id}
                                onChange={handleChange}
                                disabled={fetchingPatients}
                                required
                                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 bg-white"
                            >
                                <option value="">Choose Patient...</option>
                                {patient.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name || `${p.first_name || ""} ${p.last_name || ""}`.trim() || p.username} ({p.email})
                                        {/* {p.name || `${p.first_name || ''} ${p.last_name || ''}`.trim() || p.username} ({p.email}) */}
                                    </option>
                                ))}

                            </select>
                        </div>
                    )}
                    {isAdmin && (
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-semibold text-slate-600">Assign Doctor</label>
                            <select
                                name="doctor_id"
                                value={form.doctor_id}
                                onChange={handleChange}
                                required
                                disabled={fetchingDoctors}
                                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 bg-white"
                            >
                                <option value="" disabled>
                                    Select a doctor...
                                </option>
                                {doctor.map((doc) => (
                                    <option key={doc.id} value={doc.id}>
                                        Dr. {doc.first_name || ''} {doc.last_name || doc.email}  ({doc.email})
                                    </option>
                                ))}

                            </select>
                        </div>
                    )}
                    <div className="flex flex-col space-y-1">
                         <label className="text-xs font-semibold text-slate-600">Title</label>
                         <input
                             type="text"
                             name="title"
                             value={form.title}
                             onChange={handleChange}
                             required
                             placeholder="e.g. Blood Test Results"
                             className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300"
                         />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-600">
                                Record Type
                            </label>
                            <select
                                 name="record_type"
                                 value={form.record_type}
                                 onChange={handleChange}
                                 required
                                 className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 bg-white"
                             >
                                <option value="lab_result"> Lab Result</option>
                                <option value="imaging"> Imaging</option>
                                <option value="diagnosis"> Diagnosis</option>
                                <option value="surgery"> Surgery</option>
                                <option value="vaccination"> Vaccination</option>
                                <option value="allergy"> Allergy</option>
                                <option value="general"> General</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-semibold text-slate-600">Date Recorded</label>
                            <input
                                type="date"
                                name="date_recorded"
                                value={form.date_recorded}
                                onChange={handleChange}
                                required
                                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Description / Notes</label>
                        <textarea 
                            name="description"
                            value={form.description}
                            onChange= {handleChange}
                            rows={4}
                            placeholder="Clinical findings, observations..."
                            className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Attach File</label>
                        <input
                             type="file"
                             accept=".pdf,.docs,.docx,.jpg,.jpeg,.png"
                             name="date_recorded"
                             onChange={(e) => setFile(e.target.files?.[0] || null)}
                             className="cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300"
                        />
                        {file && (
                            <p className="text-[10px] text-slate-400">{file.name}</p>
                        )}
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
                            disabled={loading || fetchingDoctors || fetchingPatients}
                            className="flex-1 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-60"
                        >
                            {loading ? 'Adding Record...' : 'Add Record'}
                        </motion.button>
                     </div>
                </form>
            </div>
        </div>
    )
}
