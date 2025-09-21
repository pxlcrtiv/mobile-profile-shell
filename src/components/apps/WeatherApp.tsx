import { useState, useEffect } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer } from 'lucide-react';

interface WeatherAppProps {
  onBack: () => void;
}

export const WeatherApp = ({ onBack }: WeatherAppProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock weather data
  const currentWeather = {
    location: 'New York',
    temperature: 72,
    condition: 'Partly Cloudy',
    high: 78,
    low: 65,
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    uvIndex: 6
  };

  const hourlyForecast = [
    { time: '12 PM', temp: 72, icon: Sun },
    { time: '1 PM', temp: 74, icon: Sun },
    { time: '2 PM', temp: 75, icon: Cloud },
    { time: '3 PM', temp: 73, icon: CloudRain },
    { time: '4 PM', temp: 71, icon: CloudRain },
    { time: '5 PM', temp: 69, icon: Cloud },
  ];

  const weeklyForecast = [
    { day: 'Today', high: 78, low: 65, icon: Sun },
    { day: 'Tue', high: 75, low: 62, icon: CloudRain },
    { day: 'Wed', high: 73, low: 60, icon: CloudRain },
    { day: 'Thu', high: 76, low: 63, icon: Cloud },
    { day: 'Fri', high: 79, low: 66, icon: Sun },
    { day: 'Sat', high: 81, low: 68, icon: Sun },
    { day: 'Sun', high: 77, low: 64, icon: Cloud },
  ];

  return (
    <MobileScreen title="Weather" onBack={onBack}>
      <div className="space-y-6">
        {/* Current Weather */}
        <div className="text-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl p-6 backdrop-blur-sm border border-white/10">
          <h2 className="text-2xl font-light mb-2">{currentWeather.location}</h2>
          <div className="text-7xl font-thin mb-4">{currentWeather.temperature}°</div>
          <div className="text-lg text-white/80 mb-4">{currentWeather.condition}</div>
          <div className="flex justify-center space-x-4 text-white/70">
            <span>H: {currentWeather.high}°</span>
            <span>L: {currentWeather.low}°</span>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-sm font-medium mb-3 text-white/70">HOURLY FORECAST</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 min-w-[60px]">
                <span className="text-xs text-white/70">{hour.time}</span>
                <hour.icon className="w-6 h-6 text-yellow-400" />
                <span className="text-sm font-medium">{hour.temp}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-sm font-medium mb-3 text-white/70">7-DAY FORECAST</h3>
          <div className="space-y-3">
            {weeklyForecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm w-12">{day.day}</span>
                <div className="flex items-center space-x-3 flex-1 justify-center">
                  <day.icon className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex space-x-2 text-sm">
                  <span className="w-8 text-right">{day.high}°</span>
                  <span className="w-8 text-right text-white/50">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-white/70">HUMIDITY</span>
            </div>
            <div className="text-2xl font-light">{currentWeather.humidity}%</div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Wind className="w-5 h-5 text-green-400" />
              <span className="text-sm text-white/70">WIND</span>
            </div>
            <div className="text-2xl font-light">{currentWeather.windSpeed} mph</div>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-white/70">VISIBILITY</span>
            </div>
            <div className="text-2xl font-light">{currentWeather.visibility} mi</div>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Sun className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-white/70">UV INDEX</span>
            </div>
            <div className="text-2xl font-light">{currentWeather.uvIndex}</div>
          </div>
        </div>
      </div>
    </MobileScreen>
  );
};