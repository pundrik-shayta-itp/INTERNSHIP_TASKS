import MovieComponent from "./Movie.component.tsx";

export default function MoviesContainer(props: any) {
  const { movies, startIndex, endIndex } = props;

  if (!movies || movies.length === 0) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-400 text-lg">
        Loading movies...
      </div>
    );
  }

  const visibleMovies = movies.slice(startIndex, endIndex + 1);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 bg-gray-900">
      {visibleMovies.map((movie: any, index: number) => (
        <MovieComponent
          key={movie.id || index}
          type={movie.type}
          primaryTitle={movie.primaryTitle}
          primaryImage={movie.primaryImage}
          startYear={movie.startYear}
          rating={movie.rating || {}}
        />
      ))}
    </div>
  );
}