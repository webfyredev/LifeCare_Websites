export const allergyInfo = {
    'penicillin': {
        title: 'Penicillin Allergy',
        summary: 'You are allergic to Penicillin, a common antibiotic.',
        avoid: ['Amoxicillin', 'Ampicillin', 'Augmentin', 'Piperacillin'],
        symptoms: ['Rash or hives', 'Swelling of face or lips', 'Difficulty breathing', 'Anaphylaxis in severe cases'],
        tip: 'Always inform any doctor, dentist, or pharmacist about this allergy before receiving treatment.',
    },
    'sulfa': {
        title: 'Sulfa Drug Allergy',
        summary: 'You are allergic to sulfonamide antibiotics (sulfa drugs).',
        avoid: ['Bactrim', 'Septra', 'Trimethoprim-sulfamethoxazole'],
        symptoms: ['Skin rash', 'Stevens-Johnson syndrome in severe cases', 'Kidney problems'],
        tip: 'Inform healthcare providers before any procedure or new prescription.',
    },
    'aspirin': {
        title: 'Aspirin / NSAID Allergy',
        summary: 'You are sensitive to aspirin and related pain relievers.',
        avoid: ['Aspirin', 'Ibuprofen', 'Naproxen', 'Diclofenac'],
        symptoms: ['Nasal congestion', 'Hives', 'Asthma symptoms', 'Stomach pain'],
        tip: 'Paracetamol (Acetaminophen) is usually safe as an alternative. Always confirm with your doctor.',
    },
    'peanut': {
        title: 'Peanut Allergy',
        summary: 'You have a peanut allergy which can cause severe reactions.',
        avoid: ['Peanut oil', 'Groundnuts', 'Mixed nuts', 'Foods cooked in peanut oil'],
        symptoms: ['Hives', 'Swelling', 'Vomiting', 'Anaphylaxis'],
        tip: 'Carry an epinephrine auto-injector (EpiPen) if prescribed. Read all food labels carefully.',
    },
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

export const medicationGuides = {
    'metformin': {
        name: 'Metformin',
        purpose: 'Controls blood sugar levels in Type 2 diabetes.',
        sideEffects: ['Nausea and stomach upset', 'Diarrhoea (usually improves over time)', 'Loss of appetite'],
        tips: ['Take with food to reduce stomach upset', 'Avoid excessive alcohol', 'Stay hydrated'],
        callDoctor: ['Unusual muscle pain or weakness', 'Difficulty breathing', 'Stomach pain that does not go away'],
    },
    'lisinopril': {
        name: 'Lisinopril',
        purpose: 'Lowers blood pressure and protects the heart and kidneys.',
        sideEffects: ['Dry persistent cough', 'Dizziness when standing up', 'Elevated potassium levels'],
        tips: ['Take at the same time each day', 'Avoid potassium supplements unless prescribed', 'Rise slowly from sitting or lying down'],
        callDoctor: ['Swelling of face, lips, or throat', 'Severe dizziness or fainting', 'Signs of high potassium (muscle weakness)'],
    },
    'atorvastatin': {
        name: 'Atorvastatin',
        purpose: 'Lowers cholesterol and reduces risk of heart disease.',
        sideEffects: ['Muscle aches', 'Headache', 'Digestive issues'],
        tips: ['Can be taken at any time of day', 'Avoid large amounts of grapefruit juice', 'Report any unexplained muscle pain immediately'],
        callDoctor: ['Unexplained muscle pain, tenderness, or weakness', 'Dark coloured urine', 'Yellowing of skin or eyes'],
    },
    'amoxicillin': {
        name: 'Amoxicillin',
        purpose: 'Antibiotic that fights bacterial infections.',
        sideEffects: ['Diarrhoea', 'Nausea', 'Skin rash'],
        tips: ['Complete the full course even if you feel better', 'Take with or without food', 'Space doses evenly throughout the day'],
        callDoctor: ['Severe skin rash or hives', 'Difficulty breathing', 'Severe diarrhoea'],
    },
}

export const getMedicationGuide = (medicationName) => {
    const key = medicationName.toLowerCase().split(' ')[0]
    return medicationGuides[key] || null
}

export const getAllergyInfo = (allergyText) => {
    if (!allergyText) return []
    const results = []
    const text = allergyText.toLowerCase()
    Object.keys(allergyInfo).forEach(key => {
        if (text.includes(key)) {
            results.push(allergyInfo[key])
        }
    })
    return results
}