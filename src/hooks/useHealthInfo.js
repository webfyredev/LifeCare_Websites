import { useEffect, useState } from "react"
import api from "../api/axios"

export function useAllergyInfo(allergenText){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!allergenText) return 
        const allergens = allergenText
        .split(/[,;]/)
        .map(a => a.trim())
        .filter(Boolean)
        if (!allergens.length) return

        setLoading(true)

        Promise.all(
            allergens.map(allergen =>
                api.get(`/patients/allergy-info/?allergen=${encodeURIComponent(allergen)}`)
                    .then(res => res.data)
                    .catch(() => ({
                        found: false,
                        allergen,
                        general_warning: `You have a recorded allergy to ${allergen}.`
                    }))
            )
        )
        .then(results => setData(results))
        .finally(() => setLoading(false))
    }, [allergenText])

    return { data, loading }
}
