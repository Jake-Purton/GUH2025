import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { COUNTRIES } from './country-data';

interface CountrySelectorProps {
  selectedCountries: string[];
  onCountrySelect: (countryName: string) => void;
  onClearSelection: () => void;
}

export function CountrySelector({ selectedCountries, onCountrySelect, onClearSelection }: CountrySelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredCountries = Object.keys(COUNTRIES).filter(country =>
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute top-24 left-6 z-20 w-80">
      <div className="bg-slate-900/95 backdrop-blur-sm rounded-lg border border-slate-700 shadow-2xl">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsExpanded(true);
              }}
              onFocus={() => setIsExpanded(true)}
              className="pl-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>

          {/* Selected Countries */}
          {selectedCountries.length > 0 && (
            <div className="mt-3 space-y-2">
              {selectedCountries.map((country, idx) => (
                <div
                  key={country}
                  className={`flex items-center justify-between p-2 rounded ${
                    idx === 0 ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-amber-500/20 border border-amber-500/30'
                  }`}
                >
                  <span className="text-white text-sm">{country}</span>
                  <button
                    onClick={() => onCountrySelect(country)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <Button
                onClick={onClearSelection}
                variant="outline"
                size="sm"
                className="w-full bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Search Results */}
        {isExpanded && searchQuery && (
          <div className="border-t border-slate-700">
            <ScrollArea className="h-64">
              <div className="p-2">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map(country => (
                    <button
                      key={country}
                      onClick={() => {
                        onCountrySelect(country);
                        setSearchQuery('');
                        setIsExpanded(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-slate-800 transition-colors ${
                        selectedCountries.includes(country)
                          ? 'text-blue-400 bg-slate-800'
                          : 'text-white'
                      }`}
                    >
                      {country}
                    </button>
                  ))
                ) : (
                  <div className="text-slate-400 text-sm text-center py-4">
                    No countries found
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
