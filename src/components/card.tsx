"use client";
import { Idiagnostics, IdiagnosticsContainer } from "@/interfaces/diagnostics";
import { analysRegister } from "@/tools/axiosMethod";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { LoadingScreen } from "./loading-screen";

const Card = () => {
  const [cardDiagnostic, setCardDiagnostic] = useState<IdiagnosticsContainer>();
  const [offset, setOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [viewM, setViewM] = useState<Idiagnostics>();
  const [loading, setLoading] = useState(false);
  const limit = 5;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const { language } = navigator || window.navigator;
    localStorage.setItem("lan", language);
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [i18n]);

  useEffect(() => {
    const axiosRegisters = async () => {
      setLoading(true);
      const response: IdiagnosticsContainer = await analysRegister(
        limit,
        offset
      );

      if (response) {
        setCardDiagnostic(response);
        setTotalItems(response.total);
      }
      setLoading(false);
    };
    axiosRegisters();
  }, [offset]);

  const handlePageClick = (newOffset: number) => {
    if (newOffset < 0) {
      return;
    }

    if (newOffset > totalItems) {
      return;
    }
    setOffset(newOffset);
  };

  const handleViewMore = (patient: Idiagnostics) => {
    setViewM(patient);
    setShowModal(true);
  };

  const getPageNumbers = () => {
    const pageCount = Math.ceil(totalItems / limit);
    const currentPage = Math.floor(offset / limit) + 1;
    const visiblePages = 5; // Cantidad de números de página visibles

    let startPage = currentPage - Math.floor(visiblePages / 2);
    if (startPage < 1) {
      startPage = 1;
    }

    let endPage = startPage + visiblePages - 1;
    if (endPage > pageCount) {
      endPage = pageCount;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const RenderPageNumber = () => {
    const pageNumbers = getPageNumbers();

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => handlePageClick(offset - limit)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pageNumbers.map((pageNumber) => (
            <li className="page-item" key={pageNumber}>
              <a
                className="page-link"
                href="#"
                onClick={() => handlePageClick((pageNumber - 1) * limit)}
              >
                {pageNumber}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={() => handlePageClick(offset + limit)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div>
      {showModal && (
        <div
          style={{ position: "relative", zIndex: "2" }}
          className="position-absolute position-relative container__viewMore container__results d-flex justify-content-center align-items-center"
        >
          <section className="card d-flex p-5 flex-column gap-4">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h3>
                {viewM?.patient.first_name} {viewM?.patient.last_name}
              </h3>
            </div>

            <div className="d-flex gap-5">
              <Image
                height={400}
                width={400}
                alt=""
                className="rounded"
                src={viewM?.image_url!}
              />

              <div className="d-flex flex-column gap-2">
                <div>
                  <div className="pb-2">
                    <h6>
                      {t("register.date")} <span>{viewM?.created_at}</span>
                    </h6>
                  </div>

                  <h6>{t("register.iaR")}</h6>
                  <div className="d-flex flex-column gap-2 pt-2">
                    <span>
                      {t("register.positive")}:{" "}
                      {viewM?.positive_probability &&
                        viewM.positive_probability * 100}
                      {"%"}
                    </span>
                    <span>
                      {t("register.negative")}:{" "}
                      {viewM?.negative_probability &&
                        viewM.negative_probability * 100}
                      {"%"}
                    </span>
                  </div>

                  <h6 className="pt-2 ">
                    {t("register.expert")}:{" "}
                    {viewM?.result_by_doctor && viewM?.result_by_doctor == 0
                      ? t("doctors.rejected")
                      : t("doctors.approved")}
                  </h6>

                  <h6 className="pt-1 ">{t("register.comment")}:</h6>
                  <p>{viewM?.remark && viewM.remark}</p>
                </div>
              </div>
            </div>
            <div className="d-flex  align-items-center justify-content-center">
              <button
                className="btn btn__upload btn-secondary  btn__register"
                onClick={handleCloseModal}
              >
                {t("register.btnAccept")}
              </button>
            </div>
          </section>
        </div>
      )}

      <div className="mt-3 mb-3 d-flex justify-content-center">
        <RenderPageNumber />
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <LoadingScreen />
        </div>
      ) : (
        <div className="position-relative row justify-content-center gap-4">
          {cardDiagnostic &&
            cardDiagnostic.items.map((diagnostic) => (
              <div
                key={diagnostic.id}
                className="card col-sm-6 col-md-4 col-lg-2 mb-4"
                style={{ position: "relative", zIndex: "1" }}
              >
                <div className="container__img-reg d-flex justify-content-center align-items-center ">
                  <img
                    className="card-img-top img img-thumbnail"
                    src={diagnostic.image_url}
                    alt="Imagen"
                    style={{ width: "250px", height: "250px" }}
                  />
                </div>

                <div className="card-body d-flex flex-column justify-content-center align-items-center  gap-3">
                  <div className="d-flex flex-column justify-content-center align-items-center  gap-2">
                    <h3>
                      {diagnostic.patient.first_name}{" "}
                      {diagnostic.patient.last_name}
                    </h3>
                    <span>{diagnostic.created_at}</span>
                    <span>
                      {diagnostic.result_by_doctor
                        ? t("doctors.approved")
                        : t("doctors.rejected")}
                    </span>
                    <span>
                      {" "}
                      {t("register.Results")}:
                      {diagnostic.positive_probability &&
                        diagnostic.positive_probability * 100}{" "}
                      {"%"}
                    </span>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewMore(diagnostic)}
                  >
                    {t("register.btnWatch")}
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default Card;
