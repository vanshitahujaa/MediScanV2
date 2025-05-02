import React, { useState } from 'react';
import { Bell, PlusCircle, Calendar, Clock, Edit, Trash, Filter } from 'lucide-react';
import { useReminder } from '../contexts/ReminderContext';
import { useMedication } from '../contexts/MedicationContext';
import ReminderCard from '../components/reminders/ReminderCard';
import AddReminderModal from '../components/reminders/AddReminderModal';

const RemindersPage: React.FC = () => {
  const { reminders, addReminder, removeReminder } = useReminder();
  const { medicines } = useMedication();
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [filterMedicine, setFilterMedicine] = useState<string>('all');
  
  const handleAddReminder = (reminderData: any) => {
    addReminder(reminderData);
    setShowAddReminderModal(false);
  };
  
  const handleDeleteReminder = (id: string) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      removeReminder(id);
    }
  };
  
  const filteredReminders = filterMedicine === 'all' 
    ? reminders 
    : reminders.filter(r => r.medicineId === filterMedicine);
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Medication Reminders</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Never miss a dose again with your personalized reminder schedule
          </p>
        </div>
        <button
          onClick={() => setShowAddReminderModal(true)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          <PlusCircle size={20} className="mr-2" />
          Add Reminder
        </button>
      </div>
      
      {/* Filter options */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center mb-3">
          <Filter size={18} className="mr-2 text-gray-500 dark:text-gray-400" />
          <h2 className="font-medium text-gray-700 dark:text-gray-300">Filter Reminders</h2>
        </div>
        <select
          value={filterMedicine}
          onChange={(e) => setFilterMedicine(e.target.value)}
          className="w-full md:w-64 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Medications</option>
          {medicines.map(medicine => (
            <option key={medicine.id} value={medicine.id}>{medicine.name}</option>
          ))}
        </select>
      </div>
      
      {/* Upcoming reminders */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Your Reminders</h2>
        
        {filteredReminders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReminders.map(reminder => (
              <ReminderCard 
                key={reminder.id} 
                reminder={reminder} 
                onDelete={() => handleDeleteReminder(reminder.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <Bell size={40} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">No reminders found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {filterMedicine === 'all' 
                ? "You haven't set up any medication reminders yet." 
                : "No reminders for this medication."}
            </p>
            <button
              onClick={() => setShowAddReminderModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              <PlusCircle size={18} className="mr-2" />
              Add Your First Reminder
            </button>
          </div>
        )}
      </div>
      
      {/* How reminders work */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">How Medication Reminders Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Clock className="text-blue-600 dark:text-blue-400 h-8 w-8" />
              </div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Set Schedule</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose your medications and set up the times when you need to take them.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Bell className="text-green-600 dark:text-green-400 h-8 w-8" />
              </div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Get Notified</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive timely notifications when it's time to take your medication.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Calendar className="text-purple-600 dark:text-purple-400 h-8 w-8" />
              </div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Mark reminders as completed and track your medication adherence over time.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Note:</strong> For the best experience, make sure to allow notifications in your browser
              and keep the app open to receive medication reminders.
            </p>
          </div>
        </div>
      </div>
      
      {/* Add Reminder Modal */}
      {showAddReminderModal && (
        <AddReminderModal 
          onClose={() => setShowAddReminderModal(false)}
          onSave={handleAddReminder}
          medicines={medicines}
        />
      )}
    </div>
  );
};

export default RemindersPage;