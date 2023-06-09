import { IloginPost, IloginSuccess } from "@/interfaces/login";
import { get, post } from "./axiosConnect";
import axios, { AxiosResponse } from "axios";
import {
  IContactUsPost,
  IContactUsPostResponse,
} from "@/interfaces/contact-us";
import { Isingup, IsingupSucces } from "@/interfaces/singup";
import { Idiagnostics } from "@/interfaces/diagnostics";
import { IuserSucces } from "@/interfaces/user";

const BASE_URL = `https://btf-image-analyzer-api-production.up.railway.app`;

export const postLogin = async (userData: FormData, lan: string) => {
  const req = await axios.post(
    `https://btf-image-analyzer-api-production.up.railway.app/api/v1/auth/login?lan=${lan}`,
    userData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return req.data;
};

export const postContactUs = async (contactUsDto: IContactUsPost) => {
  const response = await axios.post(`${BASE_URL}/api/v1/contact`, contactUsDto);
  return response.data;
};

export const postRegister = async (userD: Isingup) => {
  const lan = localStorage.getItem("lan");
  console.log(lan);
  const req = await post<IsingupSucces, Isingup>(
    `https://btf-image-analyzer-api-production.up.railway.app/api/v1/sign-up?lan=${lan}`,
    userD
  );

  return req.data;
};

export const analysRegister = async (limit: number, offset: number) => {
  const lan = localStorage.getItem("lan");
  const req = await axios.get(
    `https://btf-image-analyzer-api-production.up.railway.app/api/v1/diagnostics/me?limit=${limit}&offset=${offset}&lan=${lan}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("loginToken"),
      },
    }
  );

  return req.data;
};
