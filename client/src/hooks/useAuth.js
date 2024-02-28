import { useContext } from "react";
import { CreateAuthContext } from "../auth/AuthContext";

const useAuth = () => {
  const values = useContext(CreateAuthContext);
  return values;
};

export default useAuth;
