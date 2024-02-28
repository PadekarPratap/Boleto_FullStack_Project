import { useMutation } from "@tanstack/react-query";
import axios from "../api/api";

const bookSeats = async (values) => {
  const { data } = await axios.post("/api/seats/", values);

  return data;
};

const useBookSeats = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: bookSeats,
  });

  return { mutate, isPending, isError, error };
};

export default useBookSeats;
