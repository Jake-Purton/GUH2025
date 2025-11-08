import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { COUNTRIES } from './country-data';
import { Users, MapPin, Leaf, Building2, DollarSign, GraduationCap } from 'lucide-react';

interface StatsComparisonProps {
  countries: string[];
}

export function StatsComparison({ countries }: StatsComparisonProps) {
  const stats = [
    {
      icon: Users,
      label: 'Population',
      key: 'population' as const,
      format: (val: number) => `${(val / 1000000).toFixed(1)}M`,
      color: 'bg-blue-500',
    },
    {
      icon: MapPin,
      label: 'Land Area',
      key: 'landArea' as const,
      format: (val: number) => `${val.toLocaleString()} km²`,
      color: 'bg-green-500',
    },
    {
      icon: Leaf,
      label: 'CO₂ Emissions',
      key: 'co2Emissions' as const,
      format: (val: number) => `${val.toFixed(1)}M tons`,
      color: 'bg-red-500',
    },
    {
      icon: Building2,
      label: 'GDP',
      key: 'gdp' as const,
      format: (val: number) => `$${(val / 1000).toFixed(1)}T`,
      color: 'bg-purple-500',
    },
    {
      icon: DollarSign,
      label: 'GDP per Capita',
      key: 'gdpPerCapita' as const,
      format: (val: number) => `$${val.toLocaleString()}`,
      color: 'bg-amber-500',
    },
    {
      icon: GraduationCap,
      label: 'Literacy Rate',
      key: 'literacyRate' as const,
      format: (val: number) => `${val}%`,
      color: 'bg-cyan-500',
    },
  ];

  const getMaxValue = (key: string) => {
    return Math.max(...countries.map(c => COUNTRIES[c]?.[key as keyof typeof COUNTRIES[string]] as number || 0));
  };

  return (
    <div className="space-y-6">
      {countries.map((country, idx) => {
        const data = COUNTRIES[country];
        if (!data) return null;

        return (
          <div key={country}>
            <h3 className={`mb-4 ${idx === 0 ? 'text-blue-400' : 'text-amber-400'}`}>
              {country}
            </h3>
            <div className="space-y-4">
              {stats.map(stat => {
                const Icon = stat.icon;
                const value = data[stat.key] as number;
                const maxValue = getMaxValue(stat.key);
                const percentage = (value / maxValue) * 100;

                return (
                  <Card key={stat.key} className="p-4 bg-slate-800 border-slate-700">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${idx === 0 ? 'text-blue-400' : 'text-amber-400'}`} />
                        <span className="text-sm text-slate-300">{stat.label}</span>
                      </div>
                      <span className="text-white">{stat.format(value)}</span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2"
                    />
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Environmental Impact Summary */}
      <Card className="p-4 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700/50">
        <h4 className="text-green-400 mb-2">Environmental Impact</h4>
        <div className="space-y-2 text-sm">
          {countries.map((country, idx) => {
            const data = COUNTRIES[country];
            if (!data) return null;
            
            const perCapitaCO2 = (data.co2Emissions * 1000000) / data.population;
            
            return (
              <div key={country} className="flex justify-between">
                <span className={idx === 0 ? 'text-blue-400' : 'text-amber-400'}>{country}:</span>
                <span className="text-slate-300">{perCapitaCO2.toFixed(2)} tons CO₂/person</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
