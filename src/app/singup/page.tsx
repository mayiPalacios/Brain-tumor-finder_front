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
import { InputError } from "@/interfaces/input-error";
import { LoadingButton } from "@/components/loading-button";

const Page = ({}) => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState<InputError>({
    value: "",
    isCorrect: true,
  });
  const [password, setPassword] = useState<InputError>({
    value: "",
    isCorrect: true,
  });
  const [firstName, setName] = useState<InputError>({
    value: "",
    isCorrect: true,
  });
  const [lastname, setLname] = useState<InputError>({
    value: "",
    isCorrect: true,
  });
  const [correctPass, setCorrectPass] = useState(false);
  const [carnet, setCarnet] = useState<InputError>({
    value: "",
    isCorrect: true,
  });
  const [country, setCountry] = useState<InputError>({
    value: "",
    isCorrect: true,
  });
  const [confirmPass, setConfirmP] = useState<InputError>({
    value: "",
    isCorrect: true,
  });
  const [
    handleClickRegister,
    registerLoading,
    registerError,
    resetRegisterError,
  ] = useLoading(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (registerLoading) {
      return;
    }

    if (
      !(
        password.value &&
        email.value &&
        firstName.value &&
        lastname.value &&
        country.value
      )
    ) {
      setName({ value: firstName.value, isCorrect: !!firstName.value });
      setLname({ value: lastname.value, isCorrect: !!lastname.value });
      setEmail({ value: email.value, isCorrect: !!email.value });
      setPassword({ value: password.value, isCorrect: !!password.value });
      setCountry({ value: country.value, isCorrect: !!country.value });
      setConfirmP({ value: confirmPass.value, isCorrect: !!confirmPass.value });
      setCarnet({ value: carnet.value, isCorrect: !!carnet.value });
      return;
    }

    if (
      !(
        password.isCorrect &&
        email.isCorrect &&
        firstName.isCorrect &&
        lastname.isCorrect &&
        country.isCorrect
      )
    ) {
      return;
    }

    if (password.value !== confirmPass.value) {
      return setCorrectPass(true);
    }

    const user: Isingup = {
      email: email.value,
      first_name: firstName.value,
      last_name: lastname.value,
      carnet: carnet.value,
      country: country.value,
      password: password.value,
    };

    await postRegister(user);
    handleOnRegisterSuccess(t("signup.success"));
    setEmail({ value: "", isCorrect: true });
    setName({ value: "", isCorrect: true });
    setLname({ value: "", isCorrect: true });
    setCountry({ value: "", isCorrect: true });
    setPassword({ value: "", isCorrect: true });
    setConfirmP({ value: "", isCorrect: true });
  });

  const isLoggedIn = useAuth();
  const router = useRouter();

  useEffect(() => {
    const { language } = navigator || window.navigator;
    localStorage.setItem("lan", language);
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
      confirmButtonText: t("register.btnAccept"),
    });
    resetRegisterError();
  };

  const handleOnRegisterSuccess = (message: string) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: t("register.btnAccept"),
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
                  className="form__login gap-4"
                  onSubmit={handleClickRegister}
                >
                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <h2 className="">{t("signup.register")}</h2>
                  </div>

                  <div className="d-flex gap-5">
                    <div
                      className={`d-flex flex-column gap-3 ${
                        firstName.isCorrect ? "" : "error"
                      }`}
                    >
                      <label htmlFor="">{t("signup.firstN")}</label>
                      <input
                        value={firstName.value}
                        type="text"
                        onChange={(e) => {
                          setName({
                            value: e.target.value,
                            isCorrect: !!e.target.value,
                          });
                        }}
                      />
                      <p className="error__message">
                        {!firstName.isCorrect && t("required.error")}
                      </p>
                    </div>
                    <div
                      className={`d-flex flex-column gap-3 ${
                        lastname.isCorrect ? "" : "error"
                      }`}
                    >
                      <label htmlFor="">{t("signup.lastN")}</label>
                      <input
                        value={lastname.value}
                        type="text"
                        onChange={(e) => {
                          setLname({
                            value: e.target.value,
                            isCorrect: !!e.target.value,
                          });
                        }}
                      />
                      <p className="error__message">
                        {!lastname.isCorrect && t("required.error")}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`d-flex flex-column gap-3 ${
                      email.isCorrect ? "" : "error"
                    }`}
                  >
                    <label htmlFor="">{t("login.email")}</label>
                    <input
                      type="email"
                      value={email.value}
                      onChange={(e) => {
                        setEmail({
                          value: e.target.value,
                          isCorrect: !!e.target.value,
                        });
                      }}
                      style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                    />
                    <p className="error__message">
                      {!email.isCorrect && t("required.error")}
                    </p>
                  </div>

                  <div
                    className={`d-flex flex-column gap-3 ${
                      carnet.isCorrect ? "" : "error"
                    }`}
                  >
                    <label htmlFor="">{t("signup.cards")}</label>
                    <input
                      type="text"
                      value={carnet.value}
                      style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                      onChange={(e) => {
                        setCarnet({
                          value: e.target.value,
                          isCorrect: !!e.target.value,
                        });
                      }}
                    />
                    <p className="error__message">
                      {!carnet.isCorrect && t("required.error")}
                    </p>
                  </div>

                  <div
                    className={`d-flex flex-column gap-3 ${
                      country.isCorrect ? "" : "error"
                    }`}
                  >
                    <label htmlFor="">{t("signup.Country")}</label>
                    <input
                      type="text"
                      value={country.value}
                      style={{ padding: "6px, 9px, 6px, 9px", width: "501px" }}
                      onChange={(e) => {
                        setCountry({
                          value: e.target.value,
                          isCorrect: !!e.target.value,
                        });
                      }}
                    />
                    <p className="error__message">
                      {!country.isCorrect && t("required.error")}
                    </p>
                  </div>

                  <div className="d-flex gap-5">
                    <div
                      className={`d-flex flex-column gap-3 ${
                        password.isCorrect ? "" : "error"
                      }`}
                    >
                      <label htmlFor="">{t("login.password")}</label>
                      <input
                        type="password"
                        value={password.value}
                        minLength={4}
                        onChange={(e) => {
                          setPassword({
                            value: e.target.value,
                            isCorrect: !!e.target.value,
                          });
                        }}
                        required
                      />
                      <p className="error__message">
                        {!password.isCorrect && t("required.error")}
                      </p>
                    </div>

                    <div
                      className={`d-flex flex-column gap-3 ${
                        confirmPass.isCorrect ? "" : "error"
                      }`}
                    >
                      <label htmlFor="">{t("signup.passConfirm")}</label>
                      <input
                        type="password"
                        value={confirmPass.value}
                        minLength={4}
                        onChange={(e) => {
                          setConfirmP({
                            value: e.target.value,
                            isCorrect: !!e.target.value,
                          });
                        }}
                        required
                      />
                      <p
                        style={{ color: "#fff" }}
                        className={`${correctPass ? "" : "alert-input error"}`}
                      >
                        {t("signup.differentPassword")}
                      </p>
                      <p className="error__message">
                        {!confirmPass.isCorrect && t("required.error")}
                      </p>
                    </div>
                  </div>

                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn__upload  btn__login btn__sign__up d-flex align-items-center justify-content-center gap-2 text-uppercase"
                      type="submit"
                    >
                      {t("header.signUp")}
                      {registerLoading && <LoadingButton />}
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
