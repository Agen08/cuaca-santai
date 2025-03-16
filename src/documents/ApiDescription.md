
# Dokumentasi API Aplikasi Cuaca Santai

## Deskripsi Proyek
Aplikasi Cuaca Santai adalah aplikasi web yang dibangun untuk memenuhi tugas implementasi API publik. Aplikasi ini memungkinkan pengguna di Indonesia untuk mencari informasi cuaca terkini di berbagai kota. Pengguna cukup memasukkan nama kota yang ingin dicek cuacanya, dan aplikasi akan menampilkan informasi seperti suhu, kondisi cuaca, kelembaban, dan kecepatan angin.

## Teknologi yang Digunakan
- **React.js**: Framework JavaScript untuk membangun antarmuka pengguna
- **TypeScript**: Superset dari JavaScript yang menambahkan tipe statis
- **Tailwind CSS**: Framework CSS utility-first untuk styling
- **shadcn/ui**: Komponen UI berbasis Radix UI dan Tailwind
- **Vite**: Build tool dan development server
- **WeatherAPI**: Public API untuk data cuaca

## Lokasi File API
File-file yang berhubungan dengan integrasi API berada di:
- `src/utils/weatherApi.ts`: Berisi fungsi-fungsi untuk mengambil data dari WeatherAPI, menerjemahkan kondisi cuaca, dan menentukan ikon yang sesuai.

## API yang Digunakan
Aplikasi ini menggunakan WeatherAPI (https://www.weatherapi.com/) sebagai sumber data cuaca.

### Deskripsi API
WeatherAPI adalah layanan API cuaca yang menyediakan data cuaca real-time dan prakiraan untuk lokasi di seluruh dunia. API ini dipilih karena:
- Menyediakan data yang akurat dan up-to-date
- Mendukung pencarian berdasarkan nama kota
- Memiliki tier gratis dengan batas penggunaan yang cukup untuk proyek ini
- Dokumentasi yang lengkap dan mudah dipahami

### Endpoint yang Digunakan
Aplikasi ini menggunakan endpoint Current Weather API dari WeatherAPI:

```
https://api.weatherapi.com/v1/current.json
```

#### Parameter Request:
- `key`: API key untuk autentikasi (44f5266bfe40457a816142806251603)
- `q`: Lokasi yang ingin dicari (nama kota, misalnya "Jakarta")
- `lang`: Bahasa untuk respons API (id - Bahasa Indonesia)

#### Contoh URL Request:
```
https://api.weatherapi.com/v1/current.json?key=44f5266bfe40457a816142806251603&q=Jakarta&lang=id
```

#### Bentuk Response:
Response dari API berupa data JSON yang berisi informasi cuaca. Struktur data yang digunakan dalam aplikasi ini adalah:

```typescript
interface WeatherData {
  location: {
    name: string;       // Nama kota
    region: string;     // Wilayah/provinsi
    country: string;    // Negara
    localtime: string;  // Waktu lokal
  };
  current: {
    temp_c: number;     // Suhu dalam Celsius
    condition: {
      text: string;     // Kondisi cuaca dalam teks
      icon: string;     // URL ikon cuaca
      code: number;     // Kode kondisi cuaca
    };
    humidity: number;   // Kelembaban dalam persen
    wind_kph: number;   // Kecepatan angin dalam km/jam
    feelslike_c: number; // Suhu yang dirasakan dalam Celsius
    last_updated: string; // Kapan data terakhir diperbarui
  };
}
```

#### Contoh Response:
```json
{
  "location": {
    "name": "Jakarta",
    "region": "Jakarta Raya",
    "country": "Indonesia",
    "lat": -6.2146,
    "lon": 106.8451,
    "tz_id": "Asia/Jakarta",
    "localtime_epoch": 1742137030,
    "localtime": "2025-03-16 21:57"
  },
  "current": {
    "last_updated_epoch": 1742136300,
    "last_updated": "2025-03-16 21:45",
    "temp_c": 27.0,
    "temp_f": 80.6,
    "is_day": 0,
    "condition": {
      "text": "Partly cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
      "code": 1003
    },
    "wind_mph": 11.2,
    "wind_kph": 18.0,
    "wind_degree": 259,
    "wind_dir": "W",
    "pressure_mb": 1009.0,
    "pressure_in": 29.8,
    "precip_mm": 0.03,
    "precip_in": 0.0,
    "humidity": 79,
    "cloud": 50,
    "feelslike_c": 29.6,
    "feelslike_f": 85.4,
    "windchill_c": 27.7,
    "windchill_f": 81.8,
    "heatindex_c": 30.8,
    "heatindex_f": 87.4,
    "dewpoint_c": 22.7,
    "dewpoint_f": 72.8,
    "vis_km": 7.0,
    "vis_miles": 4.0,
    "uv": 0.0,
    "gust_mph": 16.2,
    "gust_kph": 26.0
  }
}
```

### Implementasi API
Implementasi API dilakukan di file `src/utils/weatherApi.ts` dengan fungsi utama `fetchWeatherData` yang mengambil data cuaca dari API dan mengembalikannya dalam format yang digunakan oleh aplikasi.

```typescript
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
```

## Tampilan Aplikasi
Aplikasi memiliki desain minimalis dan responsif dengan tema cuaca. Komponen utama:

1. **Header**: Judul aplikasi "Cuaca Santai"
2. **Search Bar**: Kolom input untuk memasukkan nama kota dan tombol cari
3. **Weather Card**: Kartu yang menampilkan informasi cuaca dengan:
   - Ikon yang merepresentasikan kondisi cuaca
   - Nama kota, wilayah, dan negara
   - Suhu dalam Celsius
   - Kondisi cuaca (cerah, berawan, hujan, dll.)
   - Kelembaban dalam persen
   - Kecepatan angin dalam km/jam
4. **Background**: Animasi awan mengambang untuk memberikan nuansa cuaca

Tampilan responsif dan bekerja dengan baik di perangkat mobile maupun desktop. Menggunakan desain "glass morphism" dengan efek blur untuk card cuaca yang memberikan kesan modern.
