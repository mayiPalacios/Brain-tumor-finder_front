"use client";
import Navbar from "@/components/navbar";

import imgAproved from "../../IMG/aprobar.png";
import Image from "next/image";
import { AuthProvider } from "@/contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";
import { useTranslation } from "react-i18next";

const Page = ({}) => {
  type User = {
    first_name: string,
    last_name: string,
    gender: string,
    country: string,
    email: string,
    birthday: string,
  }
  type Option = string | User;
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState<Option[]>([]);
  const [showModal, setShowModal] = useState(false);
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
    if (language) {
      i18n.changeLanguage(language);
    }
    if (selected.length > 0 && (selected[0] as any).customOption) {
      setShowModal(true);
      setSelected([]);
    }
  }, [selected]);

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
        console.log(response);
        setUsers(response.data);
      });
  };

  const handleSubmit = (event: any) => {
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

  const handleInputChange = (event: any) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };
  return (
    <AuthProvider>
      <div>
        <Navbar />
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

          <section className="card d-flex p-5 flex-column gap-4">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h6>{t("results.results")}</h6>
              <span>{t("results.positiveR")} 75.33%</span>
              <span>{t("results.negativeR")} 24.67%</span>
            </div>

            <div className="d-flex gap-5">
              <img
                height={400}
                width={400}
                className="rounded"
                src="https://c8.alamy.com/compes/c96175/el-cerebro-normal-irm-c96175.jpg"
              />

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
                    onChange={(selected: Option[])=> setSelected(selected)}
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

                <div>
                  <span>{t("results.validate")}</span>
                  <div className="d-flex gap-2">
                    <button className="btn_approved_denied">
                      <img src="/aprobar.png" alt="" />
                    </button>

                    <button className="btn_approved_denied">
                      <img src="/rechazado.png" alt="" />
                    </button>
                  </div>
                </div>

                <span>{t("results.comments")}</span>
                <textarea className="form-control" />
              </div>
            </div>
            <div className="d-flex  align-items-center justify-content-center">
              <button className="btn btn-secondary  btn__register">
                {t("results.btn")}
              </button>
            </div>
          </section>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Page;
