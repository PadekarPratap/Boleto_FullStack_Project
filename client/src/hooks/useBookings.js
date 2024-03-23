import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "../api/api";

const getBookings = async (userId, accessToken) => {
  const { data } = await axios.get(`/api/bookings/?user=${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

const useBookings = () => {
  const { userId, accessToken } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookings", userId],
    queryFn: () => getBookings(userId, accessToken),
  });

  return { data, isError, isLoading, error };
};
export default useBookings;
