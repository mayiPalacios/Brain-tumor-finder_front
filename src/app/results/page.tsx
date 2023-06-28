"use client";
import Navbar from "@/components/navbar";
import Results from "@/components/results";
import { AuthProvider } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";

const Page = ({ }) => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
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
      console.log(selected);
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
        <Results />
      </div>
    </AuthProvider>
  );
};

export default Page;
