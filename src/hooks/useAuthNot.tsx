import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function useAuthNot() {
  const { isnotLog } = useContext(AuthContext);
  return isnotLog;
}
