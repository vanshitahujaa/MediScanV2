import React from 'react';
import { Link } from 'react-router-dom';
import { Scan, Bell, PlusCircle, Info } from 'lucide-react';
import { useMedication } from '../contexts/MedicationContext';
import { useReminder } from '../contexts/ReminderContext';
import MedicineCard from '../components/medicines/MedicineCard';
import ReminderCard from '../components/reminders/ReminderCard';

const HomePage: React.FC = () => {
  const { medicines } = useMedication();
  const { getActiveReminders } = useReminder();
  
  const activeReminders = getActiveReminders();
  const recentMedicines = medicines.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to MediScan</h1>
          <p className="text-lg mb-6">
            Scan your medicine, get personalized dosage information, and never miss a dose again with our smart reminder system.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/scan"
              className="bg-white text-blue-600 hover:bg-blue-50 px-5 py-3 rounded-lg font-medium flex items-center shadow-md transition-all duration-200"
            >
              <Scan size={20} className="mr-2" />
              Scan Medicine
            </Link>
            <Link
              to="/reminders"
              className="bg-blue-700 hover:bg-blue-800 px-5 py-3 rounded-lg font-medium flex items-center shadow-md transition-all duration-200"
            >
              <Bell size={20} className="mr-2" />
              Set Reminders
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Scan className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Medicine Scanner</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Easily scan your medicine packaging to get comprehensive information about dosage, usage, and precautions.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Info className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Personalized Dosage</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get personalized dosage recommendations based on your age, weight, and medical history.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Bell className="text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Medication Reminders</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Set up reminders for your medications and receive timely notifications to ensure you never miss a dose.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Medicines */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Your Medicines</h2>
          <Link 
            to="/scan" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center"
          >
            <PlusCircle size={20} className="mr-1" />
            Add New
          </Link>
        </div>

        {recentMedicines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentMedicines.map(medicine => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">No medicines added yet.</p>
            <Link 
              to="/scan"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Scan size={18} className="mr-2" />
              Scan Your First Medicine
            </Link>
          </div>
        )}
      </section>

      {/* Upcoming Reminders */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Upcoming Reminders</h2>
          <Link 
            to="/reminders" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center"
          >
            <PlusCircle size={20} className="mr-1" />
            Add Reminder
          </Link>
        </div>

        {activeReminders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeReminders.slice(0, 4).map(reminder => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">No reminders set up yet.</p>
            <Link 
              to="/reminders"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Bell size={18} className="mr-2" />
              Set Up Your First Reminder
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;