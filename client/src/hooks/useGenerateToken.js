import { useMutation } from "@tanstack/react-query";
import axios from "../api/api";

const generateToken = async (values) => {
  const { data } = await axios.post("/api/auth/generate/", values);

  return data;
};

const useGenerateToken = () => {
  //   const { updateAccessToken } = useAuth();

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: generateToken,
    onSuccess: (data) => {
      console.log(data);
      //   updateAccessToken(data.access_token);
    },
  });

  return { mutate, isError, error, isPending };
};
export default useGenerateToken;
