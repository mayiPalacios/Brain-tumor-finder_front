import Navbar from "@/components/navbar";
import imgAproved from "../../IMG/aprobar.png";
import { memo } from "react";
import Image from "next/image";
import { AuthProvider } from "@/contexts/AuthContext";

const page = ({}) => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <div className="container__try container__results d-flex justify-content-center align-items-center">
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

          <section className="card d-flex p-5 flex-column gap-4">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h6>Resultados</h6>
              <span>probabilidad positiva 75.33%</span>
              <span>probabilidad negativa 24.67%</span>
            </div>
            <div className="d-flex gap-5">
              <img
                height={400}
                width={400}
                className="rounded"
                src="https://c8.alamy.com/compes/c96175/el-cerebro-normal-irm-c96175.jpg"
              />
              <div className="d-flex flex-column gap-2">
                <span>Nombre del paciente</span>
                <select className="form-control">
                  <option>nombre</option>
                </select>

                <div>
                  <span>Validar Resultados</span>
                  <div className="d-flex gap-2">
                    <button className="btn_approved_denied">
                      <img src="/aprobar.png" alt="" />
                    </button>

                    <button className="btn_approved_denied">
                      <img src="/rechazado.png" alt="" />
                    </button>
                  </div>
                </div>
                <span>Comentario</span>
                <textarea className="form-control" />
              </div>
            </div>
            <div className="d-flex  align-items-center justify-content-center">
              <button className="btn btn-secondary  btn__register">
                Guardar
              </button>
            </div>
          </section>
        </div>
      </div>
    </AuthProvider>
  );
};

export default page;
