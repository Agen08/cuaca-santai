
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
    <div className="min-h-screen w-full py-8 px-4 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Cloud background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="cloud cloud-1 absolute top-[10%] left-[5%] w-24 h-24 bg-white rounded-full opacity-70"></div>
        <div className="cloud cloud-2 absolute top-[20%] left-[25%] w-32 h-32 bg-white rounded-full opacity-80"></div>
        <div className="cloud cloud-3 absolute top-[15%] right-[15%] w-28 h-28 bg-white rounded-full opacity-75"></div>
        <div className="cloud cloud-4 absolute top-[45%] right-[10%] w-20 h-20 bg-white rounded-full opacity-60"></div>
        <div className="cloud cloud-5 absolute top-[60%] left-[15%] w-36 h-36 bg-white rounded-full opacity-65"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
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
