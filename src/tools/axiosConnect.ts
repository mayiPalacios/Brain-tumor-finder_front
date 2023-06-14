import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

async function http<T>(
  path: string,
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const response = await axios.request<T>({ url: path, ...config });
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
  };
}

export async function get<T>(
  path: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const requestConfig: AxiosRequestConfig = { method: "get", ...config };
  const response = await http<T>(path, requestConfig);
  return response;
}

export async function post<T, U>(
  path: string,
  data: U,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const requestConfig: AxiosRequestConfig = { method: "post", data, ...config };
  const response = await http<T>(path, requestConfig);
  return response;
}
