import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, AlertTriangle, CalendarClock } from 'lucide-react';
import { Medicine } from '../../types';
import { useMedication } from '../../contexts/MedicationContext';

interface MedicineCardProps {
  medicine: Medicine;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  const { checkExpiration } = useMedication();
  const isExpired = checkExpiration(medicine.id);

  return (
    <Link
      to={`/medicine/${medicine.id}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
              {medicine.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{medicine.manufacturer}</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
            <Pill className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {medicine.description}
        </p>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <CalendarClock size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">
              Exp: {new Date(medicine.expirationDate).toLocaleDateString()}
            </span>
          </div>
          
          {isExpired && (
            <div className="flex items-center text-red-600 dark:text-red-400">
              <AlertTriangle size={16} className="mr-1" />
              <span>Expired</span>
            </div>
          )}
        </div>
      </div>
      
      <div className={`px-5 py-3 text-sm font-medium ${
        isExpired
          ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
          : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
      }`}>
        {isExpired ? 'Replace medicine - expired' : 'Good to use'}
      </div>
    </Link>
  );
};

export default MedicineCard;