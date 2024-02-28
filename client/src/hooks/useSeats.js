import { useQuery } from "@tanstack/react-query";
import axios from "../api/api";

const getSeats = async (theatre_id, movie_id) => {
  const { data } = await axios.get(
    `/api/seats/?theatre=${theatre_id}&movie=${movie_id}`
  );

  return data;
};

const useSeats = (theatre_id, movie_id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["seats", theatre_id, movie_id],
    queryFn: () => getSeats(theatre_id, movie_id),
  });

  return { data, isLoading, isError, error };
};
export default useSeats;
