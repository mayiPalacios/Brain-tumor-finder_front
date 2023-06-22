"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import "../../i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const { language } = navigator || window.navigator;
    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);

  return (
    <main>
      <Navbar />
      <section className="container__page--info ">
        <div
          className="title__home ml-3 d-flex align-items-center justify-content-center"
          style={{ width: "100%", marginLeft: "22px" }}
        >
          <h1>{t("home.title")}</h1>
        </div>

        <div className="d-flex align-items-end gap-4" style={{ width: "100%" }}>
          <div className="text-center section__text--firt pyramid-text d-flex flex-column gap-4 ">
            <h2>
              No dejes que los tumores cerebrales te tomen por sorpresa: La IA
              te ayuda a detectar tumores cerebrales de temprana.
            </h2>
            <p>
              La deteccion de tumores cerebrales mediante imagenes es un campo
              de investigacion en constante evolucion, y la aplicacion de
              tecnicas de Inteligencia Artificial IA en el area de la salud ha
              demostrado ser una herramienta prometedora para la precision y
              velciodad del diagnosticos
            </p>
          </div>
        </div>
      </section>

      <section className="container__HomeSection--two container-fluid d-flex justify-content-center align-items-center py-5">
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-md-4 order-md-1">
            <h3
              style={{
                width: "100%",
              }}
              className="mb-4"
            >
              La detección temprana de tumores cerebrales es crucial para el
              éxito del tratamiento y la supervivencia del paciente. La
              utilización de algoritmos de IA, como las redes neuronales
              convolucionales, puede ayudar a mejorar la precisión y eficacia de
              la detección de tumores cerebrales en las imágenes de resonancia
              magnética, además de reducir el tiempo y el costo de detección.
            </h3>
          </div>
          <div className="col-md-5 order-md-2">
            <Image
              height={400}
              width={500}
              alt=""
              src="https://i.pinimg.com/564x/3f/bb/c6/3fbbc65618bcb6f19ab5e6b86803be24.jpg"
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      <section className="container__HomeSection--three container-fluid d-flex justify-content-center align-items-center py-5">
        <div className="row justify-content-center align-items-center  text-center gap-2">
          <div className="col-md-6 order-md-1">
            <Image
              height={300}
              width={450}
              alt=""
              src="https://lh3.googleusercontent.com/f6D_TFUxHTDVj8Dm1G08dWHmnNS25ZHxfSoHkWY17XtLfvHBHpwvaSbb169vUXt7SMDHTqgrrHaAgwh53VwkwOS25b56lQfaBL__sQ2t"
            />
          </div>

          <div className="col-md-5 order-md-2 ">
            <h2
              style={{
                width: "100%",
                color: "#ffc107",
              }}
              className="mb-4"
            >
              La tecnología de vanguardia está en tus manos: únete a la
              detección temprana de tumores con la IA BrainTumorFinder.
            </h2>
            <button className="btn__home ">Quiero Probarlo</button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
