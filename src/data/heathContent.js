import { useEffect, useState } from "react";
import api from "../api/axios";

export function useDrugInfo(medicationName){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if(!medicationName) return
        setLoading(true)
        api.get(`/patients/drug-info/?name=${encodeURIComponent(medicationName)}`)
        .then(res => setData(res.data))
        .catch(err => setError(err))
        .finally(() => setLoading(false))
    }, [medicationName])

    return { data, loading, error }
}



export const bloodTypeInfo = {
    'A+': {
        summary: 'You have blood type A positive (A+).',
        canDonateTo: ['A+', 'AB+'],
        canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
        emergency: 'In emergencies, you can receive A+ or O+ blood.',
        fact: 'A+ is the second most common blood type. About 30% of people have it.',
    },
    'A-': {
        summary: 'You have blood type A negative (A-).',
        canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
        canReceiveFrom: ['A-', 'O-'],
        emergency: 'In emergencies, you can only receive A- or O- blood.',
        fact: 'A- donors are valuable as their blood can be given to both A+ and A- patients.',
    },
    'B+': {
        summary: 'You have blood type B positive (B+).',
        canDonateTo: ['B+', 'AB+'],
        canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
        emergency: 'In emergencies, you can receive B+ or O+ blood.',
        fact: 'B+ is more common in people of African and South Asian descent.',
    },
    'B-': {
        summary: 'You have blood type B negative (B-).',
        canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
        canReceiveFrom: ['B-', 'O-'],
        emergency: 'In emergencies, only B- or O- blood is compatible.',
        fact: 'B- is one of the rarer blood types, found in about 2% of the population.',
    },
    'O+': {
        summary: 'You have blood type O positive (O+).',
        canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
        canReceiveFrom: ['O+', 'O-'],
        emergency: 'In emergencies, you can receive O+ or O- blood.',
        fact: 'O+ is the most common blood type — about 38% of people have it.',
    },
    'O-': {
        summary: 'You have blood type O negative (O-).',
        canDonateTo: ['All blood types — you are a universal donor'],
        canReceiveFrom: ['O-'],
        emergency: 'O- is used in emergencies when blood type is unknown. You can only receive O-.',
        fact: 'O- donors are critically important. Only about 7% of people have this type.',
    },
    'AB+': {
        summary: 'You have blood type AB positive (AB+).',
        canDonateTo: ['AB+'],
        canReceiveFrom: ['All blood types — you are a universal recipient'],
        emergency: 'You can receive any blood type in an emergency.',
        fact: 'AB+ is the rarest major blood type, found in about 3% of people.',
    },
    'AB-': {
        summary: 'You have blood type AB negative (AB-).',
        canDonateTo: ['AB+', 'AB-'],
        canReceiveFrom: ['A-', 'B-', 'O-', 'AB-'],
        emergency: 'In emergencies, you need AB- or O- blood.',
        fact: 'AB- is the rarest blood type — under 1% of people have it.',
    },
}