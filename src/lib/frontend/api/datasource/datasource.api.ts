import { BaseApi } from "../base.api";

export interface Document {
  name: string;
  size: number;
  lastModified: string;
  contentType: string;
  originalFilename: string;
}

export interface ListDocumentsResponse {
  ok: boolean;
  documents: Document[];
  error?: string;
}

class DataSourceApi extends BaseApi {
  constructor() {
    super("/datasource");
  }

  async uploadFile(file: File, datasource: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("datasource", datasource);

    return await this.post<{ ok: boolean }>(
      "/upload",
      formData,
      "multipart/form-data"
    );
  }

  async listDocuments(datasource: string): Promise<ListDocumentsResponse> {
    return await this.get<ListDocumentsResponse>(`/list?datasource=${datasource}`);
  }
}

export const dataSourceApi = new DataSourceApi();