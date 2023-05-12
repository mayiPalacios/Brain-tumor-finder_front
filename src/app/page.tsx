import Navbar from "@/components/navbar";
import { Left } from "react-bootstrap/lib/Media";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="container__page--info ">
        <div
          className="ml-3 d-flex align-items-center justify-content-center"
          style={{ width: "100%", marginLeft: "32px" }}
        >
          <h1>Tu salud esta en buenas manos</h1>
        </div>

        <div
          className="d-flex flex-column-reverse align-items-end gap-4"
          style={{ width: "100%" }}
        >
          <div className="text-center pyramid-text d-flex flex-column gap-4 ">
            <h2
              style={{
                width: "588px",
                height: "133px",
              }}
            >
              No dejes que los tumores cerebrales te tomen por sorpresa: La IA
              te ayuda a detectar tumores cerebrales de temprana.
            </h2>
            <p
              style={{
                width: "588px",
                height: "133px",
              }}
            >
              La deteccion de tumores cerebrales mediante imagenes es un campo
              de investigacion en constante evolucion, y la aplicacion de
              tecnicas de Inteligencia Artificial IA en el area de la salud ha
              demostrado ser una herramienta prometedora para la precision y
              velciodad del diagnosticos
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
