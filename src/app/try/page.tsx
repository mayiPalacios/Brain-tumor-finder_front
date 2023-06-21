"use client";
import Navbar from "@/components/navbar";
import { memo } from "react";
import Image from "next/image";
import { AuthProvider } from "@/contexts/AuthContext";
const page = ({}) => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <div className="container__try d-flex justify-content-center align-items-center">
          <Image
            alt=""
            src="https://as.com/diarioas/imagenes/2020/07/30/actualidad/1596099304_781508_1596099506_noticia_normal.jpg"
            width="500"
            height="300"
            style={{
              position: "absolute",
              zIndex: -1,
              backgroundPosition: "25% 75%",
              width: "90%",
              height: "100%",
              opacity: "0.75",
            }}
          />

          <section className="container__select--file d-flex p-5 flex-column gap-4 ">
            <h4>Elige el archivo</h4>
            <input type="file" name="archivo" />
            <button className="btn__file btn btn-primary">Subir archivo</button>
          </section>
        </div>
      </div>
    </AuthProvider>
  );
};

export default page;
