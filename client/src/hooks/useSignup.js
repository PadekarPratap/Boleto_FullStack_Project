import { useMutation } from "@tanstack/react-query";
import axios from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const signup = async (values) => {
  const { data } = await axios.post("/api/auth/signup/", values);

  return data;
};

const useSignup = () => {
  const navigate = useNavigate();

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account created successfully! Please Login.");
      navigate("/login");
    },
  });

  return { mutate, isError, error, isPending };
};
export default useSignup;
