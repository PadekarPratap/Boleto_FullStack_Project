import { useQuery } from "@tanstack/react-query";
import axios from "../api/api";

const getMovie = async (movieId) => {
  const { data } = await axios.get(`/api/movies/${movieId}/`);
  return data;
};

const useMovieDetails = (movieId) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovie(movieId),
  });

  return { data, isLoading, isError, error, refetch };
};
export default useMovieDetails;
