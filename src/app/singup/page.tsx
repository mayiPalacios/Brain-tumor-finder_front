"use client";
import Navbar from "@/components/navbar";
import { memo, useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { Isingup, IsingupSucces } from "@/interfaces/singup";
import { postRegister } from "@/tools/axiosMethod";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

import { useTranslation } from "react-i18next";

const Page = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firtsName, setName] = useState("");
  const [lastname, setLname] = useState("");
  const [correctPass, setCorrectPass] = useState(false);
  const [error, setError] = useState<Error>();
  const [succesRegister, setSuccesR] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [carnet, setCarnet] = useState("");
  const [country, setCountry] = useState("");
  const [confirmPass, setConfirmP] = useState("");

  const isLoggedIn = useAuth();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const { language } = navigator || window.navigator;
    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);

  if (isLoggedIn) {
    router.push("/");
  }

  const handleSingup = async () => {
    const user: Isingup = {
      email: email,
      first_name: firtsName,
      last_name: lastname,
      carnet: carnet,
      country: country,
      password: password,
    };

    setIsLoading(true);
    try {
      const response: IsingupSucces | undefined = await postRegister(user);
      if (response) {
        return Swal.fire(
          "Hello!",
          "SweetAlert is working in Next.js!",
          "success"
        );
      }
    } catch (error) {
      if (error instanceof Error) console.log(error);
    }
    setIsLoading(false);
  };

  const handleClickRegister = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (password === confirmPass) {
      handleSingup();
    } else {
      setCorrectPass(true);
    }
  };

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
                <form className="form__login   gap-4">
                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <h2 className="">{t("signup.register")}</h2>
                  </div>

                  <div className="d-flex gap-5">
                    <div className="d-flex flex-column gap-3">
                      <label htmlFor="">{t("signup.firtsN")}</label>
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="d-flex flex-column gap-3">
                      <label htmlFor="">{t("signup.lastN")}</label>
                      <input
                        type="text"
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </div>
                  </div>

                  <label htmlFor="">{t("login.email")}</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                  />

                  <label htmlFor="">{t("signup.cards")}</label>
                  <input
                    type="text"
                    style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                    onChange={(e) => setCarnet(e.target.value)}
                  />

                  <div className="d-flex flex-column gap-3">
                    <label htmlFor="">{t("signup.Country")}</label>
                    <input
                      type="text"
                      style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>

                  <div className="d-flex gap-5">
                    <div className="d-flex flex-column gap-3">
                      <label htmlFor="">{t("login.password")}</label>
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="d-flex flex-column gap-3">
                      <label htmlFor="">{t("signup.passConfirm")}</label>
                      <input
                        type="password"
                        onChange={(e) => setConfirmP(e.target.value)}
                      />
                      <p
                        style={{ color: "#fff" }}
                        className={` ${correctPass ? "" : "alert-input"}  `}
                      >
                        Its different password
                      </p>
                    </div>
                  </div>

                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn__login"
                      type="submit"
                      onClick={(e) => handleClickRegister(e)}
                    >
                      {t("header.signUp")}
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

export default memo(Page);
