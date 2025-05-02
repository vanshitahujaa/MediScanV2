import React, { useState, useRef } from 'react';
import { Camera, Upload, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMedication } from '../contexts/MedicationContext';
import { Medicine } from '../types';
import { sampleMedicines } from '../data/sampleData';

const ScanPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanText, setScanText] = useState('');
  const [recognizedMedicine, setRecognizedMedicine] = useState<Medicine | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addMedicine } = useMedication();
  const navigate = useNavigate();

  const startScanning = () => {
    setIsScanning(true);
    // In a real app, this would use a camera API or OCR
    // For demo purposes, we'll simulate scanning after a delay
    setTimeout(() => {
      const randomMedicine = sampleMedicines[Math.floor(Math.random() * sampleMedicines.length)];
      setScanText(`Identified: ${randomMedicine.name}`);
      setRecognizedMedicine(randomMedicine);
      setIsScanning(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setScanText('Analyzing image...');
    
    // Simulate image analysis
    setTimeout(() => {
      const randomMedicine = sampleMedicines[Math.floor(Math.random() * sampleMedicines.length)];
      setScanText(`Identified: ${randomMedicine.name}`);
      setRecognizedMedicine(randomMedicine);
      setIsScanning(false);
    }, 2000);
  };

  const handleManualEntry = () => {
    navigate('/profile');
  };

  const handleConfirmMedicine = () => {
    if (recognizedMedicine) {
      // Generate a new ID to ensure it's unique
      const newMedicine = {
        ...recognizedMedicine,
        id: crypto.randomUUID()
      };
      addMedicine(newMedicine);
      navigate(`/medicine/${newMedicine.id}`);
    }
  };

  const handleTryAgain = () => {
    setRecognizedMedicine(null);
    setScanText('');
    setError('');
  };

  // Simulate text extraction (mock function)
  const handleManualTextInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('medicineText') as string;
    
    if (!text || text.trim().length < 5) {
      setError('Please enter a valid medicine description');
      return;
    }
    
    setIsScanning(true);
    setScanText('Analyzing text...');
    
    // Simulate text analysis
    setTimeout(() => {
      const randomMedicine = sampleMedicines[Math.floor(Math.random() * sampleMedicines.length)];
      setScanText(`Identified: ${randomMedicine.name}`);
      setRecognizedMedicine(randomMedicine);
      setIsScanning(false);
      setError('');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Scan Medicine</h1>
      
      {!recognizedMedicine ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Scan your medicine packaging or enter the text to get detailed information.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button
                onClick={startScanning}
                className="flex items-center justify-center p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                disabled={isScanning}
              >
                <Camera size={24} className="mr-2" />
                Use Camera
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center p-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
                disabled={isScanning}
              >
                <Upload size={24} className="mr-2" />
                Upload Image
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div>
            
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or enter text manually</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleManualTextInput}>
              <div className="mb-4">
                <textarea
                  name="medicineText"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={4}
                  placeholder="Enter the text from your medicine packaging..."
                  disabled={isScanning}
                ></textarea>
                {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                disabled={isScanning}
              >
                <Plus size={20} className="mr-2" />
                Process Text
              </button>
            </form>
          </div>
          
          {isScanning && (
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800">
              <div className="flex items-center">
                <div className="animate-pulse h-4 w-4 bg-blue-600 dark:bg-blue-400 rounded-full mr-3"></div>
                <p className="text-blue-800 dark:text-blue-300">{scanText || 'Scanning...'}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-green-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Medicine Identified</h2>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">{recognizedMedicine.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{recognizedMedicine.manufacturer}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{recognizedMedicine.description.substring(0, 100)}...</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleConfirmMedicine}
                className="flex-1 flex items-center justify-center p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <CheckCircle size={20} className="mr-2" />
                Confirm & Continue
              </button>
              
              <button
                onClick={handleTryAgain}
                className="flex-1 flex items-center justify-center p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
              >
                <AlertCircle size={20} className="mr-2" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <button
          onClick={handleManualEntry}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          Can't find your medicine? Add it manually
        </button>
      </div>
    </div>
  );
};

export default ScanPage;