import { IloginPost, IloginSuccess } from "@/interfaces/login";
import { get, post } from "./axiosConnect";
import axios from "axios";

export const postLogin = async (userData: IloginPost) => {
  try {
    const req = await axios.post(
      `https://btf-image-analyzer-api-production.up.railway.app/auth/login`,
      userData
    );
    return req.data;
  } catch (error) {
    console.log(error);
  }
};
