import { BaseApi } from "../base.api";

class DataSourceApi extends BaseApi {
  constructor() {
    super("/datasource");
  }

  async uploadFile(file: File, datasource: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("datasource", datasource);

    return await this.post("/upload", formData, "multipart/form-data");
  }
}

export const dataSourceApi = new DataSourceApi();