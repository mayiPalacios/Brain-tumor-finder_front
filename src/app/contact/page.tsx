"use client";
import { useState } from "react";
import Navbar from "@/components/navbar";
import { memo } from "react";
import Image from "next/image";
import { IContactUsPost } from "@/interfaces/contact-us";
import { postContactUs } from "@/tools/axiosMethod";

const page = ({ }) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const sendToSupportMessag = async () => {
    const emailToSent: IContactUsPost = { content, subject, email, name };
    try {
      const { success } = await postContactUs(emailToSent);
      if (!success) {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleContactUs = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendToSupportMessag();
  };

  return (
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
            <form onSubmit={handleContactUs}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">
                  Asunto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Mensaje
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows={5}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default memo(page);
