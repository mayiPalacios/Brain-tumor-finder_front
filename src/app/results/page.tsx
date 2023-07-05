"use client";
import Navbar from "@/components/navbar";
import Results from "@/components/results";
import { AuthProvider } from "@/contexts/AuthContext";

const Page = ({}) => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Results />
      </div>
    </AuthProvider>
  );
};

export default Page;
