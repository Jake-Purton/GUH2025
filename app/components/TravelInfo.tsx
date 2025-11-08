import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Plane, Hotel, DollarSign, Calendar } from 'lucide-react';
import { COUNTRIES } from './country-data';

interface TravelInfoProps {
  countries: string[];
}

export function TravelInfo({ countries }: TravelInfoProps) {
  return (
    <div className="space-y-6">
      {countries.map((country, idx) => {
        const data = COUNTRIES[country];
        if (!data?.travel) return null;

        return (
          <div key={country}>
            <h3 className={`mb-4 ${idx === 0 ? 'text-blue-400' : 'text-amber-400'}`}>
              {country}
            </h3>

            {/* Flight Info */}
            <Card className="p-4 bg-slate-800 border-slate-700 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Plane className="h-4 w-4 text-sky-400" />
                <h4 className="text-white">Flight Information</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Average from US:</span>
                  <span className="text-white">${data.travel.avgFlightCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Flight Duration:</span>
                  <span className="text-white">{data.travel.flightDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Best Time to Visit:</span>
                  <span className="text-white">{data.travel.bestTimeToVisit}</span>
                </div>
              </div>
            </Card>

            {/* Hotel Info */}
            <Card className="p-4 bg-slate-800 border-slate-700 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Hotel className="h-4 w-4 text-purple-400" />
                <h4 className="text-white">Accommodation</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Budget Hotel:</span>
                  <span className="text-white">${data.travel.hotelCosts.budget}/night</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mid-range Hotel:</span>
                  <span className="text-white">${data.travel.hotelCosts.midRange}/night</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Luxury Hotel:</span>
                  <span className="text-white">${data.travel.hotelCosts.luxury}/night</span>
                </div>
              </div>
            </Card>

            {/* Daily Budget */}
            <Card className="p-4 bg-slate-800 border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="h-4 w-4 text-green-400" />
                <h4 className="text-white">Daily Budget</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Meals:</span>
                  <span className="text-white">${data.travel.dailyBudget.meals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Transportation:</span>
                  <span className="text-white">${data.travel.dailyBudget.transport}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Activities:</span>
                  <span className="text-white">${data.travel.dailyBudget.activities}</span>
                </div>
                <div className="border-t border-slate-700 pt-2 mt-2 flex justify-between">
                  <span className="text-slate-300">Total per Day:</span>
                  <span className="text-green-400">
                    ${data.travel.dailyBudget.meals + data.travel.dailyBudget.transport + data.travel.dailyBudget.activities}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
