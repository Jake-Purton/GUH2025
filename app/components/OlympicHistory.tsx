import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Medal, Trophy, TrendingUp } from 'lucide-react';
import { COUNTRIES } from './country-data';

interface OlympicHistoryProps {
  countries: string[];
}

export function OlympicHistory({ countries }: OlympicHistoryProps) {
  return (
    <div className="space-y-6">
      {countries.map((country, idx) => {
        const data = COUNTRIES[country];
        if (!data?.olympics) return null;

        const totalMedals = data.olympics.gold + data.olympics.silver + data.olympics.bronze;

        return (
          <div key={country}>
            <h3 className={`mb-4 ${idx === 0 ? 'text-blue-400' : 'text-amber-400'}`}>
              {country}
            </h3>

            {/* Total Medals */}
            <Card className="p-4 bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-amber-700/50 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  <h4 className="text-white">Total Medals</h4>
                </div>
                <div className="text-3xl text-amber-400">{totalMedals}</div>
              </div>
            </Card>

            {/* Medal Breakdown */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Card className="p-3 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border-yellow-600/30">
                <div className="text-yellow-400 text-xs mb-1">Gold</div>
                <div className="text-white text-2xl">{data.olympics.gold}</div>
              </Card>
              <Card className="p-3 bg-gradient-to-br from-slate-400/20 to-slate-600/20 border-slate-400/30">
                <div className="text-slate-300 text-xs mb-1">Silver</div>
                <div className="text-white text-2xl">{data.olympics.silver}</div>
              </Card>
              <Card className="p-3 bg-gradient-to-br from-amber-700/20 to-amber-900/20 border-amber-700/30">
                <div className="text-amber-600 text-xs mb-1">Bronze</div>
                <div className="text-white text-2xl">{data.olympics.bronze}</div>
              </Card>
            </div>

            {/* Top Sports */}
            <Card className="p-4 bg-slate-800 border-slate-700 mb-4">
              <h4 className="text-white mb-3">Top Sports</h4>
              <div className="space-y-2">
                {data.olympics.topSports.map(sport => (
                  <div key={sport.sport} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                    <span className="text-slate-300 text-sm">{sport.sport}</span>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="bg-yellow-600/20 border-yellow-600/30 text-yellow-400 text-xs">
                        {sport.medals} medals
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Highlights */}
            <Card className="p-4 bg-slate-800 border-slate-700">
              <h4 className="text-white mb-3">Recent Olympic Games</h4>
              <div className="space-y-3">
                {data.olympics.recentGames.map(game => (
                  <div key={game.year} className="border-l-2 border-blue-500 pl-3">
                    <div className="text-white text-sm">{game.year} - {game.location}</div>
                    <div className="text-slate-400 text-xs mt-1">
                      {game.goldMedals} 🥇 · {game.silverMedals} 🥈 · {game.bronzeMedals} 🥉
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
