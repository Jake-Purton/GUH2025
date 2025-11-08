import { useState } from 'react';
import { X, TrendingUp, Merge, Music, Briefcase, Medal, Plane, Map } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { StatsComparison } from './StatsComparison';
import { TravelInfo } from './TravelInfo';
import { MusicPlayer } from './MusicPlayer';
import { JobMarket } from './JobMarket';
import { OlympicHistory } from './OlympicHistory';
import { AIResearch } from './AIResearch';
import { CombinedCountry } from './CombinedCountry';

interface ComparisonPanelProps {
  selectedCountries: string[];
  onClearSelection: () => void;
}

export function ComparisonPanel({ selectedCountries, onClearSelection }: ComparisonPanelProps) {
  const [showCombined, setShowCombined] = useState(false);

  return (
    <div className="absolute top-24 right-6 bottom-6 z-20 w-[500px]">
      <div className="h-full bg-slate-900/95 backdrop-blur-sm rounded-lg border border-slate-700 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between shrink-0">
          <h2 className="text-white">Country Comparison</h2>
          <button
            onClick={onClearSelection}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Combine Button */}
        {selectedCountries.length === 2 && !showCombined && (
          <div className="p-4 border-b border-slate-700 shrink-0">
            <Button
              onClick={() => setShowCombined(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-amber-500 hover:from-blue-600 hover:to-amber-600"
            >
              <Merge className="mr-2 h-4 w-4" />
              Combine Countries
            </Button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {showCombined && selectedCountries.length === 2 ? (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-slate-700 shrink-0">
                <Button
                  onClick={() => setShowCombined(false)}
                  variant="outline"
                  size="sm"
                  className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                >
                  Back to Comparison
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <CombinedCountry countries={selectedCountries} />
              </ScrollArea>
            </div>
          ) : (
            <Tabs defaultValue="stats" className="h-full flex flex-col">
              <TabsList className="mx-4 mt-4 grid grid-cols-3 bg-slate-800 shrink-0">
                <TabsTrigger value="stats" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Stats
                </TabsTrigger>
                <TabsTrigger value="travel" className="text-xs">
                  <Plane className="h-3 w-3 mr-1" />
                  Travel
                </TabsTrigger>
                <TabsTrigger value="culture" className="text-xs">
                  <Music className="h-3 w-3 mr-1" />
                  Culture
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="flex-1 m-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <StatsComparison countries={selectedCountries} />
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="travel" className="flex-1 m-0 overflow-hidden">
                <Tabs defaultValue="flights" className="h-full flex flex-col">
                  <TabsList className="mx-4 grid grid-cols-2 bg-slate-800 shrink-0">
                    <TabsTrigger value="flights" className="text-xs">Flights & Hotels</TabsTrigger>
                    <TabsTrigger value="places" className="text-xs">Places</TabsTrigger>
                  </TabsList>
                  <TabsContent value="flights" className="flex-1 m-0 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="p-4">
                        <TravelInfo countries={selectedCountries} />
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="places" className="flex-1 m-0 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="p-4">
                        <AIResearch countries={selectedCountries} />
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="culture" className="flex-1 m-0 overflow-hidden">
                <Tabs defaultValue="music" className="h-full flex flex-col">
                  <TabsList className="mx-4 grid grid-cols-3 bg-slate-800 shrink-0">
                    <TabsTrigger value="music" className="text-xs">
                      <Music className="h-3 w-3 mr-1" />
                      Music
                    </TabsTrigger>
                    <TabsTrigger value="jobs" className="text-xs">
                      <Briefcase className="h-3 w-3 mr-1" />
                      Jobs
                    </TabsTrigger>
                    <TabsTrigger value="olympics" className="text-xs">
                      <Medal className="h-3 w-3 mr-1" />
                      Olympics
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="music" className="flex-1 m-0 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="p-4">
                        <MusicPlayer countries={selectedCountries} />
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="jobs" className="flex-1 m-0 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="p-4">
                        <JobMarket countries={selectedCountries} />
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="olympics" className="flex-1 m-0 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="p-4">
                        <OlympicHistory countries={selectedCountries} />
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}
