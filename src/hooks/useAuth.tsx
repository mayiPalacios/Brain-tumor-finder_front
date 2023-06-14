import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
}
