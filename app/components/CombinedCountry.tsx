import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, Users, MapPin, DollarSign, Zap } from 'lucide-react';
import { COUNTRIES } from './country-data';

interface CombinedCountryProps {
  countries: string[];
}

export function CombinedCountry({ countries }: CombinedCountryProps) {
  if (countries.length !== 2) return null;

  const [country1, country2] = countries;
  const data1 = COUNTRIES[country1];
  const data2 = COUNTRIES[country2];

  if (!data1 || !data2) return null;

  // Combined stats
  const combinedPopulation = data1.population + data2.population;
  const combinedArea = data1.landArea + data2.landArea;
  const combinedGDP = data1.gdp + data2.gdp;
  const avgGDPperCapita = Math.round((data1.gdpPerCapita + data2.gdpPerCapita) / 2);
  
  // Combined name
  const combinedName = `${country1.slice(0, Math.ceil(country1.length / 2))}${country2.slice(Math.floor(country2.length / 2))}`;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <h2 className="text-white">Combined Nation</h2>
        </div>
        <div className="text-2xl bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
          {combinedName}
        </div>
        <p className="text-slate-400 text-sm mt-1">
          A hypothetical merger of {country1} and {country2}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700/50">
          <Users className="h-4 w-4 text-blue-400 mb-2" />
          <div className="text-xs text-slate-400">Population</div>
          <div className="text-white text-xl">{(combinedPopulation / 1000000).toFixed(1)}M</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700/50">
          <MapPin className="h-4 w-4 text-green-400 mb-2" />
          <div className="text-xs text-slate-400">Land Area</div>
          <div className="text-white text-xl">{(combinedArea / 1000).toFixed(0)}K km²</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-700/50">
          <DollarSign className="h-4 w-4 text-purple-400 mb-2" />
          <div className="text-xs text-slate-400">Combined GDP</div>
          <div className="text-white text-xl">${(combinedGDP / 1000).toFixed(1)}T</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-amber-900/30 to-amber-800/30 border-amber-700/50">
          <Zap className="h-4 w-4 text-amber-400 mb-2" />
          <div className="text-xs text-slate-400">Avg GDP/Capita</div>
          <div className="text-white text-xl">${(avgGDPperCapita / 1000).toFixed(0)}K</div>
        </Card>
      </div>

      {/* World Ranking */}
      <Card className="p-4 bg-slate-800 border-slate-700">
        <h4 className="text-white mb-3">Global Rankings (Hypothetical)</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">By Population:</span>
            <Badge variant="outline" className="bg-blue-500/20 border-blue-500/30 text-blue-400">
              Top 5
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">By Land Area:</span>
            <Badge variant="outline" className="bg-green-500/20 border-green-500/30 text-green-400">
              Top 10
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">By GDP:</span>
            <Badge variant="outline" className="bg-purple-500/20 border-purple-500/30 text-purple-400">
              Top 3
            </Badge>
          </div>
        </div>
      </Card>

      {/* Cultural Blend */}
      <Card className="p-4 bg-slate-800 border-slate-700">
        <h4 className="text-white mb-3">Cultural Blend</h4>
        <div className="space-y-3">
          <div>
            <div className="text-xs text-slate-400 mb-2">Combined Music Genres</div>
            <div className="flex flex-wrap gap-1">
              {[...new Set([...(data1.music?.genres || []), ...(data2.music?.genres || [])])].slice(0, 6).map(genre => (
                <Badge key={genre} variant="outline" className="bg-pink-500/20 border-pink-500/30 text-pink-300 text-xs">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-2">Merged Industries</div>
            <div className="flex flex-wrap gap-1">
              {[...new Set([
                ...(data1.jobMarket?.topIndustries.map(i => i.name) || []),
                ...(data2.jobMarket?.topIndustries.map(i => i.name) || [])
              ])].slice(0, 4).map(industry => (
                <Badge key={industry} variant="outline" className="bg-blue-500/20 border-blue-500/30 text-blue-300 text-xs">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Olympic Potential */}
      <Card className="p-4 bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-amber-700/50">
        <h4 className="text-amber-400 mb-3">Combined Olympic Performance</h4>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-2xl text-yellow-400">{(data1.olympics?.gold || 0) + (data2.olympics?.gold || 0)}</div>
            <div className="text-xs text-slate-400">Gold</div>
          </div>
          <div>
            <div className="text-2xl text-slate-300">{(data1.olympics?.silver || 0) + (data2.olympics?.silver || 0)}</div>
            <div className="text-xs text-slate-400">Silver</div>
          </div>
          <div>
            <div className="text-2xl text-amber-600">{(data1.olympics?.bronze || 0) + (data2.olympics?.bronze || 0)}</div>
            <div className="text-xs text-slate-400">Bronze</div>
          </div>
        </div>
      </Card>

      {/* Environmental Impact */}
      <Card className="p-4 bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-700/50">
        <h4 className="text-red-400 mb-2">Environmental Considerations</h4>
        <p className="text-slate-300 text-sm">
          Combined CO₂ emissions: <span className="text-white">{(data1.co2Emissions + data2.co2Emissions).toFixed(1)}M tons/year</span>
        </p>
        <p className="text-slate-400 text-xs mt-2">
          This combined nation would need to implement strong environmental policies to manage its carbon footprint.
        </p>
      </Card>
    </div>
  );
}
