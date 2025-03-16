
import React, { useState } from 'react';
import WeatherSearch from '@/components/WeatherSearch';
import WeatherDisplay from '@/components/WeatherDisplay';
import { fetchWeatherData, WeatherData } from '@/utils/weatherApi';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async (location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError("Lokasi tidak ditemukan");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Lokasi tidak ditemukan. Silakan coba lokasi lain.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full py-8 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            Cuaca Santai
          </h1>
          <p className="text-gray-600">
            Cek cuaca terkini di kota Anda
          </p>
        </div>

        <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
        <WeatherDisplay 
          weatherData={weatherData} 
          error={error}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
