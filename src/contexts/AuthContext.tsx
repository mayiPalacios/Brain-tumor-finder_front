"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextData {
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
  isnotLog: boolean;
  setIsnotLog: (isLoggedIn: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isnotLog, setIsnotLog] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("loginToken");
    if (session) {
      setLoggedIn(true);
      setIsnotLog(false);
    } else {
      setLoggedIn(false);
      setIsnotLog(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoggedIn, isnotLog, setIsnotLog(isLoggedIn) {} }}
    >
      {children}
    </AuthContext.Provider>
  );
}
