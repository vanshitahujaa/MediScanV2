import { Medicine, Reminder } from '../types';

export const sampleMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol',
    manufacturer: 'Generic Pharma',
    description: 'A pain reliever and fever reducer. It is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.',
    form: 'Tablet',
    strength: '500mg',
    dosage: {
      adult: 2,
      child: 1,
      elderly: 1
    },
    dosageUnit: 'tablet(s)',
    frequency: 'Every 4-6 hours as needed',
    uses: [
      'Fever reduction',
      'Pain relief',
      'Headache',
      'Muscle pain'
    ],
    sideEffects: [
      'Nausea',
      'Rash',
      'Liver damage (with excessive use)',
      'Low blood pressure'
    ],
    precautions: 'Do not exceed 4000 mg per day. Avoid alcohol when taking this medication. Consult a doctor if symptoms persist beyond 3 days.',
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
  },
  {
    id: '2',
    name: 'Ibuprofen',
    manufacturer: 'Advil',
    description: 'A nonsteroidal anti-inflammatory drug (NSAID). It works by reducing hormones that cause inflammation and pain in the body.',
    form: 'Capsule',
    strength: '200mg',
    dosage: {
      adult: 1,
      child: 0.5,
      elderly: 0.5
    },
    dosageUnit: 'capsule(s)',
    frequency: 'Every 4-6 hours with food',
    uses: [
      'Reduction of fever',
      'Relief of mild to moderate pain',
      'Treatment of inflammatory conditions',
      'Relief of symptoms of arthritis'
    ],
    sideEffects: [
      'Stomach pain',
      'Heartburn',
      'Dizziness',
      'Mild headache',
      'Nausea'
    ],
    precautions: 'Take with food to reduce stomach upset. Do not use if you have heart disease, high blood pressure, or are allergic to aspirin.',
    expirationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago (expired)
  },
  {
    id: '3',
    name: 'Amoxicillin',
    manufacturer: 'Pfizer',
    description: 'A penicillin antibiotic that fights bacteria in your body. It is used to treat many different types of infection caused by bacteria.',
    form: 'Capsule',
    strength: '500mg',
    dosage: {
      adult: 1,
      child: 0.5,
      elderly: 0.5
    },
    dosageUnit: 'capsule(s)',
    frequency: 'Every 8 hours for 7-10 days',
    uses: [
      'Treatment of respiratory infections',
      'Treatment of ear infections',
      'Treatment of urinary tract infections',
      'Treatment of skin infections'
    ],
    sideEffects: [
      'Diarrhea',
      'Stomach pain',
      'Nausea',
      'Vomiting',
      'Rash'
    ],
    precautions: 'Take the full prescribed course even if you feel better before finishing. Alert your doctor if you have any allergies to penicillin antibiotics.',
    expirationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString() // 180 days from now
  }
];

export const sampleReminders: Reminder[] = [
  {
    id: '1',
    medicineId: '1',
    medicineName: 'Paracetamol',
    time: '08:00',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dosage: '2',
    dosageUnit: 'tablets',
    notes: 'Take with breakfast',
    takenDates: []
  },
  {
    id: '2',
    medicineId: '1',
    medicineName: 'Paracetamol',
    time: '20:00',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dosage: '2',
    dosageUnit: 'tablets',
    notes: 'Take with dinner',
    takenDates: []
  },
  {
    id: '3',
    medicineId: '3',
    medicineName: 'Amoxicillin',
    time: '08:00',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dosage: '1',
    dosageUnit: 'capsule',
    notes: 'Take with food',
    takenDates: []
  },
  {
    id: '4',
    medicineId: '3',
    medicineName: 'Amoxicillin',
    time: '16:00',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dosage: '1',
    dosageUnit: 'capsule',
    notes: 'Take with food',
    takenDates: []
  },
  {
    id: '5',
    medicineId: '3',
    medicineName: 'Amoxicillin',
    time: '00:00',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dosage: '1',
    dosageUnit: 'capsule',
    notes: 'Take before bed with water',
    takenDates: []
  }
];