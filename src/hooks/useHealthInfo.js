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

        console.log('Allergens parsed:', allergens)
        if (!allergens.length) return

        setLoading(true)

        Promise.all(
            allergens.map(allergen =>
                api.get(`/patients/allergy_info/?allergen=${encodeURIComponent(allergen)}`)
                    .then(res => {
                        console.log(`Allergy response for ${allergen}:`, res.data)
                        return res.data
                    })
                    .catch(err => {
                        console.error(`Allergy fetch failed for ${allergen}:`, err)
                        return {
                            found : false,
                            allergen,
                            general_warning : `You have a recorder allergy to ${allergen}`
                        }
                    })
            )
        )
        .then(results => {
            console.log('All allergy results:', results),
            setData(results)
        })
        .finally(() => setLoading(false))
    }, [allergenText])

    return { data, loading }
}
