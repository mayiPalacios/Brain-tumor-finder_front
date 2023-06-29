"use client";
import { Idiagnostics, IdiagnosticsContainer } from "@/interfaces/diagnostics";
import { analysRegister } from "@/tools/axiosMethod";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Card = () => {
  const [cardDiagnostic, setCardDiagnostic] = useState<IdiagnosticsContainer>();
  const [offset, setOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [viewM, setViewM] = useState<Idiagnostics>();
  const limit = 5;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const { language } = navigator || window.navigator;
    window.alert(language);
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [i18n]);

  useEffect(() => {
    const axiosRegisters = async () => {
      const response: IdiagnosticsContainer = await analysRegister(
        limit,
        offset
      );

      if (response) {
        setCardDiagnostic(response);
        setTotalItems(response.total);
      }
    };
    axiosRegisters();
  }, [offset]);

  const handlePageClick = (newOffset: number) => {
    if (newOffset < 0) {
      return
    }

    if (newOffset > totalItems) {
      return
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
                  <h6>Fecha:{viewM?.created_at}</h6>
                  <h6>Resultado de la IA</h6>
                  <span>
                    probabilidad positiva:
                    {viewM?.positive_probability &&
                      viewM.positive_probability * 100}
                  </span>
                  <span>
                    Probabilidad negativa:
                    {viewM?.negative_probability &&
                      viewM.negative_probability * 100}
                  </span>

                  <h6>
                    Verificacion de experto:
                    {viewM?.result_by_doctor && viewM?.result_by_doctor == 0
                      ? t('doctors.rejected')
                      : t('doctors.approved')
                    }
                  </h6>
                  <p>Comentario de experto:{viewM?.remark && viewM.remark}</p>
                </div>
              </div>
            </div>
            <div className="d-flex  align-items-center justify-content-center">
              <button
                className="btn btn-secondary  btn__register"
                onClick={handleCloseModal}
              >
                Aceptar
              </button>
            </div>
          </section>
        </div>
      )}

      <div className="mt-3 mb-3 d-flex justify-content-center ">
        <RenderPageNumber />
      </div>

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

              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h3>
                    {diagnostic.patient.first_name}{" "}
                    {diagnostic.patient.last_name}
                  </h3>
                  <span>{diagnostic.created_at}</span>
                  <span>{diagnostic.result_by_doctor ? t('doctors.approved') : t('doctors.rejected')}</span>
                  <span>resultados:{diagnostic.positive_probability}</span>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewMore(diagnostic)}
                >
                  VER MAS
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Card;
