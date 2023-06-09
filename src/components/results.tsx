"use client";

import Image from "next/image";
import { useState, useEffect, FormEvent, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { MouseEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useAuthNot from "@/hooks/useAuthNot";
import { Typeahead } from "react-bootstrap-typeahead";
import { useTranslation } from "react-i18next";
import React, { ChangeEvent } from "react";
import { IdiagnosticsResult } from "@/interfaces/evaluate";
import useLoading from "@/hooks/useLoader";
import { BASE_URL } from "@/constants/base-url.constant";
import { Option } from "react-bootstrap-typeahead/types/types";
import Swal from "sweetalert2";
import { IfileValidate } from "@/interfaces/fileValidate";
import { LoadingButton } from "./loading-button";

const Results = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState<Option[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [fileEnd, setFile] = useState<File>();
  const [btnApproved, setApproved] = useState(false);
  const [btnDenied, setDenied] = useState(true);
  const isnotLog = useAuthNot();
  const [comment, setComment] = useState<string>();
  const isLoggedIn = useAuth();
  const [validateR, setValidateR] = useState<number>();
  const router = useRouter();
  const [analyzerA, setAnalizerA] = useState(false);
  const [reg, setReg] = useState<IdiagnosticsResult>();
  const [showResults, setShowResults] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const [
    handleUpdatePatientResult,
    resultLoading,
    resultError,
    resetResultError,
  ] = useLoading(async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newReg = {
      is_approved: validateR,
      remark: comment,
    };

    const loginToken = localStorage.getItem("loginToken") || "";
    if (newReg.is_approved !== undefined && newReg.remark !== undefined) {
      const language = localStorage.getItem("lan");
      await axios.patch(
        `${BASE_URL}/diagnostics/${reg?.content.id}/evaluate?lan=${language}`,
        newReg,
        {
          headers: { Authorization: `Bearer ${loginToken}` },
        }
      );
      setShowModal(false);
      handleOnUpdatePatientSuccess("Patient was validated successfully");
    } else {
      Swal.fire({
        title: t("results.alert"),
        icon: "error",
        confirmButtonText: t("register.btnAccept"),
      });
    }
  });

  const [handlePatient, patientsLoading, patientError, resetPatientError] =
    useLoading(async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const loginToken = localStorage.getItem("loginToken") || "";
      const language = localStorage.getItem("lan");
      const response = await axios.post(
        `${BASE_URL}/patients?lan=${language}`,
        newUser,
        {
          headers: { Authorization: `Bearer ${loginToken}` },
        }
      );
      setShowModal(false);
      handleOnPatientSuccess(response.data.message);
    });

  const [
    handleDiagnostic,
    diagnosticsLoading,
    diagnosticError,
    resetDiagnosticError,
  ] = useLoading(async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (fileEnd !== undefined) {
      formData.append("file", fileEnd);
    }
    const [patient] = selected;
    if (typeof patient === "string") {
      return;
    }

    const loginToken = localStorage.getItem("loginToken") || "";
    if (patient == undefined) {
      Swal.fire({
        title: t("results.alertPat"),
        icon: "error",
        confirmButtonText: t("register.btnAccept"),
      });
      return;
    }
    const response = await axios.post(
      `${BASE_URL}/${patient["id"]}/analyze`,
      formData,
      {
        headers: { Authorization: `Bearer ${loginToken}` },
      }
    );
    handleOnDiagnosticSuccess(`${t("results.succesAnalyze")}`);
    setReg(response.data);
    setAnalizerA(true);
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [handleSearch] = useLoading(
    async (query: string, _: React.ChangeEvent<HTMLInputElement>) => {
      if (!query) {
        return;
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current as NodeJS.Timeout);
      }
      const loginToken = localStorage.getItem("loginToken") || "";
      timerRef.current = setTimeout(async () => {
        const response = await axios.get(
          `${BASE_URL}/patients/search?q=${query}`,
          {
            headers: { Authorization: `Bearer ${loginToken}` },
          }
        );
        setUsers(response.data);
      }, 3000);
    }
  );

  if (isnotLog) {
    router.push("/login");
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(event.target.files?.[0]);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageDataURL = e.target?.result as string;
      setImageURL(imageDataURL);
    };
    if (file instanceof Blob) {
      reader.readAsDataURL(file);
    }
  };

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    gender: "F",
    country: "",
    email: "",
    birthday: "",
  });

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const { language } = navigator || window.navigator;
    localStorage.setItem("lan", language);
    if (language) {
      i18n.changeLanguage(language);
    }

    if (selected.length > 0 && (selected[0] as any).customOption) {
      setShowModal(true);
      setSelected([]);
    }
  }, [selected, i18n]);

  if (isnotLog) {
    router.push("/login");
  }

  const handleModal = async () => {
    const formData = new FormData();

    if (fileEnd !== undefined) {
      formData.append("file", fileEnd);
    }
    const loginToken = localStorage.getItem("loginToken") || "";
    const response: IfileValidate = await axios.post(
      `${BASE_URL}/validate`,
      formData,
      {
        headers: { Authorization: `Bearer ${loginToken}` },
      }
    );
    console.log(response.data.is_valid_mri_image);
    if (response.data.is_valid_mri_image) {
      setShowResults(true);
    } else {
      Swal.fire({
        title: t("results.imgAlert"),
        icon: "error",
        confirmButtonText: t("register.btnAccept"),
      });
      resetResultError();
    }
  };

  const handleInputChange = (event: any) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const handleOnDiagnosticFail = (message: string) => {
    Swal.fire({
      title: message,
      icon: "error",
      confirmButtonText: t("register.btnAccept"),
    });
    resetDiagnosticError();
  };

  const handleOnDiagnosticSuccess = (message: string) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: t("register.btnAccept"),
    });
    setShowModal(false);
    resetDiagnosticError();
  };

  if (diagnosticError) {
    handleOnDiagnosticFail(diagnosticError.message);
    return <></>;
  }
  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const handleOnPatientFail = (message: string) => {
    Swal.fire({
      title: message,
      icon: "error",
      confirmButtonText: t("register.btnAccept"),
    });
    resetPatientError();
  };

  const handleOnPatientSuccess = (message: string) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: t("register.btnAccept"),
    });
    resetPatientError();
  };

  if (patientError) {
    handleOnPatientFail(patientError.message);
    return <></>;
  }

  const handleOnUpdatePatientFail = (message: string) => {
    Swal.fire({
      title: message,
      icon: "error",
      confirmButtonText: t("register.btnAccept"),
    });
    resetResultError();
  };

  const handleOnUpdatePatientSuccess = (message: string) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: t("register.btnAccept"),
    });
    resetResultError();
  };

  if (resultError) {
    handleOnUpdatePatientFail(resultError.message);
    return <></>;
  }

  const handleBtnApproved = () => {
    setApproved(true);
    setDenied(true);
    setValidateR(1);
  };

  const handleBtnDenied = () => {
    setDenied(false);
    setApproved(false);

    setValidateR(0);
  };

  return (
    <div className="container__try container__results d-flex justify-content-center align-items-center">
      {isLoggedIn ? (
        <div className="container__try container__results d-flex justify-content-center align-items-center">
          <Image
            alt="Results"
            src="https://as.com/diarioas/imagenes/2020/07/30/actualidad/1596099304_781508_1596099506_noticia_normal.jpg"
            width="500"
            height="300"
            style={{
              position: "absolute",
              zIndex: -1,
              backgroundPosition: "25% 75%",
              width: "90%",
              height: "100%",
              opacity: "0.75",
            }}
          />
          {!showResults && (
            <div>
              <section className="container__select--file d-flex p-5 flex-column gap-4 ">
                <h4>{t("results.selectFile")}</h4>
                <div className="mt-1 mb-2">
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    name="archivo"
                    onChange={handleFileChange}
                  />
                </div>

                <button
                  className="btn__file btn__upload btn btn-primary"
                  onClick={handleModal}
                >
                  {t("results.btnImg")}
                </button>
              </section>
            </div>
          )}
          {showResults && (
            <section className="card d-flex p-5 flex-column gap-4">
              {analyzerA && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <h6>{t("results.results")}</h6>
                  <span>
                    {t("results.positiveR")} {reg?.content.positive_probability}
                  </span>
                  <span>
                    {t("results.negativeR")} {reg?.content.negative_probability}
                  </span>
                </div>
              )}

              <div className="container__analyze d-flex gap-5">
                {imageURL && (
                  <img
                    height={400}
                    width={400}
                    className="rounded"
                    src={imageURL}
                    alt="Image to analyze"
                  />
                )}

                <div className="d-flex flex-column gap-2">
                  <div>
                    <Typeahead
                      id="user-typeahead"
                      labelKey={(option) =>
                        typeof option === "string"
                          ? option
                          : `${option.first_name} ${option.last_name}`
                      }
                      onInputChange={handleSearch}
                      onChange={(selected: Option[]) => setSelected(selected)}
                      options={users}
                      placeholder="Busca un usuario..."
                      allowNew={true}
                      newSelectionPrefix="Crear paciente: "
                    />

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>{t("patientModal.title")}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={handlePatient}>
                          <Form.Group controlId="formBasicFirstName">
                            <Form.Label>{t("patientModal.name")}</Form.Label>
                            <Form.Control
                              type="text"
                              name="first_name"
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="formBasicLastName">
                            <Form.Label>
                              {t("patientModal.lastname")}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="last_name"
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="formBasicGender">
                            <Form.Label>{t("patientModal.gender")}</Form.Label>
                            <Form.Control
                              as="select"
                              name="gender"
                              onChange={handleInputChange}
                            >
                              <option value="F">Femenino</option>
                              <option value="M">Masculino</option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Group controlId="formBasicCountry">
                            <Form.Label>País</Form.Label>
                            <Form.Control
                              type="text"
                              name="country"
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>{t("patientModal.email")}</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="formBasicBirthday">
                            <Form.Label>
                              {t("patientModal.dateBirth")}
                            </Form.Label>
                            <Form.Control
                              type="date"
                              name="birthday"
                              max={dateString}
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                          >
                            {t("patientModal.create")}
                            {patientsLoading && <LoadingButton />}
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </div>

                  {analyzerA && (
                    <div>
                      <div>
                        <span>{t("results.validate")}</span>
                        <div className="d-flex gap-2">
                          <button
                            className={`btn_approved_denied  ${
                              btnApproved ? "btn_approved" : ""
                            }`}
                            onClick={handleBtnApproved}
                          >
                            <img src="/aprobar.png" alt="" />
                          </button>

                          <button
                            className={`btn_approved_denied  ${
                              btnDenied ? "" : "btn__denied"
                            }`}
                            onClick={handleBtnDenied}
                          >
                            <img src="/rechazado.png" alt="" />
                          </button>
                        </div>
                      </div>
                      <span>{t("results.comments")}</span>
                      <textarea
                        className="form-control"
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex  align-items-center justify-content-center">
                {analyzerA && (
                  <button
                    className="d-flex align-items-center justify-content-center btn btn-secondary btn__register gap-2 text-uppercase btn__analy"
                    onClick={handleUpdatePatientResult}
                  >
                    {t("results.btn")}
                    {resultLoading && <LoadingButton />}
                  </button>
                )}
                {!analyzerA && (
                  <button
                    className="d-flex btn__upload align-items-center justify-content-center btn btn-secondary btn__register gap-2 text-uppercase btn__analy"
                    onClick={handleDiagnostic}
                  >
                    {t("results.Analyze")}
                    {diagnosticsLoading && <LoadingButton />}
                  </button>
                )}
              </div>
            </section>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Results;
