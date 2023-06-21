import Navbar from "@/components/navbar";
import { memo } from "react";
import Image from "next/image";
import { AuthProvider } from "@/contexts/AuthContext";

const page = ({}) => {
  return (
    <AuthProvider>
      <div className="container__main">
        <Navbar />
        <main className="container__elements--contact">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-12 text-center mb-4 container__title--contact">
              <h1>Contactanos para más información</h1>
            </div>
            <div className="col-md-4  ">
              <Image
                height={400}
                width={500}
                alt=""
                src="https://www.signpost.com/wp-content/uploads/2021/11/call-center-customer-service-tips-scaled.jpeg"
                className="img-fluid"
              />
            </div>
            <div className="col-md-5">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Nombre de Usuario
                  </label>
                  <input type="text" className="form-control" id="username" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Asunto
                  </label>
                  <input type="text" className="form-control" id="subject" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Mensaje
                  </label>
                  <textarea className="form-control" id="message" rows={5} />
                </div>
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </AuthProvider>
  );
};

export default memo(page);
