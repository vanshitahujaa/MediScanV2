import React, { createContext, useContext, useState, useEffect } from 'react';
import { Reminder } from '../types';
import { sampleReminders } from '../data/sampleData';

interface ReminderContextType {
  reminders: Reminder[];
  addReminder: (reminder: Reminder) => void;
  updateReminder: (reminder: Reminder) => void;
  removeReminder: (id: string) => void;
  getActiveReminders: () => Reminder[];
  checkReminders: () => Reminder[];
  markReminderTaken: (id: string) => void;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export const useReminder = () => {
  const context = useContext(ReminderContext);
  if (context === undefined) {
    throw new Error('useReminder must be used within a ReminderProvider');
  }
  return context;
};

export const ReminderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const savedReminders = localStorage.getItem('reminders');
    return savedReminders ? JSON.parse(savedReminders) : sampleReminders;
  });

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (reminder: Reminder) => {
    setReminders(prevReminders => [...prevReminders, { ...reminder, id: crypto.randomUUID() }]);
  };

  const updateReminder = (updatedReminder: Reminder) => {
    setReminders(prevReminders => 
      prevReminders.map(reminder => 
        reminder.id === updatedReminder.id ? updatedReminder : reminder
      )
    );
  };

  const removeReminder = (id: string) => {
    setReminders(prevReminders => prevReminders.filter(reminder => reminder.id !== id));
  };

  const getActiveReminders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return reminders.filter(reminder => {
      const endDate = reminder.endDate ? new Date(reminder.endDate) : null;
      return !endDate || endDate >= today;
    });
  };

  const checkReminders = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    return getActiveReminders().filter(reminder => {
      const [hour, minute] = reminder.time.split(':').map(Number);
      return hour === currentHour && Math.abs(minute - currentMinute) <= 5;
    });
  };

  const markReminderTaken = (id: string) => {
    setReminders(prevReminders => 
      prevReminders.map(reminder => {
        if (reminder.id === id) {
          const takenDates = [...(reminder.takenDates || []), new Date().toISOString()];
          return { ...reminder, takenDates };
        }
        return reminder;
      })
    );
  };

  return (
    <ReminderContext.Provider value={{ 
      reminders, 
      addReminder, 
      updateReminder, 
      removeReminder,
      getActiveReminders,
      checkReminders,
      markReminderTaken
    }}>
      {children}
    </ReminderContext.Provider>
  );
};