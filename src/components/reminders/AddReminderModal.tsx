import React, { useState } from 'react';
import { XCircle, Bell, Clock, Calendar, Pill } from 'lucide-react';
import { Medicine } from '../../types';

interface AddReminderModalProps {
  onClose: () => void;
  onSave: (reminderData: any) => void;
  medicine?: Medicine;
  medicines?: Medicine[];
}

const AddReminderModal: React.FC<AddReminderModalProps> = ({ 
  onClose, 
  onSave, 
  medicine, 
  medicines = []
}) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const [reminderData, setReminderData] = useState({
    medicineId: medicine?.id || '',
    medicineName: medicine?.name || '',
    time: '08:00',
    daysOfWeek: [...daysOfWeek],
    dosage: medicine?.dosage.adult.toString() || '1',
    dosageUnit: medicine?.dosageUnit || 'pill(s)',
    notes: '',
    endDate: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReminderData({
      ...reminderData,
      [name]: value
    });
  };
  
  const handleDayToggle = (day: string) => {
    if (reminderData.daysOfWeek.includes(day)) {
      setReminderData({
        ...reminderData,
        daysOfWeek: reminderData.daysOfWeek.filter(d => d !== day)
      });
    } else {
      setReminderData({
        ...reminderData,
        daysOfWeek: [...reminderData.daysOfWeek, day]
      });
    }
  };
  
  const handleMedicineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMedicine = medicines.find(med => med.id === e.target.value);
    if (selectedMedicine) {
      setReminderData({
        ...reminderData,
        medicineId: selectedMedicine.id,
        medicineName: selectedMedicine.name,
        dosage: selectedMedicine.dosage.adult.toString(),
        dosageUnit: selectedMedicine.dosageUnit
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(reminderData);
  };

  // Set minimum date for end date to today
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center">
            <Bell size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {medicine ? `Set Reminder for ${medicine.name}` : 'Add Medication Reminder'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <XCircle size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {!medicine && medicines.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Medication
              </label>
              <select
                name="medicineId"
                value={reminderData.medicineId}
                onChange={handleMedicineChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select a medication</option>
                {medicines.map(med => (
                  <option key={med.id} value={med.id}>{med.name}</option>
                ))}
              </select>
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Clock size={16} className="inline mr-1" /> Reminder Time
            </label>
            <input
              type="time"
              name="time"
              value={reminderData.time}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Calendar size={16} className="inline mr-1" /> Reminder Days
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {daysOfWeek.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(day)}
                  className={`px-2 py-1 text-xs rounded-md ${
                    reminderData.daysOfWeek.includes(day)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {day.substring(0, 3)}
                </button>
              ))}
            </div>
            {reminderData.daysOfWeek.length === 0 && (
              <p className="text-red-500 text-xs mt-1">Please select at least one day</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Pill size={16} className="inline mr-1" /> Dosage
              </label>
              <input
                type="text"
                name="dosage"
                value={reminderData.dosage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Unit
              </label>
              <input
                type="text"
                name="dosageUnit"
                value={reminderData.dosageUnit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Date (Optional)
            </label>
            <input
              type="date"
              name="endDate"
              value={reminderData.endDate}
              min={today}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Leave empty if reminder should continue indefinitely
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={reminderData.notes}
              onChange={handleInputChange}
              rows={3}
              placeholder="Additional instructions or notes"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={reminderData.daysOfWeek.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Save Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReminderModal;