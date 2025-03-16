
// Types for weather data
export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
    last_updated: string;
  };
}

// API key from the request (this is a public API key)
const API_KEY = "44f5266bfe40457a816142806251603";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

/**
 * Fetches weather data for a specific location
 * @param location Location to fetch weather data for
 * @returns Promise with weather data
 */
export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    // Build the API URL with the location parameter
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(location)}&lang=id`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

/**
 * Determines the appropriate weather icon based on condition
 * @param condition Weather condition text
 * @returns Icon name for Lucide React
 */
export const getWeatherIcon = (condition: string): string => {
  const lowercaseCondition = condition.toLowerCase();
  
  if (lowercaseCondition.includes("sunny") || 
      lowercaseCondition.includes("clear") || 
      lowercaseCondition.includes("cerah")) {
    return "sun";
  } else if (lowercaseCondition.includes("rain") || 
            lowercaseCondition.includes("hujan") || 
            lowercaseCondition.includes("shower")) {
    return "cloud-rain";
  } else if (lowercaseCondition.includes("thunder") || 
            lowercaseCondition.includes("petir")) {
    return "cloud-lightning";
  } else if (lowercaseCondition.includes("snow") || 
            lowercaseCondition.includes("salju")) {
    return "cloud-snow";
  } else if (lowercaseCondition.includes("fog") || 
            lowercaseCondition.includes("kabut") || 
            lowercaseCondition.includes("mist")) {
    return "cloud-fog";
  } else if (lowercaseCondition.includes("overcast") || 
            lowercaseCondition.includes("mendung")) {
    return "cloud";
  } else if (lowercaseCondition.includes("cloudy") || 
            lowercaseCondition.includes("berawan")) {
    return "cloud";
  } else if (lowercaseCondition.includes("drizzle") || 
            lowercaseCondition.includes("gerimis")) {
    return "cloud-drizzle";
  } else {
    return "cloud"; // Default to cloud icon
  }
};

/**
 * Translates common weather terms to Indonesian
 * @param condition Weather condition in English
 * @returns Indonesian translation if available, or original text
 */
export const translateWeatherCondition = (condition: string): string => {
  const translations: { [key: string]: string } = {
    "sunny": "Cerah",
    "clear": "Cerah",
    "partly cloudy": "Berawan Sebagian",
    "cloudy": "Berawan",
    "overcast": "Mendung",
    "mist": "Berkabut",
    "patchy rain possible": "Kemungkinan Hujan Tidak Merata",
    "patchy snow possible": "Kemungkinan Salju Tidak Merata",
    "patchy sleet possible": "Kemungkinan Hujan Es Tidak Merata",
    "patchy freezing drizzle possible": "Kemungkinan Gerimis Beku Tidak Merata",
    "thundery outbreaks possible": "Kemungkinan Badai Petir",
    "blowing snow": "Badai Salju",
    "blizzard": "Badai Salju Lebat",
    "fog": "Kabut",
    "freezing fog": "Kabut Beku",
    "patchy light drizzle": "Gerimis Ringan Tidak Merata",
    "light drizzle": "Gerimis Ringan",
    "freezing drizzle": "Gerimis Beku",
    "heavy freezing drizzle": "Gerimis Beku Lebat",
    "patchy light rain": "Hujan Ringan Tidak Merata",
    "light rain": "Hujan Ringan",
    "moderate rain at times": "Hujan Sedang Kadang-kadang",
    "moderate rain": "Hujan Sedang",
    "heavy rain at times": "Hujan Lebat Kadang-kadang",
    "heavy rain": "Hujan Lebat",
    "light freezing rain": "Hujan Beku Ringan",
    "moderate or heavy freezing rain": "Hujan Beku Sedang atau Lebat",
    "light sleet": "Hujan Es Ringan",
    "moderate or heavy sleet": "Hujan Es Sedang atau Lebat",
    "patchy light snow": "Salju Ringan Tidak Merata",
    "light snow": "Salju Ringan",
    "patchy moderate snow": "Salju Sedang Tidak Merata",
    "moderate snow": "Salju Sedang",
    "patchy heavy snow": "Salju Lebat Tidak Merata",
    "heavy snow": "Salju Lebat",
    "ice pellets": "Butiran Es",
    "light rain shower": "Hujan Ringan",
    "moderate or heavy rain shower": "Hujan Sedang atau Lebat",
    "torrential rain shower": "Hujan Deras",
    "light sleet showers": "Hujan Es Ringan",
    "moderate or heavy sleet showers": "Hujan Es Sedang atau Lebat",
    "light snow showers": "Hujan Salju Ringan",
    "moderate or heavy snow showers": "Hujan Salju Sedang atau Lebat",
    "light showers of ice pellets": "Hujan Butiran Es Ringan",
    "moderate or heavy showers of ice pellets": "Hujan Butiran Es Sedang atau Lebat",
    "patchy light rain with thunder": "Hujan Ringan dengan Petir Tidak Merata",
    "moderate or heavy rain with thunder": "Hujan Sedang atau Lebat dengan Petir",
    "patchy light snow with thunder": "Salju Ringan dengan Petir Tidak Merata",
    "moderate or heavy snow with thunder": "Salju Sedang atau Lebat dengan Petir"
  };

  // Return the translation if it exists, otherwise return the original
  return translations[condition.toLowerCase()] || condition;
};
