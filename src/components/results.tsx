"use client";

import Image from "next/image";
import { useState, useEffect, useContext, FormEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { MouseEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useAuthNot from "@/hooks/useAuthNot";
import { Typeahead } from "react-bootstrap-typeahead";
import { useTranslation } from "react-i18next";
import React, { ChangeEvent } from "react";
import { Ievaluate, IdiagnosticsResult } from "@/interfaces/evaluate";
import { error } from "console";

const Results = () => {
  type User = {
    first_name: string;
    last_name: string;
    gender: string;
    country: string;
    id: number;
    email: string;
    birthday: string;
  };

  type UserOption = User;
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState<UserOption[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [fileEnd, setFile] = useState<File>();
  const isnotLog = useAuthNot();
  const [comment, setComment] = useState<string>();
  const isLoggedIn = useAuth();
  const [validateR, setValidateR] = useState<number>();
  const router = useRouter();
  const [analyzerA, setAnalizerA] = useState(false);
  const [reg, setReg] = useState<IdiagnosticsResult>();
  const [showResults, setShowResults] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  if (isnotLog) {
    router.push("/login");
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(event.target.files?.[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
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

  const [newRegister, setNewRegister] = useState({
    is_approved: Number,
    remark: "",
  });

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const { language } = navigator || window.navigator;
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

  const handleSearch = (query: any) => {
    if (!query) {
      return;
    }

    axios
      .get(
        "https://btf-image-analyzer-api-production.up.railway.app/api/v1/patients/search?q=" +
          query,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("loginToken"),
          },
        }
      )
      .then((response) => {
        setUsers(response.data);
      });
  };

  const handleDiagnostic = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (fileEnd !== undefined) {
      formData.append("file", fileEnd);
    }

    axios
      .post(
        `https://btf-image-analyzer-api-production.up.railway.app/api/v1/${selected[0].id}/analyze`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("loginToken"),
          },
        }
      )
      .then((response) => {
        setReg(response.data);
        setAnalizerA(true);
      });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(
        "https://btf-image-analyzer-api-production.up.railway.app/api/v1/patients",
        newUser,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("loginToken"),
          },
        }
      )
      .then((response) => {
        setShowModal(false);
      });
  };

  const handleMakeReg = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newReg = {
      is_approved: validateR,
      remark: comment,
    };

    axios
      .patch(
        `https://btf-image-analyzer-api-production.up.railway.app/api/v1/diagnostics/${reg?.content.id}/evaluate`,
        newReg,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("loginToken"),
          },
        }
      )
      .then((response) => {
        setShowModal(false);
        window.alert("se pudo mija");
      })
      .catch((error) => {
        window.alert("no se pudo mija");
      });
  };

  const handleModal = () => {
    setShowResults(true);
  };

  const handleInputChange = (event: any) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  return (
    <div className="container__try container__results d-flex justify-content-center align-items-center">
      {isLoggedIn ? (
        <div className="container__try container__results d-flex justify-content-center align-items-center">
          <Image
            alt=""
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
                <h4>Elige el archivo</h4>
                <div className="mt-1 mb-2">
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    name="archivo"
                    onChange={handleFileChange}
                  />
                </div>

                <button
                  className="btn__file btn btn-primary"
                  onClick={handleModal}
                >
                  Subir archivo
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

              <div className="d-flex gap-5">
                {imageURL && (
                  <img
                    height={400}
                    width={400}
                    className="rounded"
                    src={imageURL}
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
                      onChange={(selected: any[]) => setSelected(selected)}
                      options={users}
                      placeholder="Busca un usuario..."
                      allowNew={true}
                      newSelectionPrefix="Crear paciente: "
                    />

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Crear paciente</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                          <Form.Group controlId="formBasicFirstName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                              type="text"
                              name="first_name"
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="formBasicLastName">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                              type="text"
                              name="last_name"
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="formBasicGender">
                            <Form.Label>Género</Form.Label>
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
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="formBasicBirthday">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control
                              type="date"
                              name="birthday"
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                          >
                            Crear
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
                            className="btn_approved_denied"
                            onClick={() => setValidateR(1)}
                          >
                            <img src="/aprobar.png" alt="" />
                          </button>

                          <button
                            className="btn_approved_denied"
                            onClick={() => setValidateR(0)}
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
                    className="btn btn-secondary  btn__register"
                    onClick={handleMakeReg}
                  >
                    {t("results.btn")}
                  </button>
                )}
                {!analyzerA && (
                  <button
                    className="btn btn-secondary  btn__register"
                    onClick={handleDiagnostic}
                  >
                    analizar
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
