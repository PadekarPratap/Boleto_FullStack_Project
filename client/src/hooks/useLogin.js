import { useMutation } from "@tanstack/react-query";
import axios from "../api/api";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const loginUser = async (values) => {
  const { data } = await axios.post("/api/auth/login/", values);

  return data;
};

const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      //   console.log(data);
      toast.success("Login Successful");
      login(
        data.data.id,
        data.access_token,
        data.refresh_token,
        data.data.name
      );
      navigate("/");
    },
  });

  return { mutate, isPending, isError, error };
};
export default useLogin;
