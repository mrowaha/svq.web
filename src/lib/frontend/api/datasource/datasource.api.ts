/**
 * DataSources Api Client
 * this class contains mappings for handling datasources related requests
 * @author Muhammad Rowaha<ashfaqrowaha@gmail.com>
 */
import { FileDto } from "../../dto/file.dto";
import { BaseApi } from "../base.api";

class DataSourceApi extends BaseApi {
  constructor() {
    super("/datasource");
  }

  async uploadFile(file: FileDto) {
    const formData = new FormData();
    formData.append("datasource", file.datasource);
    formData.append("file", file.content);
    return await this.post("/upload", formData, "multipart/form-data");
  }
}

export const datasourceApi = new DataSourceApi();
