"use client"

import { useState } from 'react';
import { GlobeViewer } from './components/GlobeViewer';
import { CountrySelector } from './components/CountrySelector';
import { ComparisonPanel } from './components/ComparisonPanel';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

export default function App() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handleCountrySelect = (countryName: string) => {
    if (selectedCountries.includes(countryName)) {
      setSelectedCountries(selectedCountries.filter(c => c !== countryName));
      toast.info(`${countryName} removed`);
    } else if (selectedCountries.length < 2) {
      setSelectedCountries([...selectedCountries, countryName]);
      toast.success(`${countryName} selected`);
    } else {
      toast.error('Maximum 2 countries can be selected');
    }
  };

  const handleClearSelection = () => {
    setSelectedCountries([]);
    toast.info('Selection cleared');
  };

  return (
    <div className="w-full h-screen bg-slate-950 overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-slate-950 to-transparent p-6">
        <h1 className="text-white text-center mb-2">Global Country Explorer</h1>
        <p className="text-slate-400 text-center text-sm">
          Select up to 2 countries to compare
        </p>
      </div>

      {/* Globe Viewer */}
      <GlobeViewer 
        selectedCountries={selectedCountries}
        onCountryClick={handleCountrySelect}
      />

      {/* Country Selector */}
      <CountrySelector
        selectedCountries={selectedCountries}
        onCountrySelect={handleCountrySelect}
        onClearSelection={handleClearSelection}
      />

      {/* Comparison Panel */}
      {selectedCountries.length > 0 && (
        <ComparisonPanel 
          selectedCountries={selectedCountries}
          onClearSelection={handleClearSelection}
        />
      )}
    </div>
  );
}
