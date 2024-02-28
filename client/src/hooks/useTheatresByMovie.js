import { useQuery } from "@tanstack/react-query";
import axios from "../api/api";

const getTheatres = async (movieId) => {
  const { data } = await axios.get(`/api/theatres/${movieId}`);

  return data;
};

const useTheatresByMovie = (movieId) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["theatres", movieId],
    queryFn: () => getTheatres(movieId),
  });

  return { data, isLoading, isError, error, refetch };
};
export default useTheatresByMovie;
