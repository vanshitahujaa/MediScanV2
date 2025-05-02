import React, { useState, useEffect } from 'react';
import { User, Pill, Save, PlusCircle, Edit, Trash, ClipboardList } from 'lucide-react';
import { useMedication } from '../contexts/MedicationContext';
import { UserProfile } from '../types';

const ProfilePage: React.FC = () => {
  const { medicines } = useMedication();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    age: 30,
    weight: 70,
    height: 170,
    conditions: [],
    allergies: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newCondition, setNewCondition] = useState('');
  const [newAllergy, setNewAllergy] = useState('');

  useEffect(() => {
    // Load user profile from localStorage if available
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    setIsEditing(false);
  };

  const handleAddCondition = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCondition.trim()) {
      setUserProfile({
        ...userProfile,
        conditions: [...userProfile.conditions, newCondition.trim()]
      });
      setNewCondition('');
    }
  };

  const handleRemoveCondition = (index: number) => {
    const updatedConditions = [...userProfile.conditions];
    updatedConditions.splice(index, 1);
    setUserProfile({
      ...userProfile,
      conditions: updatedConditions
    });
  };

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAllergy.trim()) {
      setUserProfile({
        ...userProfile,
        allergies: [...userProfile.allergies, newAllergy.trim()]
      });
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (index: number) => {
    const updatedAllergies = [...userProfile.allergies];
    updatedAllergies.splice(index, 1);
    setUserProfile({
      ...userProfile,
      allergies: updatedAllergies
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Your Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center">
            <User size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Personal Information</h2>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Edit size={18} />
          </button>
        </div>
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={userProfile.age}
                    onChange={(e) => setUserProfile({...userProfile, age: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={userProfile.weight}
                    onChange={(e) => setUserProfile({...userProfile, weight: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={userProfile.height}
                    onChange={(e) => setUserProfile({...userProfile, height: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <button
                onClick={handleSaveProfile}
                className="mt-4 flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Save size={18} className="mr-2" />
                Save Profile
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {userProfile.name || 'Not set'}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {userProfile.age} years
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {userProfile.weight} kg
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Height</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {userProfile.height} cm
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Medical Conditions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <ClipboardList size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Medical Conditions</h2>
          </div>
        </div>
        <div className="p-6">
          <form onSubmit={handleAddCondition} className="flex mb-4">
            <input
              type="text"
              value={newCondition}
              onChange={(e) => setNewCondition(e.target.value)}
              placeholder="Add a medical condition"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md flex items-center"
            >
              <PlusCircle size={18} />
            </button>
          </form>
          
          {userProfile.conditions.length > 0 ? (
            <ul className="space-y-2">
              {userProfile.conditions.map((condition, index) => (
                <li 
                  key={index} 
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-gray-800 dark:text-gray-200">{condition}</span>
                  <button
                    onClick={() => handleRemoveCondition(index)}
                    className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <Trash size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No medical conditions added.
            </p>
          )}
        </div>
      </div>
      
      {/* Allergies */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Pill size={20} className="mr-2 text-red-500 dark:text-red-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Allergies</h2>
          </div>
        </div>
        <div className="p-6">
          <form onSubmit={handleAddAllergy} className="flex mb-4">
            <input
              type="text"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              placeholder="Add a medication allergy"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md flex items-center"
            >
              <PlusCircle size={18} />
            </button>
          </form>
          
          {userProfile.allergies.length > 0 ? (
            <ul className="space-y-2">
              {userProfile.allergies.map((allergy, index) => (
                <li 
                  key={index} 
                  className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                >
                  <span className="text-red-800 dark:text-red-200">{allergy}</span>
                  <button
                    onClick={() => handleRemoveAllergy(index)}
                    className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No allergies added.
            </p>
          )}
        </div>
      </div>
      
      {/* Medication History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Pill size={20} className="mr-2 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Medication History</h2>
          </div>
        </div>
        <div className="p-6">
          {medicines.length > 0 ? (
            <div className="space-y-3">
              {medicines.map(medicine => (
                <div 
                  key={medicine.id} 
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">{medicine.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Added on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    new Date(medicine.expirationDate) > new Date() 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {new Date(medicine.expirationDate) > new Date() ? 'Active' : 'Expired'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No medication history available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;