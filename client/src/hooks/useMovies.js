import { useQuery } from "@tanstack/react-query";
import axios from "../api/api";
import { useSearchParams } from "react-router-dom";

const getMovies = async (name, language, rating, genre) => {
  const { data } = await axios.get(
    `/api/movies/?name=${name}&genre=${genre}&language=${language}&rating=${rating}`
  );

  return data;
};

export const useMovies = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") || "";
  const language = searchParams.get("language") || "";
  const rating = searchParams.get("rating") || "";
  const genre = searchParams.get("genre") || "";

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["movies", name, language, rating, genre],
    queryFn: () => getMovies(name, language, rating, genre),
  });

  return { data, isLoading, isError, error, refetch };
};
