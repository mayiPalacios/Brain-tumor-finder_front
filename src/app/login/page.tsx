"use client";
import Navbar from "@/components/navbar";
import { useState } from "react";
import Image from "next/image";
import { postLogin } from "@/tools/axiosMethod";
import { IloginSuccess } from "@/interfaces/login";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useLoading from "@/hooks/useLoader";
import { LoadingScreen } from "@/components/loading";
import Swal from "sweetalert2";

const Page = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = useAuth();
  const [handleLogin, loading, error, resetError] = useLoading(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (loading) {
        return;
      }

      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      const response: IloginSuccess | undefined = await postLogin(formData);
      if (response) {
        localStorage.setItem("loginToken", response.access_token);
        router.push("/results");
      }
    }
  );

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const { language } = navigator || window.navigator;

    if (language) {
      i18n.changeLanguage(language);
    }
  }, [i18n]);

  const router = useRouter();

  if (isLoggedIn) {
    window.alert(isLoggedIn);
    router.push("/");
  }

  const handleOnFail = (message: string) => {
    Swal.fire({
      title: message,
      icon: "error",
      confirmButtonText: "Accept",
    });
    resetError();
  };

  if (error) {
    handleOnFail(error.message);
    return <></>;
  }

  return (
    <div className="container-fluid p-0">
      {isLoggedIn ? (
        ""
      ) : (
        <div className="container-fluid p-0">
          {" "}
          <Navbar />
          <div className="row m-0">
            <div className="hideImage col-md-6 p-0">
              <div
                className="  d-flex align-items-center justify-content-center"
                style={{ height: "100vh", width: "50vw" }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                  }}
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
            <div className="respon col-md-6 p-0">
              <div className="d-flex align-items-center justify-content-center h-100">
                <form className="form__login   gap-4" onSubmit={handleLogin}>
                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <h2 className="">{t("login.login")}</h2>
                  </div>

                  <label htmlFor="">{t("login.email")}</label>
                  <input
                    type="email"
                    style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <label htmlFor="">{t("login.password")}</label>
                  <input
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                  />
                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <button className="btn btn__login">
                      {!loading ? t("login.btn") : <LoadingScreen />}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
