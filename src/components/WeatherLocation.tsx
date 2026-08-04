import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  CloudSun, 
  Mountain, 
  Wind, 
  Droplets, 
  Compass, 
  Navigation, 
  ExternalLink,
  RefreshCw,
  Sun,
  CloudRain,
  Cloud,
  Moon,
  Sparkles,
  Eye
} from 'lucide-react';
import { WeatherData } from '../types';

export const WeatherLocation: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 21,
    condition: 'Pleasant Mountain Climate',
    humidity: 68,
    windSpeed: 12,
    precipitationProb: 15,
    altitudeMeters: 1880,
    altitudeFeet: 6168,
    locationName: 'Gatura, Gatanga Sub-County',
    subCounty: 'Gatanga',
    county: "Murang'a County, Kenya",
    cloudCover: 35,
    isDay: true,
    weatherCode: 2
  });
  const [loadingWeather, setLoadingWeather] = useState(false);

  // Manual simulation mode for user to test effects live ('auto', 'rain', 'sunny', 'night', 'sunset')
  const [simMode, setSimMode] = useState<'auto' | 'rain' | 'sunny' | 'night' | 'sunset'>('auto');

  // Fetch real weather data for Gatura (-0.835, 36.953) using Open-Meteo API
  const fetchGaturaWeather = async () => {
    setLoadingWeather(true);
    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-0.835&longitude=36.953&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,cloud_cover,is_day&hourly=precipitation_probability'
      );
      if (res.ok) {
        const data = await res.json();
        const current = data.current;
        const code = current.weather_code;
        let cond = 'Pleasant Mountain Climate';
        if (code === 0) cond = 'Sunny & Clear';
        else if (code >= 1 && code <= 3) cond = 'Partly Cloudy';
        else if (code >= 45 && code <= 48) cond = 'Foggy & Misty';
        else if (code >= 51 && code <= 67) cond = 'Light Rain Shower';
        else if (code >= 80) cond = 'Rain Showers';

        setWeather(prev => ({
          ...prev,
          temperature: Math.round(current.temperature_2m),
          humidity: Math.round(current.relative_humidity_2m),
          windSpeed: Math.round(current.wind_speed_10m),
          condition: cond,
          cloudCover: Math.round(current.cloud_cover ?? 35),
          isDay: current.is_day === 1,
          weatherCode: code,
          precipitationProb: data.hourly?.precipitation_probability?.[0] || 15
        }));
      }
    } catch (err) {
      console.log('Using mountain default weather for Gatura:', err);
    } finally {
      setLoadingWeather(false);
    }
  };

  useEffect(() => {
    fetchGaturaWeather();
  }, []);

  // Compute active atmospheric state based on real weather or manual sim mode
  const activeState = React.useMemo(() => {
    if (simMode === 'rain') {
      return {
        isRaining: true,
        isSunny: false,
        isNight: false,
        isSunset: false,
        cloudCover: 88,
        condition: 'Rain Showers & Misty Window',
        temp: weather.temperature,
        skyBg: 'from-slate-900 via-cyan-950/80 to-slate-950',
        glassBorder: 'border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.25)]'
      };
    }
    if (simMode === 'sunny') {
      return {
        isRaining: false,
        isSunny: true,
        isNight: false,
        isSunset: false,
        cloudCover: 10,
        condition: 'Bright Radiant Sun',
        temp: 24,
        skyBg: 'from-sky-500/30 via-amber-500/20 to-slate-900',
        glassBorder: 'border-amber-400/60 shadow-[0_0_40px_rgba(251,191,36,0.3)]'
      };
    }
    if (simMode === 'night') {
      return {
        isRaining: false,
        isSunny: false,
        isNight: true,
        isSunset: false,
        cloudCover: 25,
        condition: 'Clear Night & Glowing Moon',
        temp: 16,
        skyBg: 'from-indigo-950 via-slate-950 to-slate-900',
        glassBorder: 'border-indigo-400/40 shadow-[0_0_35px_rgba(129,140,248,0.25)]'
      };
    }
    if (simMode === 'sunset') {
      return {
        isRaining: false,
        isSunny: false,
        isNight: false,
        isSunset: true,
        cloudCover: 40,
        condition: 'Aberdare Sunset & Amber Glow',
        temp: 19,
        skyBg: 'from-amber-600/35 via-purple-900/35 to-slate-950',
        glassBorder: 'border-orange-400/50 shadow-[0_0_35px_rgba(251,146,60,0.3)]'
      };
    }

    // Auto / Real weather
    const isRaining = weather.condition.includes('Rain') || (weather.weatherCode !== undefined && weather.weatherCode >= 51);
    const isNight = !weather.isDay;
    const isSunny = !isNight && !isRaining && (weather.weatherCode === 0 || weather.weatherCode === 1 || weather.condition.includes('Sunny'));

    let skyBg = 'from-sky-500/20 via-blue-600/15 to-slate-900';
    let glassBorder = 'border-emerald-500/40 shadow-2xl';

    if (isRaining) {
      skyBg = 'from-slate-900 via-cyan-950/70 to-slate-950';
      glassBorder = 'border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.25)]';
    } else if (isNight) {
      skyBg = 'from-indigo-950 via-slate-950 to-slate-900';
      glassBorder = 'border-indigo-400/40 shadow-[0_0_35px_rgba(129,140,248,0.2)]';
    } else if (isSunny) {
      skyBg = 'from-sky-500/30 via-amber-500/20 to-slate-900';
      glassBorder = 'border-amber-400/50 shadow-[0_0_35px_rgba(251,191,36,0.25)]';
    }

    return {
      isRaining,
      isSunny,
      isNight,
      isSunset: false,
      cloudCover: weather.cloudCover ?? 35,
      condition: weather.condition,
      temp: weather.temperature,
      skyBg,
      glassBorder
    };
  }, [simMode, weather]);

  return (
    <section id="location" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Parallax Blur Layer */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Campus Location & Atmospheric Climate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Find Us in the Foothills of Aberdare
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light">
            Located in Gatura, Murang'a County — offering a cool, crisp, serene mountain atmosphere ideal for focused learning.
          </p>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Atmospheric Glass Weather Card & Altitude */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* ATMOSPHERIC GLASS WINDOW CARD */}
            <div className={`relative rounded-3xl p-6 sm:p-7 bg-slate-900/80 backdrop-blur-2xl border ${activeState.glassBorder} transition-all duration-700 overflow-hidden space-y-6 group`}>
              
              {/* 1. SKY BACKDROP GRADIENT DEPENDING ON TIME / WEATHER */}
              <div className={`absolute inset-0 bg-gradient-to-br ${activeState.skyBg} transition-all duration-1000 pointer-events-none`} />

              {/* 2. CLOUD COVER % VISUAL LAYER (CLOUD DENSITY OVERLAY) */}
              <div 
                className="absolute inset-0 transition-opacity duration-1000 pointer-events-none bg-slate-950/40"
                style={{ opacity: (activeState.cloudCover / 100) * 0.75 }}
              >
                <div className="absolute top-2 -left-10 w-64 h-32 bg-slate-400/20 rounded-full blur-2xl animate-float-cloud" />
                <div className="absolute bottom-4 right-0 w-80 h-40 bg-slate-500/20 rounded-full blur-3xl animate-float-cloud" style={{ animationDelay: '5s' }} />
              </div>

              {/* 3. SUNNY GLOW LIGHT (LIT WITH GLOWY YELLOW LIGHT & SUN BEAMS) */}
              {activeState.isSunny && (
                <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-to-br from-amber-300/60 via-yellow-400/30 to-transparent blur-2xl animate-pulse-glow pointer-events-none">
                  {/* Sun Lens Flare Line */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-200/80 to-transparent transform -rotate-45" />
                </div>
              )}

              {/* 4. NIGHT MOON & STARS LAYER */}
              {activeState.isNight && (
                <div className="absolute top-6 right-8 pointer-events-none">
                  {/* Glowing Silver Moon Disc */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-slate-200 via-sky-100 to-white shadow-[0_0_35px_rgba(224,242,254,0.8)] relative border border-white/60 flex items-center justify-center">
                    {/* Moon Crater Details */}
                    <div className="w-3 h-3 bg-slate-300/50 rounded-full absolute top-3 left-3" />
                    <div className="w-2 h-2 bg-slate-300/40 rounded-full absolute bottom-3 right-4" />
                    <Moon className="w-7 h-7 text-indigo-950/60 opacity-80" />
                  </div>
                  {/* Stars */}
                  <div className="absolute -top-2 -left-10 w-1 h-1 bg-white rounded-full animate-twinkle" />
                  <div className="absolute top-8 -left-16 w-1.5 h-1.5 bg-sky-200 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
                  <div className="absolute bottom-2 -left-6 w-1 h-1 bg-amber-100 rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
                </div>
              )}

              {/* 5. RAINDROPS ON GLASS LAYER (IF RAINING) */}
              {activeState.isRaining && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                  {/* Frosted condensation mist overlay */}
                  <div className="absolute inset-0 bg-cyan-900/10 backdrop-blur-[1px]" />
                  
                  {/* Animated Raindrops Sliding Down Glass Pane */}
                  {[
                    { left: '8%', delay: '0.1s', size: 'w-1.5 h-4' },
                    { left: '18%', delay: '0.7s', size: 'w-2 h-6' },
                    { left: '28%', delay: '0.3s', size: 'w-1 h-3' },
                    { left: '42%', delay: '1.2s', size: 'w-2 h-5' },
                    { left: '55%', delay: '0.5s', size: 'w-1.5 h-4' },
                    { left: '68%', delay: '1.5s', size: 'w-2.5 h-7' },
                    { left: '78%', delay: '0.2s', size: 'w-1 h-3' },
                    { left: '88%', delay: '1.0s', size: 'w-2 h-5' },
                    { left: '94%', delay: '1.8s', size: 'w-1.5 h-4' },
                  ].map((drop, idx) => (
                    <div
                      key={idx}
                      className={`absolute -top-6 ${drop.size} bg-gradient-to-b from-cyan-100/90 to-cyan-400/60 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.4)] animate-raindrop`}
                      style={{ left: drop.left, animationDelay: drop.delay }}
                    />
                  ))}
                  
                  {/* Water streaks on glass bottom */}
                  <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-cyan-400/20 to-transparent" />
                </div>
              )}

              {/* GLASS CARD CONTENT LAYER */}
              <div className="relative z-30 space-y-6">
                
                {/* Header row */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-2xl border ${
                      activeState.isSunny 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                        : activeState.isRaining
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                        : activeState.isNight
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {activeState.isRaining ? (
                        <CloudRain className="w-8 h-8 animate-bounce" />
                      ) : activeState.isSunny ? (
                        <Sun className="w-8 h-8 animate-spin-slow text-amber-300" />
                      ) : activeState.isNight ? (
                        <Moon className="w-8 h-8 text-indigo-200" />
                      ) : (
                        <CloudSun className="w-8 h-8 text-amber-300" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-lg text-white">Live School Glass Window</h3>
                        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                      </div>
                      <p className="text-xs text-slate-300">{weather.locationName}</p>
                    </div>
                  </div>

                  <button
                    onClick={fetchGaturaWeather}
                    disabled={loadingWeather}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-emerald-500 text-slate-300 hover:text-slate-950 transition-colors border border-white/10"
                    title="Refresh live weather"
                  >
                    <RefreshCw className={`w-4 h-4 ${loadingWeather ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {/* Temperature & Main Display */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline space-x-3">
                      <span className="text-5xl font-black text-white tracking-tight">{activeState.temp}°C</span>
                      <span className={`text-sm font-extrabold uppercase px-3 py-1 rounded-full border ${
                        activeState.isSunny 
                          ? 'bg-amber-400/20 border-amber-400/40 text-amber-300' 
                          : activeState.isRaining 
                          ? 'bg-cyan-400/20 border-cyan-400/40 text-cyan-300' 
                          : activeState.isNight
                          ? 'bg-indigo-400/20 border-indigo-400/40 text-indigo-200'
                          : 'bg-emerald-400/20 border-emerald-400/40 text-emerald-300'
                      }`}>
                        {activeState.condition}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 font-medium">
                      High altitude Aberdare mountain breeze • Gatura
                    </p>
                  </div>
                </div>

                {/* Atmospheric Indicators Grid */}
                <div className="grid grid-cols-3 gap-3">
                  
                  {/* Humidity */}
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 text-center space-y-1 backdrop-blur-md">
                    <Droplets className="w-5 h-5 text-cyan-400 mx-auto" />
                    <p className="text-[11px] text-slate-400 font-medium">Humidity</p>
                    <p className="text-sm font-bold text-white">{weather.humidity}%</p>
                  </div>

                  {/* Wind */}
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 text-center space-y-1 backdrop-blur-md">
                    <Wind className="w-5 h-5 text-emerald-400 mx-auto" />
                    <p className="text-[11px] text-slate-400 font-medium">Wind Speed</p>
                    <p className="text-sm font-bold text-white">{weather.windSpeed} km/h</p>
                  </div>

                  {/* Cloud Cover % on Glass */}
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 text-center space-y-1 backdrop-blur-md">
                    <Cloud className="w-5 h-5 text-amber-300 mx-auto" />
                    <p className="text-[11px] text-slate-400 font-medium">Cloud Cover</p>
                    <p className="text-sm font-bold text-amber-300">{activeState.cloudCover}%</p>
                  </div>

                </div>

                {/* SIMULATION PREVIEW TOGGLES FOR USER */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Atmospheric Simulation</span>
                    </span>
                    <span className="text-emerald-400">{simMode === 'auto' ? 'Live Data' : 'Simulated'}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'auto', label: '⚡ Live Gatura' },
                      { id: 'sunny', label: '☀️ Sunny Glow' },
                      { id: 'rain', label: '🌧️ Raining Drops' },
                      { id: 'night', label: '🌙 Night Moon' },
                      { id: 'sunset', label: '🌅 Sunset Glow' },
                    ].map(btn => (
                      <button
                        key={btn.id}
                        onClick={() => setSimMode(btn.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          simMode === btn.id
                            ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-white/10'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Altitude Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-500/40 shadow-xl backdrop-blur-xl flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <Mountain className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">Campus Altitude</h4>
                  <p className="text-2xl font-black text-white">{weather.altitudeMeters} meters</p>
                  <p className="text-xs text-slate-400">({weather.altitudeFeet} feet above sea level)</p>
                </div>
              </div>
              <Compass className="w-8 h-8 text-emerald-500/40 hidden sm:block" />
            </div>

            {/* Directions Note */}
            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-sm text-slate-300 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <Navigation className="w-4 h-4" />
                <span>Travel Directions</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                From Nairobi or Thika, take the Thika Highway to Kenol, turn off towards Gatanga and proceed along the tarmac highway directly to Gatura Market. The school is located 200m from Gatura town center.
              </p>
            </div>

          </div>

          {/* Right Column: Live Embedded Google Map */}
          <div className="lg:col-span-7 h-[450px] lg:h-auto min-h-[420px] rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl relative group">
            
            <iframe
              title="St. Teresa Gatura Girls Senior School Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31917.84880942006!2d36.935000!3d-0.835000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f42a5a5a5a5a5%3A0x5a5a5a5a5a5a5a5a!2sGatura%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
              className="w-full h-full border-0 filter grayscale-[20%] contrast-[110%] group-hover:grayscale-0 transition-all duration-500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Overlay Badge on Map */}
            <div className="absolute top-4 left-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/20 text-white shadow-xl max-w-xs space-y-1">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
                <MapPin className="w-4 h-4" />
                <span>Pinned Location</span>
              </div>
              <h4 className="font-bold text-sm text-white">St. Teresa Gatura Girls Senior School</h4>
              <p className="text-xs text-slate-300">Gatura Town, Gatanga, Murang'a County</p>
            </div>

            <a
              href="https://maps.app.goo.gl/oq7iHDB4f6vS2P868"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-xl flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
