"use client";
import Navbar from "@/components/navbar";
import { memo, useContext, useEffect } from "react";
import Image from "next/image";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Try from "@/components/try";

const Page = () => {
  return (
    <AuthProvider>
      <div>
        <div>
          <Navbar />
          <Try />
        </div>
      </div>
    </AuthProvider>
  );
};

export default Page;
