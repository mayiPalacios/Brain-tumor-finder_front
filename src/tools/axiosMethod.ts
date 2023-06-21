import { IloginPost, IloginSuccess } from "@/interfaces/login";
import { get, post } from "./axiosConnect";
import axios from "axios";
import { Isingup, IsingupSucces } from "@/interfaces/singup";

export const postLogin = async (userData: FormData) => {
  try {
    const req = await axios.post(
      `https://btf-image-analyzer-api-production.up.railway.app/api/v1/auth/login`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return req.data;
  } catch (error) {
    console.log(error);
  }
};

export const postRegister = async (userD: Isingup) => {
  const req = await post<IsingupSucces, Isingup>(
    `https://btf-image-analyzer-api-production.up.railway.app/api/v1/sign-up`,
    userD
  );

  return req.data;
};
