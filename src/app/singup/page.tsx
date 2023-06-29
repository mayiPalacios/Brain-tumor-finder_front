"use client";
import Navbar from "@/components/navbar";
import { memo, useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { Isingup } from "@/interfaces/singup";
import { postRegister } from "@/tools/axiosMethod";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

import { useTranslation } from "react-i18next";
import useLoading from "@/hooks/useLoader";
import { LoadingScreen } from "@/components/loading";

const Page = ({}) => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setName] = useState("");
  const [lastname, setLname] = useState("");
  const [correctPass, setCorrectPass] = useState(false);
  const [carnet, setCarnet] = useState("");
  const [country, setCountry] = useState("");
  const [confirmPass, setConfirmP] = useState("");
  const [
    handleClickRegister,
    registerLoading,
    registerError,
    resetRegisterError,
  ] = useLoading(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPass) {
      return setCorrectPass(true);
    }

    const user: Isingup = {
      email: email,
      first_name: firstName,
      last_name: lastname,
      carnet: carnet,
      country: country,
      password: password,
    };

    await postRegister(user);
    handleOnRegisterSuccess(t("signup.success"));
    setEmail("");
    setName("");
    setLname("");
    setCountry("");
    setPassword("");
    setConfirmP("");
  });

  const isLoggedIn = useAuth();
  const router = useRouter();

  useEffect(() => {
    const { language } = navigator || window.navigator;
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [i18n]);

  if (isLoggedIn) {
    router.push("/");
  }

  const handleOnRegisterFail = (message: string) => {
    Swal.fire({
      title: message,
      icon: "error",
      confirmButtonText: "Accept",
    });
    resetRegisterError();
  };

  const handleOnRegisterSuccess = (message: string) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: "Accept",
    });
    resetRegisterError();
  };

  if (registerError) {
    handleOnRegisterFail(registerError.message);
    return <></>;
  }

  return (
    <div className="container-fluid p-0">
      {isLoggedIn ? (
        ""
      ) : (
        <div className="container-fluid p-0">
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
                <form
                  className="form__login   gap-4"
                  onSubmit={handleClickRegister}
                >
                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <h2 className="">{t("signup.register")}</h2>
                  </div>

                  <div className="d-flex gap-5">
                    <div className="d-flex flex-column gap-3">
                      <label htmlFor="">{t("signup.firtsN")}</label>
                      <input
                        value={firstName}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="d-flex flex-column gap-3">
                      <label htmlFor="">{t("signup.lastN")}</label>
                      <input
                        value={lastname}
                        type="text"
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </div>
                  </div>

                  <label htmlFor="">{t("login.email")}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                  />

                  <label htmlFor="">{t("signup.cards")}</label>
                  <input
                    type="text"
                    value={carnet}
                    style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                    onChange={(e) => setCarnet(e.target.value)}
                  />

                  <div className="d-flex flex-column gap-3">
                    <label htmlFor="">{t("signup.Country")}</label>
                    <input
                      type="text"
                      value={country}
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
                        value={password}
                        minLength={4}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-flex flex-column gap-3">
                      <label htmlFor="">{t("signup.passConfirm")}</label>
                      <input
                        type="password"
                        value={confirmPass}
                        minLength={4}
                        onChange={(e) => setConfirmP(e.target.value)}
                        required
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
                    <button className="btn btn__login" type="submit">
                      {!registerLoading ? (
                        t("header.signUp")
                      ) : (
                        <LoadingScreen />
                      )}
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
