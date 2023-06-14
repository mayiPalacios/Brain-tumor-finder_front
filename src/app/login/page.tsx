"use client";
import Navbar from "@/components/navbar";
import { memo, useState } from "react";
import Image from "next/image";
import { postLogin } from "@/tools/axiosMethod";
import { IloginPost, IloginSuccess } from "@/interfaces/login";
import { useRouter } from "next/navigation";

const Page = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleGetToken = async () => {
    const user: IloginPost = {
      email: email,
      password: password,
    };
    try {
      const response: IloginSuccess | undefined = await postLogin(user);
      if (response) {
        localStorage.setItem("loginToken", response.access_token);
      }

      router.push("/");
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    handleGetToken();
  };

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
                <h2 className="">Login</h2>
              </div>

              <label htmlFor="">Email</label>
              <input
                type="email"
                style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="">Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
              />
              <div className="w-100 d-flex align-items-center justify-content-center">
                <button className="btn btn__login" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
