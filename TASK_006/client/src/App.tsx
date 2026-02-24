import { useState, useEffect } from "react";
import MoviesContainer from "./components/moviesContainer.component.tsx";

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [movieArray, setMovieArray] = useState<Array<object>>([]);
  const [currentMovie, setCurrentMovie] = useState<string>("");
  const [pages, setPages] = useState<number>(1);

  const fetchRandomMovies = async () => {
    try {
      const apiResponse = await fetch(`http://localhost:8000/`);
      const data = await apiResponse.json();
      setCurrentPage(1);
      return data.data.titles;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoviesByTitle = async () => {
    try {
      const apiResponse = await fetch(
        `http://localhost:8000/titles/?query=${currentMovie}`
      );
      const data = await apiResponse.json();
      setCurrentPage(1);
      return data.data.titles;
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e: any) {
    setCurrentMovie(e.target.value);
  }

  useEffect(() => {
    const handler=setTimeout(async()=>{
      if(currentMovie.trim()===""){
        const res=await fetchRandomMovies();
        setMovieArray(res);
      }else{
        const res=await fetchMoviesByTitle();
        setMovieArray(res);
      }
    },500);
    
    return ()=>{
      clearTimeout(handler);
    }
  }, [currentMovie]);

  useEffect(() => {
    setPages(Math.ceil(movieArray.length / 10));
  }, [movieArray]);

  useEffect(() => {
    const getMovies = async () => {
      let res = await fetchRandomMovies();
      setMovieArray(res);
    };
    getMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center font-sans">
      <header className="w-full py-6 bg-gray-900 shadow-md text-center">
        <h2 className="text-2xl font-bold text-yellow-400 tracking-wide">
          🎬 Movie Search Web App
        </h2>
        <p className="text-gray-400 mt-1">Find and explore trending movies</p>
      </header>

      <div className="mt-6 w-full flex justify-center">
        <input
          type="text"
          name="movieSearchbar"
          value={currentMovie}
          id="movie-search-bar"
          placeholder="Search your movie here..."
          onChange={handleChange}
          className="w-3/4 sm:w-2/3 md:w-1/2 p-3 rounded-lg border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        />
      </div>

      <div className="w-full mt-8">
        <MoviesContainer
          movies={movieArray}
          startIndex={(currentPage - 1) * 10}
          endIndex={Math.min((currentPage - 1) * 10 + 9, movieArray.length - 1)}
        />
      </div>

      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() =>
            setCurrentPage((page) => Math.max(page - 1, 1))
          }
          className="px-4 py-2 bg-gray-800 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors duration-200"
        >
          ◀
        </button>

        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 rounded-lg border border-gray-700 ${
              currentPage === i + 1
                ? "bg-yellow-500 text-black font-semibold"
                : "bg-gray-800 hover:bg-gray-700"
            } transition-colors duration-200`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((page) => Math.min(page + 1, pages))
          }
          className="px-4 py-2 bg-gray-800 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors duration-200"
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default App;