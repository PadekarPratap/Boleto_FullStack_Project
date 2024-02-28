import { useNavigate, useParams } from "react-router-dom";
import useMovieDetails from "../../hooks/useMovieDetails";
import { formatDate } from "../../utils/helper";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/UIElements/Button";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const navigate = useNavigate();

  const { data: movie, isLoading, isError, error } = useMovieDetails(movieId);

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

  const movieDetails = movie?.data;
  const {
    image,
    name,
    description,
    release_data: releaseDate,
    rating,
    actors,
    director,
    language,
    genre,
    id,
  } = movieDetails;

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-secondary">
      <div className="container">
        <div className="grid md:grid-cols-2 justify-center gap-5 md:gap-2">
          <div>
            <img className="w-[20rem] mx-auto" src={image} alt={name} />
          </div>

          <div className="">
            <h1 className="text-4xl md:text-6xl font-bold">{name}</h1>
            <p className="tracking-wider mt-5 text-xl">{description}</p>
            <div className="mt-5 flex flex-col gap-4 text-2xl">
              <span className="text-black">Director: {director}</span>
              <span className="text-black">Actors: {actors}</span>
            </div>
            <div className="mt-5">
              <span className="px-4 py-2 rounded-full bg-teal-700 text-white">
                {genre}
              </span>
            </div>
            <div className="mt-5">
              <span>Release Date: {formatDate(releaseDate) || "NA"}</span>
            </div>
            <div className="mt-5">
              Language:{" "}
              <span className="px-4 py-2 rounded-full bg-slate-700 text-white">
                {language}
              </span>
            </div>
            <div className="mt-5 flex gap-5 items-center">
              <div>Rating: </div>
              <div className="h-10 w-10 flex text-sm justify-center items-center rounded-full bg-blue-800 text-white">
                {rating}
              </div>
            </div>
            <div className="mt-5">
              <Button
                variant="primary"
                onClick={() => navigate(`/book/${name}/${id}/theatres`)}
              >
                Book Tickets
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetailsPage;
