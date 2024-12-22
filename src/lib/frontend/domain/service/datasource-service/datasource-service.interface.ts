export interface IDataSourceService {
    uploadFile(file: File, datasource: string): Promise<{ ok: boolean }>;
}