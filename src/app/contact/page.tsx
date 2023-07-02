"use client";
import Navbar from "@/components/navbar";
import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { AuthProvider } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { IContactUsPost } from "@/interfaces/contact-us";
import { postContactUs } from "@/tools/axiosMethod";
import { LoadingScreen } from "@/components/loading";
import Swal from "sweetalert2";
import useLoading from "@/hooks/useLoader";
import { InputError } from "@/interfaces/input-error";

const Page = ({ }) => {
  const { t, i18n } = useTranslation();
  const [subject, setSubject] = useState<InputError>({ value: "", isCorrect: true });
  const [content, setContent] = useState<InputError>({ value: "", isCorrect: true });
  const [name, setName] = useState<InputError>({ value: "", isCorrect: true });
  const [email, setEmail] = useState<InputError>({ value: "", isCorrect: true });
  const [toggleHandler, loading, error, resetError] = useLoading(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!(subject.value && email.value && name.value && content.value)) {
        setName({ value: name.value, isCorrect: !!name.value })
        setEmail({ value: email.value, isCorrect: !!email.value })
        setSubject({ value: subject.value, isCorrect: !!subject.value })
        setContent({ value: content.value, isCorrect: !!content.value })
        return;
      }

      if (!(subject.isCorrect && email.isCorrect && name.isCorrect && content.isCorrect)) {
        return
      }

      const emailToSent: IContactUsPost = {
        content: content.value,
        subject: subject.value,
        email: email.value,
        name: name.value
      };
      const response = await postContactUs(emailToSent);
      handleOnSuccess(response.message);
    }
  );

  useEffect(() => {
    const { language } = navigator || window.navigator;
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [i18n]);

  const handleOnFail = (message: string) => {
    Swal.fire({
      title: message,
      icon: "error",
      confirmButtonText: "Accept",
    });
    resetError()
  };

  const handleOnSuccess = (message: string) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: "Accept",
    });
    resetError()
    setName({ value: "", isCorrect: true })
    setEmail({ value: "", isCorrect: true })
    setSubject({ value: "", isCorrect: true })
    setContent({ value: "", isCorrect: true })
  };

  if (error) {
    handleOnFail(error.message);
    return <></>;
  }

  return (
    <AuthProvider>
      <div className="container__main">
        <Navbar />
        <main className="container__elements--contact">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-12 text-center mb-4 container__title--contact">
              <h1>{t("contact.title")}</h1>
            </div>
            <div className="col-md-4">
              <Image
                height={400}
                width={500}
                alt=""
                src="https://www.signpost.com/wp-content/uploads/2021/11/call-center-customer-service-tips-scaled.jpeg"
                className="img-fluid"
              />
            </div>
            <div className="col-md-5">
              <form onSubmit={toggleHandler}>
                <div className={`mb-3 ${name.isCorrect ? "" : "error"}`}>
                  <label htmlFor="username" className="form-label">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    onChange={(e) => {
                      setName({ value: e.target.value, isCorrect: !!e.target.value })
                    }}
                  />
                  <p className="error__message">{!name.isCorrect && t("required.error")}</p>
                </div>
                <div className={`mb-3 ${email.isCorrect ? "" : "error"}`}>
                  <label htmlFor="email" className="form-label">
                    {t("login.email")}
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={(e) => {
                      setEmail({ value: e.target.value, isCorrect: !!e.target.value })
                    }}
                  />
                  <p className="error__message">{!email.isCorrect && t("required.error")}</p>
                </div>
                <div className={`mb-3 ${subject.isCorrect ? "" : "error"}`}>
                  <label htmlFor="subject" className="form-label">
                    {t("contact.subject")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    onChange={(e) => {
                      setSubject({ value: e.target.value, isCorrect: !!e.target.value })
                    }}
                  />
                  <p className="error__message">{!subject.isCorrect && t("required.error")}</p>
                </div>
                <div className={`mb-3 ${content.isCorrect ? "" : "error"}`}>
                  <label htmlFor="message" className="form-label">
                    {t("contact.message")}
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows={5}
                    onChange={(e) => {
                      setContent({ value: e.target.value, isCorrect: !!e.target.value })
                    }}
                  />
                  <p className="error__message">{!content.isCorrect && t("required.error")}</p>
                </div>
                <button type="submit" className="btn btn-primary">
                  {!loading ? t("contact.btn") : <LoadingScreen />}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </AuthProvider>
  );
};

export default memo(Page);
