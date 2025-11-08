import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Briefcase, TrendingUp, DollarSign, GraduationCap } from 'lucide-react';
import { COUNTRIES } from './country-data';

interface JobMarketProps {
  countries: string[];
}

export function JobMarket({ countries }: JobMarketProps) {
  return (
    <div className="space-y-6">
      {countries.map((country, idx) => {
        const data = COUNTRIES[country];
        if (!data?.jobMarket) return null;

        return (
          <div key={country}>
            <h3 className={`mb-4 ${idx === 0 ? 'text-blue-400' : 'text-amber-400'}`}>
              {country}
            </h3>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="p-3 bg-slate-800 border-slate-700">
                <div className="text-slate-400 text-xs mb-1">Unemployment</div>
                <div className="text-white text-xl">{data.jobMarket.unemployment}%</div>
              </Card>
              <Card className="p-3 bg-slate-800 border-slate-700">
                <div className="text-slate-400 text-xs mb-1">Avg. Salary</div>
                <div className="text-white text-xl">${data.jobMarket.avgSalary}k</div>
              </Card>
            </div>

            {/* Top Industries */}
            <Card className="p-4 bg-slate-800 border-slate-700 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="h-4 w-4 text-blue-400" />
                <h4 className="text-white">Top Industries</h4>
              </div>
              <div className="space-y-2">
                {data.jobMarket.topIndustries.map(industry => (
                  <div key={industry.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">{industry.name}</span>
                      <span className="text-slate-400">{industry.growth}% growth</span>
                    </div>
                    <Progress value={industry.growth * 10} className="h-1" />
                  </div>
                ))}
              </div>
            </Card>

            {/* In-Demand Skills */}
            <Card className="p-4 bg-slate-800 border-slate-700 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4 text-purple-400" />
                <h4 className="text-white">In-Demand Skills</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.jobMarket.inDemandSkills.map(skill => (
                  <Badge key={skill} variant="outline" className="bg-slate-700 border-slate-600 text-slate-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Work-Life Balance */}
            <Card className="p-4 bg-slate-800 border-slate-700">
              <h4 className="text-white mb-3">Work Environment</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg. Work Hours:</span>
                  <span className="text-white">{data.jobMarket.avgWorkHours} hrs/week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Paid Vacation:</span>
                  <span className="text-white">{data.jobMarket.vacationDays} days/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Work-Life Balance:</span>
                  <span className="text-white">{data.jobMarket.workLifeBalance}/10</span>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
