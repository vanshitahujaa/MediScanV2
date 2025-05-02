import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import MedicineInfoPage from './pages/MedicineInfoPage';
import RemindersPage from './pages/RemindersPage';
import ProfilePage from './pages/ProfilePage';
import { MedicationProvider } from './contexts/MedicationContext';
import { ReminderProvider } from './contexts/ReminderContext';

function App() {
  return (
    <ThemeProvider>
      <MedicationProvider>
        <ReminderProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/scan" element={<ScanPage />} />
                  <Route path="/medicine/:id" element={<MedicineInfoPage />} />
                  <Route path="/reminders" element={<RemindersPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ReminderProvider>
      </MedicationProvider>
    </ThemeProvider>
  );
}

export default App;