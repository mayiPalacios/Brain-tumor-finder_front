"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import "../../i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
export default function Home() {
  const { t, i18n } = useTranslation();

  const isLoggedIn = useAuth();
  useEffect(() => {
    const { language } = navigator || window.navigator;
    localStorage.setItem("lan", language);
    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);

  const router = useRouter();

  const handleTry = () => {
    if (isLoggedIn) {
      router.push("/results");
    } else {
      router.push("/login");
    }
  };

  return (
    <main>
      <Navbar />
      <section className="container__page--info ">
        <div
          className="title__home ml-3 d-flex align-items-center justify-content-center"
          style={{ width: "100%", marginLeft: "22px" }}
        >
          <h1>{t("home.title")}</h1>
        </div>

        <div className="d-flex align-items-end gap-4" style={{ width: "100%" }}>
          <div className="text-center section__text--firt pyramid-text d-flex flex-column gap-4 ">
            <h2>{t("home.generaldescription")}</h2>
            <p>{t("home.generalDescriptionP")}</p>
          </div>
        </div>
      </section>

      <section className="container__HomeSection--two container-fluid d-flex justify-content-center align-items-center py-5">
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-md-4 order-md-1">
            <h3
              style={{
                width: "100%",
              }}
              className="mb-4"
            >
              {t("home.description3")}
            </h3>
          </div>
          <div className="col-md-5 order-md-2">
            <Image
              height={400}
              width={500}
              alt=""
              src="https://i.pinimg.com/564x/3f/bb/c6/3fbbc65618bcb6f19ab5e6b86803be24.jpg"
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      <section className="container__HomeSection--three container-fluid d-flex justify-content-center align-items-center py-5">
        <div className="row justify-content-center align-items-center  text-center gap-2">
          <div className="col-md-6 order-md-1">
            <Image
              height={300}
              width={450}
              alt=""
              src="https://media-manager.noticiasaominuto.com/1920/naom_613f33a58169e.jpg"
            />
          </div>

          <div className="col-md-5 order-md-2 ">
            <h2
              style={{
                width: "100%",
                color: "#ffc107",
              }}
              className="mb-4"
            >
              {t("home.inviteDescription")}
            </h2>
            <button className="btn__home " onClick={handleTry}>
              <span>{t("home.btn")}</span>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
