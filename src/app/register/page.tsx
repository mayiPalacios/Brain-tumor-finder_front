import Navbar from "@/components/navbar";
import { memo } from "react";
import Image from "next/image";
import { AuthProvider } from "@/contexts/AuthContext";
import Card from "@/components/card";

const page = ({}) => {
  return (
    <AuthProvider>
      <div className="container__register">
        <Navbar />
        <div>
          <div className="container__tittle">
            <h2>Registro de uso de la IA</h2>
          </div>

          <Card />
        </div>
      </div>
    </AuthProvider>
  );
};

export default memo(page);
