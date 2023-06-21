import { IloginPost, IloginSuccess } from "@/interfaces/login";
import { get, post } from "./axiosConnect";
import axios, { AxiosResponse } from "axios";
import {
  IContactUsPost,
  IContactUsPostResponse,
} from "@/interfaces/contact-us";
const BASE_URL = `https://btf-image-analyzer-api-production.up.railway.app`;

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

export const postContactUs = async (
  contactUsDto: IContactUsPost
): Promise<IContactUsPostResponse> => {
  try {
    const response = await axios.post<
      IContactUsPostResponse,
      AxiosResponse<IContactUsPostResponse>
    >(`${BASE_URL}/api/v1/contact`, contactUsDto);
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
