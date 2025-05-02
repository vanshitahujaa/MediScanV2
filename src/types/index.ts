export interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  description: string;
  form: string;
  strength: string;
  dosage: {
    adult: number;
    child: number;
    elderly: number;
  };
  dosageUnit: string;
  frequency: string;
  uses: string[];
  sideEffects: string[];
  precautions: string;
  expirationDate: string;
}

export interface Reminder {
  id: string;
  medicineId: string;
  medicineName: string;
  time: string;
  daysOfWeek: string[];
  dosage: string;
  dosageUnit: string;
  notes?: string;
  startDate?: string;
  endDate?: string;
  takenDates?: string[];
}

export interface UserProfile {
  name?: string;
  age: number;
  weight: number;
  height?: number;
  conditions: string[];
  allergies: string[];
}