
import React from 'react';
import { 
  Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Wind, 
  Droplets, ThermometerSun, CloudFog, CloudDrizzle,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { WeatherData, getWeatherIcon } from "@/utils/weatherApi";

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  error: string | null;
  isLoading: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ 
  weatherData, 
  error,
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto mt-8 animate-pulse">
        <Card className="weather-card p-8 rounded-3xl">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 shimmer"></div>
            <div className="space-y-3 w-full">
              <div className="h-8 bg-gray-200 rounded-md shimmer w-1/2 mx-auto"></div>
              <div className="h-6 bg-gray-200 rounded-md shimmer w-3/4 mx-auto"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="h-20 bg-gray-200 rounded-lg shimmer"></div>
              <div className="h-20 bg-gray-200 rounded-lg shimmer"></div>
              <div className="h-20 bg-gray-200 rounded-lg shimmer"></div>
              <div className="h-20 bg-gray-200 rounded-lg shimmer"></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto mt-8">
        <Card className="weather-card p-8 rounded-3xl">
          <div className="flex flex-col items-center text-red-500">
            <AlertCircle className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">Lokasi tidak ditemukan</p>
            <p className="text-sm text-gray-500 mt-2">Silakan coba lokasi lain</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!weatherData) return null;

  const IconComponent = {
    sun: Sun,
    cloud: Cloud,
    'cloud-rain': CloudRain,
    'cloud-lightning': CloudLightning,
    'cloud-snow': CloudSnow,
    'cloud-fog': CloudFog,
    'cloud-drizzle': CloudDrizzle,
  }[getWeatherIcon(weatherData.current.condition.text)] || Cloud;

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <Card className="weather-card p-8 rounded-3xl">
        <div className="flex flex-col items-center">
          <div className="mb-6 floating">
            <IconComponent className="h-24 w-24 text-primary" />
          </div>
          
          <h2 className="text-2xl font-bold mb-1">{weatherData.location.name}</h2>
          <p className="text-gray-500 mb-6">{weatherData.location.region}, {weatherData.location.country}</p>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
              <ThermometerSun className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm text-gray-500">Suhu</p>
              <p className="text-xl font-semibold">{weatherData.current.temp_c}°C</p>
            </div>
            
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
              <Cloud className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm text-gray-500">Kondisi</p>
              <p className="text-xl font-semibold">{weatherData.current.condition.text}</p>
            </div>
            
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
              <Droplets className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm text-gray-500">Kelembaban</p>
              <p className="text-xl font-semibold">{weatherData.current.humidity}%</p>
            </div>
            
            <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
              <Wind className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm text-gray-500">Angin</p>
              <p className="text-xl font-semibold">{weatherData.current.wind_kph} km/h</p>
            </div>
          </div>
          
          <p className="text-xs text-gray-400 mt-6">
            Terakhir diperbarui: {new Date(weatherData.current.last_updated).toLocaleTimeString('id-ID')}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default WeatherDisplay;
