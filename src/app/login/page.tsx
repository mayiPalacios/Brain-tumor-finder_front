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
import Swal from "sweetalert2";
import { InputError } from "@/interfaces/input-error";
import { LoadingButton } from "@/components/loading-button";

const Page = ({}) => {
  const [email, setEmail] = useState<InputError>({
    value: "",
    isCorrect: true,
  });
  const [password, setPassword] = useState<InputError>({
    value: "",
    isCorrect: true,
  });
  const isLoggedIn = useAuth();
  const [handleLogin, loading, error, resetError] = useLoading(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (loading) {
        return;
      }

      if (!(email.value && password.value)) {
        setPassword({ value: password.value, isCorrect: !!password.value });
        setEmail({ value: email.value, isCorrect: !!email.value });
        return;
      }

      if (!(password.isCorrect && email.isCorrect)) {
        return;
      }

      const formData = new FormData();
      formData.append("username", email.value);
      formData.append("password", password.value);
      const language = localStorage.getItem("lan");
      const response: IloginSuccess | undefined = await postLogin(
        formData,
        language!
      );
      if (response) {
        localStorage.setItem("loginToken", response.access_token);
        router.push("/results");
      }
    }
  );

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const { language } = navigator || window.navigator;
    localStorage.setItem("lan", language);
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
                className="d-flex align-items-center justify-content-center"
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
                <form className="form__login gap-4" onSubmit={handleLogin}>
                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <h2 className="">{t("login.login")}</h2>
                  </div>

                  <div
                    className={`d-flex flex-column  justify-content-center ${
                      email.isCorrect ? "" : "error"
                    }`}
                  >
                    <label htmlFor="">{t("login.email")}</label>
                    <input
                      type="email"
                      style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                      onChange={(e) => {
                        setEmail({
                          value: e.target.value,
                          isCorrect: !!e.target.value,
                        });
                      }}
                    />
                    <p className="error__message">
                      {!email.isCorrect && t("required.error")}
                    </p>
                  </div>
                  <div
                    className={`d-flex flex-column  justify-content-center ${
                      password.isCorrect ? "" : "error"
                    }`}
                  >
                    <label htmlFor="">{t("login.password")}</label>
                    <input
                      type="password"
                      onChange={(e) => {
                        setPassword({
                          value: e.target.value,
                          isCorrect: !!e.target.value,
                        });
                      }}
                      style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                    />
                    <p className="error__message">
                      {!password.isCorrect && t("required.error")}
                    </p>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <button className="d-flex align-items-center justify-content-center btn btn__login gap-2 text-uppercase">
                      {t("login.btn")}
                      {loading && <LoadingButton />}
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
