import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Music, Play, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { COUNTRIES } from './country-data';

interface MusicPlayerProps {
  countries: string[];
}

export function MusicPlayer({ countries }: MusicPlayerProps) {
  return (
    <div className="space-y-6">
      {countries.map((country, idx) => {
        const data = COUNTRIES[country];
        if (!data?.music) return null;

        return (
          <div key={country}>
            <h3 className={`mb-4 ${idx === 0 ? 'text-blue-400' : 'text-amber-400'}`}>
              {country}
            </h3>

            {/* Popular Genres */}
            <Card className="p-4 bg-slate-800 border-slate-700 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Music className="h-4 w-4 text-pink-400" />
                <h4 className="text-white">Popular Genres</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.music.genres.map(genre => (
                  <Badge key={genre} variant="outline" className="bg-slate-700 border-slate-600 text-slate-200">
                    {genre}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Famous Artists */}
            <Card className="p-4 bg-slate-800 border-slate-700 mb-4">
              <h4 className="text-white mb-3">Famous Artists</h4>
              <div className="space-y-3">
                {data.music.famousArtists.map(artist => (
                  <div key={artist.name} className="flex items-start justify-between p-2 bg-slate-700/50 rounded">
                    <div>
                      <div className="text-white text-sm">{artist.name}</div>
                      <div className="text-slate-400 text-xs">{artist.genre}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs text-slate-400 hover:text-white"
                      onClick={() => window.open(`https://open.spotify.com/search/${encodeURIComponent(artist.name)}`, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Traditional Instruments */}
            <Card className="p-4 bg-slate-800 border-slate-700">
              <h4 className="text-white mb-3">Traditional Instruments</h4>
              <div className="grid grid-cols-2 gap-2">
                {data.music.traditionalInstruments.map(instrument => (
                  <div key={instrument} className="p-2 bg-slate-700/50 rounded text-center">
                    <span className="text-slate-300 text-sm">{instrument}</span>
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
