import React, { useState } from 'react';
import { Bell, Calendar, Clock, CheckCircle, XCircle, Pill, MoreVertical } from 'lucide-react';
import { Reminder } from '../../types';
import { useReminder } from '../../contexts/ReminderContext';

interface ReminderCardProps {
  reminder: Reminder;
  onDelete?: () => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ reminder, onDelete }) => {
  const { markReminderTaken } = useReminder();
  const [showMenu, setShowMenu] = useState(false);
  
  const formatTime = (time: string) => {
    // Convert 24h format to 12h format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };
  
  const handleMarkTaken = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    markReminderTaken(reminder.id);
  };
  
  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete();
    setShowMenu(false);
  };
  
  // Determine if reminder was taken today
  const isTakenToday = () => {
    if (!reminder.takenDates || reminder.takenDates.length === 0) {
      return false;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return reminder.takenDates.some(dateStr => {
      const takenDate = new Date(dateStr);
      takenDate.setHours(0, 0, 0, 0);
      return takenDate.getTime() === today.getTime();
    });
  };
  
  const takenToday = isTakenToday();
  
  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-200 ${
      takenToday ? 'border-l-4 border-green-500 dark:border-green-400' : ''
    }`}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
              {reminder.medicineName || 'Medication'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{reminder.notes}</p>
          </div>
          
          <button 
            onClick={toggleMenu} 
            className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full"
          >
            <MoreVertical size={18} />
          </button>
          
          {showMenu && (
            <div className="absolute right-2 top-10 z-10 bg-white dark:bg-gray-700 shadow-lg rounded-md py-1 min-w-32">
              <button 
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Clock size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
            <span>{formatTime(reminder.time)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Calendar size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
            <span>{reminder.daysOfWeek.join(', ')}</span>
          </div>
          
          {reminder.dosage && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Pill size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
              <span>{reminder.dosage}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          {takenToday ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              <CheckCircle size={14} className="mr-1" />
              Taken today
            </span>
          ) : (
            <button
              onClick={handleMarkTaken}
              className="inline-flex items-center px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40"
            >
              <CheckCircle size={14} className="mr-1" />
              Mark as taken
            </button>
          )}
          
          <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Bell size={14} className="mr-1" />
            Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;