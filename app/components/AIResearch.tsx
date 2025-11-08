import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Star, Camera, Utensils, Landmark } from 'lucide-react';
import { COUNTRIES } from './country-data';

interface AIResearchProps {
  countries: string[];
}

export function AIResearch({ countries }: AIResearchProps) {
  return (
    <div className="space-y-6">
      {countries.map((country, idx) => {
        const data = COUNTRIES[country];
        if (!data?.places) return null;

        return (
          <div key={country}>
            <h3 className={`mb-4 ${idx === 0 ? 'text-blue-400' : 'text-amber-400'}`}>
              {country}
            </h3>

            {/* Top Attractions */}
            <Card className="p-4 bg-slate-800 border-slate-700 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Landmark className="h-4 w-4 text-purple-400" />
                <h4 className="text-white">Top Attractions</h4>
              </div>
              <div className="space-y-3">
                {data.places.topAttractions.map(place => (
                  <div key={place.name} className="p-3 bg-slate-700/50 rounded">
                    <div className="flex items-start justify-between mb-1">
                      <div className="text-white text-sm">{place.name}</div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-slate-300">{place.rating}</span>
                      </div>
                    </div>
                    <div className="text-slate-400 text-xs">{place.description}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Must-Try Foods */}
            <Card className="p-4 bg-slate-800 border-slate-700 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Utensils className="h-4 w-4 text-orange-400" />
                <h4 className="text-white">Must-Try Foods</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.places.mustTryFoods.map(food => (
                  <Badge key={food} variant="outline" className="bg-slate-700 border-slate-600 text-slate-200">
                    {food}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Hidden Gems */}
            <Card className="p-4 bg-slate-800 border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Camera className="h-4 w-4 text-pink-400" />
                <h4 className="text-white">Hidden Gems</h4>
              </div>
              <div className="space-y-2">
                {data.places.hiddenGems.map(gem => (
                  <div key={gem} className="p-2 bg-slate-700/50 rounded">
                    <span className="text-slate-300 text-sm">{gem}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      })}

      {/* AI Research Note */}
      <Card className="p-4 bg-gradient-to-br from-violet-900/30 to-purple-900/30 border-violet-700/50">
        <h4 className="text-violet-400 mb-2">AI-Powered Insights</h4>
        <p className="text-slate-300 text-sm mb-3">
          Get personalized travel recommendations based on your interests and travel style.
        </p>
        <Button 
          className="w-full bg-violet-600 hover:bg-violet-700"
          onClick={() => alert('AI Research feature would integrate with OpenAI API for personalized recommendations')}
        >
          Get AI Recommendations
        </Button>
      </Card>
    </div>
  );
}
