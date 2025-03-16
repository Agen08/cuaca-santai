
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface WeatherSearchProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch, isLoading }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex items-center space-x-2 glass p-1.5 rounded-full">
        <Input 
          type="text"
          placeholder="Masukkan nama kota... (contoh: Jakarta)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !location.trim()} 
          className="rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 px-5"
        >
          {isLoading ? (
            <div className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Cari
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default WeatherSearch;
