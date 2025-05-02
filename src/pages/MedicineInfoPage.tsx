import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, AlertTriangle, CalendarClock, Pill, ChevronLeft, 
  Bell, Edit, Trash, Info, Shield 
} from 'lucide-react';
import { useMedication } from '../contexts/MedicationContext';
import { useReminder } from '../contexts/ReminderContext';
import AddReminderModal from '../components/reminders/AddReminderModal';

const MedicineInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMedicineById, checkExpiration, removeMedicine } = useMedication();
  const { reminders, addReminder } = useReminder();
  const navigate = useNavigate();
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [medicine, setMedicine] = useState(getMedicineById(id || ''));
  const [userProfile, setUserProfile] = useState({
    age: 35,
    weight: 70,
    conditions: ['None']
  });

  useEffect(() => {
    const medicineData = getMedicineById(id || '');
    if (!medicineData) {
      navigate('/');
    } else {
      setMedicine(medicineData);
    }
    
    // Get user profile from local storage in a real app
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
  }, [id, getMedicineById, navigate]);

  if (!medicine) {
    return <div className="p-8 text-center">Medicine not found</div>;
  }

  const isExpired = checkExpiration(medicine.id);
  const medicineReminders = reminders.filter(r => r.medicineId === medicine.id);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to remove this medicine?')) {
      removeMedicine(medicine.id);
      navigate('/');
    }
  };

  const handleAddReminder = (reminderData: any) => {
    addReminder({
      ...reminderData,
      medicineId: medicine.id,
      medicineName: medicine.name
    });
    setShowAddReminderModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 dark:text-blue-400 mb-6"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>

      {/* Medicine Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {medicine.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-1">{medicine.manufacturer}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Pill size={16} className="mr-1" />
                <span>{medicine.form} • {medicine.strength}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Edit medicine"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Delete medicine"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>

          {isExpired && (
            <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg mb-4">
              <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
              <p>This medicine has expired on {new Date(medicine.expirationDate).toLocaleDateString()}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Clock size={20} className="mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dosage</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {medicine.dosage.adult} {medicine.dosageUnit} (adult)
                </p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CalendarClock size={20} className="mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expiration</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {new Date(medicine.expirationDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAddReminderModal(true)}
            className="w-full flex items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Bell size={20} className="mr-2" />
            Set Medication Reminder
          </button>
        </div>
      </div>

      {/* Dosage Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Dosage Information</h2>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Recommended Dosage</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">Adults:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{medicine.dosage.adult} {medicine.dosageUnit}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">Children (6-12):</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{medicine.dosage.child} {medicine.dosageUnit}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">Elderly (65+):</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{medicine.dosage.elderly} {medicine.dosageUnit}</span>
            </div>
          </div>

          <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Personalized Recommendation</h3>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
            <p className="text-gray-700 dark:text-gray-300">
              Based on your profile (Age: {userProfile.age}), the recommended dosage is:
            </p>
            <p className="text-xl font-semibold text-blue-700 dark:text-blue-300 mt-2">
              {userProfile.age < 12 
                ? medicine.dosage.child 
                : userProfile.age > 65 
                  ? medicine.dosage.elderly 
                  : medicine.dosage.adult} {medicine.dosageUnit}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Take {medicine.frequency} for best results.
            </p>
          </div>
        </div>
      </div>

      {/* Medicine Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
            <Info size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Uses</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300">{medicine.description}</p>
            <ul className="mt-4 space-y-2">
              {medicine.uses.map((use, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-blue-500 mr-3"></span>
                  <span className="text-gray-600 dark:text-gray-300">{use}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
            <Shield size={18} className="mr-2 text-red-500 dark:text-red-400" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Side Effects & Precautions</h2>
          </div>
          <div className="p-6">
            <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Possible Side Effects:</h3>
            <ul className="mb-4 space-y-2">
              {medicine.sideEffects.map((effect, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-red-500 mr-3"></span>
                  <span className="text-gray-600 dark:text-gray-300">{effect}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Precautions:</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {medicine.precautions}
            </p>
          </div>
        </div>
      </div>

      {/* Active Reminders */}
      {medicineReminders.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Active Reminders</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {medicineReminders.map(reminder => (
                <div 
                  key={reminder.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center">
                    <Bell size={18} className="mr-3 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{reminder.time}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{reminder.daysOfWeek.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Edit size={16} />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Reminder Modal */}
      {showAddReminderModal && (
        <AddReminderModal 
          medicine={medicine}
          onClose={() => setShowAddReminderModal(false)}
          onSave={handleAddReminder}
        />
      )}
    </div>
  );
};

export default MedicineInfoPage;