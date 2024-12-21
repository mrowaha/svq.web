import axios from "axios";
import { setupInterceptorsTo } from "../../infra/axios/interceptors";
setupInterceptorsTo(axios);

export class BaseApi {
  private baseUrl_: string;
  constructor(readonly baseUrl: string) {
    this.baseUrl_ = `/api/v1${baseUrl}`;
  }

  async get<T>(url: string) {
    const { data } = await axios.get(this.baseUrl_ + url);
    return data;
  }

  async post<T>(
    url: string,
    payload?: any,
    contentType: string = "application/json"
  ) {
    const { status, data } = await axios.post(this.baseUrl_ + url, payload, {
      headers: { "Content-Type": contentType },
    });
    return data;
  }
}
