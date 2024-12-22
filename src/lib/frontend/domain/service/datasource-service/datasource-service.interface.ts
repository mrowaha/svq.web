import { ListDocumentsResponse } from "@/lib/frontend/api/datasource/datasource.api";

export interface IDataSourceService {
    uploadFile(file: File, datasource: string): Promise<{ ok: boolean }>;
    listDocuments(datasource: string): Promise<ListDocumentsResponse>;
}