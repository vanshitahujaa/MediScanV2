import React, { createContext, useContext, useState, useEffect } from 'react';
import { Medicine, UserProfile } from '../types';
import { sampleMedicines } from '../data/sampleData';

interface MedicationContextType {
  medicines: Medicine[];
  addMedicine: (medicine: Medicine) => void;
  getMedicineById: (id: string) => Medicine | undefined;
  removeMedicine: (id: string) => void;
  checkExpiration: (medicineId: string) => boolean;
  calculateDosage: (medicineId: string, profile: UserProfile) => string;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const useMedication = () => {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error('useMedication must be used within a MedicationProvider');
  }
  return context;
};

export const MedicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const savedMedicines = localStorage.getItem('medicines');
    return savedMedicines ? JSON.parse(savedMedicines) : sampleMedicines;
  });

  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines));
  }, [medicines]);

  const addMedicine = (medicine: Medicine) => {
    setMedicines(prevMedicines => [...prevMedicines, medicine]);
  };

  const getMedicineById = (id: string) => {
    return medicines.find(medicine => medicine.id === id);
  };

  const removeMedicine = (id: string) => {
    setMedicines(prevMedicines => prevMedicines.filter(medicine => medicine.id !== id));
  };

  const checkExpiration = (medicineId: string) => {
    const medicine = getMedicineById(medicineId);
    if (!medicine) return false;
    
    const today = new Date();
    const expirationDate = new Date(medicine.expirationDate);
    return today > expirationDate;
  };

  const calculateDosage = (medicineId: string, profile: UserProfile) => {
    const medicine = getMedicineById(medicineId);
    if (!medicine) return "Medicine not found";
    
    // Basic dosage calculation based on age (simplified for demo)
    if (profile.age < 12) {
      return `${medicine.dosage.child} ${medicine.dosageUnit} (child dosage)`;
    } else if (profile.age > 65) {
      return `${medicine.dosage.elderly} ${medicine.dosageUnit} (elderly dosage)`;
    } else {
      return `${medicine.dosage.adult} ${medicine.dosageUnit} (adult dosage)`;
    }
  };

  return (
    <MedicationContext.Provider value={{ 
      medicines, 
      addMedicine, 
      getMedicineById, 
      removeMedicine,
      checkExpiration,
      calculateDosage
    }}>
      {children}
    </MedicationContext.Provider>
  );
};