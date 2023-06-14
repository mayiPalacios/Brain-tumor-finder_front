"use client";
import Navbar from "@/components/navbar";
import { memo } from "react";
import Image from "next/image";

const Page = ({}) => {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      <div className="row m-0">
        <div className="col-md-6 p-0">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh", width: "50vw" }}
          >
            <div
              style={{ height: "100%", width: "100%", position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Image
                  alt=""
                  src="https://as.com/diarioas/imagenes/2020/07/30/actualidad/1596099304_781508_1596099506_noticia_normal.jpg"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 p-0">
          <div className="d-flex align-items-center justify-content-center h-100">
            <form className="form__login   gap-4">
              <div className="w-100 d-flex align-items-center justify-content-center">
                <h2 className="">Register</h2>
              </div>

              <div className="d-flex gap-5">
                <div className="d-flex flex-column gap-3">
                  <label htmlFor="">firts name</label>
                  <input type="text" />
                </div>
                <div className="d-flex flex-column gap-3">
                  <label htmlFor="">firts lastname</label>
                  <input type="text" />
                </div>
              </div>

              <label htmlFor="">Email</label>
              <input
                type="email"
                style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
              />
              <div className="d-flex gap-3">
                <br />
                <input name="intereses" type="radio" value="rbipeliculas" />
                <label>F</label>
                <br />
                <input
                  name="intereses"
                  style={{ color: "#F7B114" }}
                  type="radio"
                  value="rbilibros"
                />
                <label>M</label>
              </div>

              <label htmlFor="">Doctors cards</label>
              <input
                type="text"
                style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
              />

              <div className="d-flex flex-column gap-3">
                <label htmlFor="">Country</label>
                <input
                  type="password"
                  style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                />
              </div>

              <div className="d-flex gap-5">
                <div className="d-flex flex-column gap-3">
                  <label htmlFor="">Password</label>
                  <input type="password" />
                </div>
                <div className="d-flex flex-column gap-3">
                  <label htmlFor="">password confirmation</label>
                  <input type="password" />
                </div>
              </div>

              <div className="w-100 d-flex align-items-center justify-content-center">
                <button className="btn btn__login">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
