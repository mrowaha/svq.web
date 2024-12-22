import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Content-Type"] =
    config.headers["Content-Type"] ?? "application/json";

  const token = localStorage.getItem("svq-token");
  Object.assign(config.headers, token && { Authorization: `Bearer ${token}` });
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response.status === 401) {
    console.log("not authorized");
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
