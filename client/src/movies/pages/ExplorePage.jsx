import { Link } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import MovieCard from "../components/MovieCard";

const ExplorePage = () => {
  const { data: movies, isError, error, isLoading } = useMovies();

  // console.log(movies);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-secondary min-h-[calc(100vh-4rem)]">
      <div className="container">
        {movies?.data.length === 0 && (
          <div className="text-center text-4xl">
            No Movies Found
            <div className="text-blue-500 underline text-2xl mt-4">
              <Link to={"/"}>Home</Link>
            </div>
          </div>
        )}
        {isError ? (
          <div className="px-4 py-2 border border-red-500 bg-red-300 text-red-600">
            {error?.message || "Could not load the movies!"}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {movies?.data?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ExplorePage;
