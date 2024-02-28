import { useQuery } from "@tanstack/react-query";
import axios from "../api/api";

const getMovies = async () => {
  const { data } = await axios.get("/api/movies/");

  return data;
};

export const useMovies = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  return { data, isLoading, isError, error, refetch };
};
