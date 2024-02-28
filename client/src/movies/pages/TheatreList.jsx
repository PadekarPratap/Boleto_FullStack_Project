import { useParams } from "react-router-dom";
import useTheatresByMovie from "../../hooks/useTheatresByMovie";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import TheatreCard from "../components/TheatreCard";

const TheatreList = () => {
  const { movieId } = useParams();

  const {
    data: theatres,
    isLoading,
    isError,
    error,
  } = useTheatresByMovie(movieId);

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="w-full min-h-[calc(100vh-4rem)] bg-secondary">
        <div className="container">
          <p className="px-4 py-2 border border-red-500 bg-red-300 text-red-600">
            {error?.message || "Movie could not be loaded"}
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-secondary">
      <div className="container">
        <div className="space-y-5">
          {theatres?.data.map((theatre) => (
            <TheatreCard movieId={movieId} key={theatre.id} theatre={theatre} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TheatreList;
