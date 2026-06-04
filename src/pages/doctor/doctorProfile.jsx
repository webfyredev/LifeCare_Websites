import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import { LuCamera } from 'react-icons/lu'
import defaultAvatar from '../../images/avatar.png'
import { FaCheck } from 'react-icons/fa'
import { buttonEffects } from '../../animations/effects'
import { motion } from 'framer-motion'


export default function DoctorPofile(){
    const {user, setUser} = useAuth()
    const fileInputRef = useRef(null)

    const [userForm, setUserForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        gender: '',
        address: '',
    })

    const [profileForm, setProfileForm] = useState({
        specialization: '',
        license_number: '',
        years_of_experience: '',
        bio: '',
        consultation_fee: '',
        available_days: '',
    })

    const [avatarPreview, setAvatarPreview] = useState(null)
    const [avatarFile, setAvatarFile] = useState(null)
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [formInitialized, setFormInitialized] = useState(false)

    useEffect(() => {
        document.title = 'Doctor Profile Settings - Lifecare'
        if(user && !formInitialized) {
            setUserForm({
                first_name : user.first_name ?? '',
                last_name : user.last_name ?? '',
                email : user.email ?? '',
                phone_number : user.phone_number ?? '',
                date_of_birth : user.date_of_birth ?? '',
                gender : user.gender ?? '',
                address : user.address ?? '',

            })
            setProfileForm({
                specialization : user.doctor_profile?.specialization ?? '',
                license_number : user.doctor_profile?.license_number ?? '',
                years_of_experience: user.doctor_profile?.years_of_experience ?? '',
                bio: user.doctor_profile?.bio ?? '',
                consultation_fee: user.doctor_profile?.consultation_fee ?? '',
                available_days: user.doctor_profile?.available_days ?? '',
            })
            setFormInitialized(true)
        }
    }, [user])

    useEffect(() => {
        if(success){
            const t = setTimeout(() => setSuccess(false), 4000)
            return () => clearTimeout(t)
        }
    },[success])

    const handleAvatarClick = () => fileInputRef.current?.click()

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setAvatarFile(file)
        setAvatarPreview(URL.createObjectURL(file))
    }
    const handleUserChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })
    }
    const handleProfileChange = (e) => {
        setProfileForm({ ...profileForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError(null)

        try {
            // Step 1 — save user fields (including photo if changed)
            const formData = new FormData()
            Object.entries(userForm).forEach(([key, val]) => {
                if (val) formData.append(key, val)
            })
            if (avatarFile) formData.append('profile_picture', avatarFile)

            await api.patch('/accounts/me/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            
            await api.patch('/doctors/profile/', profileForm)
            
            const freshUser = await api.get('/accounts/me/')
            setUser(freshUser.data)

            setAvatarFile(null)
            setSuccess(true)

        } catch (err) {
            console.error(err)
            setError('Failed to save changes. Please try again.')
        } finally {
            setSaving(false)
        }
    }

     const getAvatar = () => {
        if (avatarPreview) return avatarPreview
        if (user?.profile_picture) return `http://localhost:8000${user.profile_picture}`
        return defaultAvatar
    }

    return(
        <>
            <div className='w-full md:px-10 py-5 flex flex-col space-y-5'>
                <div className='w-auto flex flex-col space-y-1'>
                    <h3 className='font-bold text-2xl text-[#1e293b]'>Profile Settings</h3>
                    <p className='text-[13px] text-[#94a3b8]'>Manage your personal information and preferences</p>
                </div>
                {success && (
                    <div className='flex items-center space-x-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg'>
                        <FaCheck  className='mr-1.5'/> Profile updated successfully
                    </div>
                )}
                {error && (
                    <div className='bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col space-y-5 mt-5 '>
                    <div className='w-full p-6 rounded-xl bg-white border-slate-100 transition-all duration-300 border flex space-x-5'>
                        <img
                            src={getAvatar()} 
                            alt="avatar img" className='w-12 h-12 md:w-18 md:h-18 rounded-full' 
                        />
                        <div className='w-auto flex flex-col'>
                            <h3 className='text-xl font-semibold text-[#1e293b]'>Dr. {user?.first_name} {user?.last_name}</h3>
                            <a href={`mailto: ${user?.email}`} className='text-[13px] text-slate-400 font-normal hover:text-slate-600 transition-all duration-300'>{user?.email}</a>
                            <motion.button
                                {...buttonEffects}
                                type='button' 
                                onClick={handleAvatarClick}
                                className='text-[13px] text-slate-600 font-medium flex items-center justify-center w-30 overflow-hidden cursor-pointer bg-slate-100 flex items-center py-2 mt-3 rounded-lg'>
                                
                                Change Photo
                            </motion.button>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                accept='image/*'
                                 className='hidden'
                                />
                            
                        </div>
                    </div>
                    <div className='w-full px-3 md:px-5 py-5 bg-white border-slate-100 rounded-xl flex flex-col'>
                        <h3 className='text-md font-semibold text-[#1e293b]'>Personal Information</h3>
                        <div className='w-full grid grid-cols-1  md:grid-cols-2 gap-4 py-2 mt-3'>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-xs font-semibold text-slate-600'>First Name</label>
                                <input
                                    name='first_name'
                                    value={userForm.first_name}
                                    onChange={handleUserChange}
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-xs font-semibold text-slate-600'>Last Name</label>
                                <input
                                    name='last_name'
                                    value={userForm.last_name}
                                    onChange={handleUserChange}
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-xs font-semibold text-slate-600'>Phone</label>
                                <input
                                    name='phone_number'
                                    value={userForm.phone_number}
                                    onChange={handleUserChange}
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-xs font-semibold text-slate-600'>Email</label>
                                <input
                                    name='email'
                                    type='email'
                                    value={userForm.email}
                                    onChange={handleUserChange}
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-xs font-semibold text-slate-600'>Date of Birth</label>
                                <input
                                    name='date_of_birth'
                                    type='date'
                                    value={userForm.date_of_birth}
                                    onChange={handleUserChange}
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                                />
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <label className='text-xs font-semibold text-slate-500'>Gender</label>
                                <select
                                    name='gender'
                                    value={userForm.gender}
                                    onChange={handleUserChange}
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                                >
                                    <option value=''>Select gender</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                    <option value='other'>Other</option>
                                </select>
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <label className='text-xs font-semibold text-slate-500'>Address</label>
                                <input
                                    name='address'
                                    value={userForm.address}
                                    onChange={handleUserChange}
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full px-3 md:px-5 py-5 bg-white border-slate-100 rounded-xl flex flex-col'>
                        <h3 className='text-md font-semibold text-[#1e293b]'>Medical Information</h3>
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-2 mt-3'>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-xs font-semibold text-slate-500'>Specialization</label>
                                <input
                                    name='specialization'
                                    value={profileForm.specialization}
                                    onChange={handleProfileChange}
                                    placeholder='Specilization...'
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-xs font-semibold text-slate-500'>License Number</label>
                                <input
                                    name='license_number'
                                    value={profileForm.license_number}
                                    onChange={handleProfileChange}
                                    placeholder='e.g. STF0019032'
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-xs font-semibold text-slate-500'>Years of Experience</label>
                                <input
                                    type='number'
                                    name='years_of_experience'
                                    value={profileForm.years_of_experience}
                                    onChange={handleProfileChange}
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-xs font-semibold text-slate-500'>Consultation Fee</label>
                                <input
                                    type='number'
                                    name='consultation_fee'
                                    value={profileForm.consultation_fee}
                                    onChange={handleProfileChange}
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-xs font-semibold text-slate-500'>Available Days</label>
                                <input
                                    type='text'
                                    name='available_days'
                                    value={profileForm.available_days}
                                    onChange={handleProfileChange}
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-xs font-semibold text-slate-500'>Bio</label>
                                <textarea
                                    name='bio'
                                    value={profileForm.bio}
                                    onChange={handleProfileChange}
                                    rows={2}
                                    placeholder='Bio...'
                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 resize-none'
                                />
                            </div>
                        </div>

                    </div>
                    <div className='flex space-x-3 justify-end'>
                        <motion.button
                            {...buttonEffects}
                            type='submit'
                            disabled={saving}
                            className='bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-60'
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </motion.button>
                        <button
                            type='button'
                            onClick={() => window.location.reload()}
                            className='border border-slate-200 text-slate-600 text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}