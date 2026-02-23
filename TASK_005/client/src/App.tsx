import { useEffect, useState } from "react";

type WeatherData = {
  location: { name: string; region: string; country: string };
  current: {
    temp_c: number;
    condition: { text: string; icon: string };
    humidity: number;
    wind_kph: number;
  };
};

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [bgColor, setBgColor] = useState("from-blue-500 to-sky-700");

  // load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // background color mapping
  const conditionToColor = (condition: string) => {
    condition = condition.toLowerCase();
    if (condition.includes("sun") || condition.includes("clear"))
      return "from-yellow-400 to-orange-500";
    if (condition.includes("rain"))
      return "from-blue-500 to-blue-800";
    if (condition.includes("cloud") || condition.includes("overcast"))
      return "from-gray-400 to-gray-700";
    if (condition.includes("snow"))
      return "from-sky-300 to-blue-400";
    if (condition.includes("mist") || condition.includes("fog"))
      return "from-gray-300 to-gray-500";
    return "from-blue-500 to-indigo-700";
  };

  const fetchWeather = async (city: string) => {
    console.log(city);
    if (!city) return;
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/get_weather", {
        method : "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: city }),
      });
      const data = await res.json();

      if (data?.data) {
        setWeather(data.data);
        setBgColor(conditionToColor(data.data.current.condition.text));

        const updated = [city, ...recentSearches.filter(c => c !== city)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(location.trim());
    setLocation("");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${bgColor} text-white transition-all duration-700`}
    >
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-4">Weather App</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex mb-4">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 px-3 py-2 rounded-l-md text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition"
          >
            Search
          </button>
        </form>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm mb-1 text-gray-200">Recent Searches:</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((city) => (
                <button
                  key={city}
                  onClick={() => fetchWeather(city)}
                  className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded-md text-sm"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && <p className="text-center animate-pulse">Loading...</p>}

        {/* Weather Data */}
        {weather && !loading && (
          <div className="animate-fadeIn mt-4 text-center space-y-2">
            <h2 className="text-2xl font-semibold">
              {weather.location.name}, {weather.location.country}
            </h2>
            <img
              src={weather.current.condition.icon}
              alt="weather icon"
              className="mx-auto"
            />
            <p className="text-5xl font-bold">{weather.current.temp_c}°C</p>
            <p className="text-lg">{weather.current.condition.text}</p>
            <div className="flex justify-center gap-4 mt-3 text-sm">
              <p>💧 {weather.current.humidity}%</p>
              <p>💨 {weather.current.wind_kph} km/h</p>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-6 text-sm text-white/70">
        Powered by Your Express Backend ⚡
      </footer>
    </div>
  );
}

export default App;