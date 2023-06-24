"use client";
import Navbar from "@/components/navbar";
import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { AuthProvider } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { IContactUsPost } from "@/interfaces/contact-us";
import { postContactUs } from "@/tools/axiosMethod";
import { LoadingScreen } from "@/components/loading";
import { useLoading } from "@rest-hooks/hooks";
import Swal from "sweetalert2";

const Page = ({ }) => {
  const { t, i18n } = useTranslation();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const [toggleHandler, loading] = useLoading(
    async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        const emailToSent: IContactUsPost = { content, subject, email, name };
        const { success } = await postContactUs(emailToSent);

        setIsSuccess(success);
        handleOnSuccess("Success message sent");
        return success;
      } catch (error) {
        setIsSuccess(false);
      }
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
    setIsSuccess(true);
  };

  const handleOnSuccess = (message: string) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: "Accept",
    });
    setIsSuccess(true);
  };

  if (!isSuccess) {
    handleOnFail("Request failed");
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
              <form onSubmit={toggleHandler}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    {t("login.email")}
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    {t("contact.subject")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    {t("contact.message")}
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows={5}
                    onChange={(e) => setContent(e.target.value)}
                  />
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
