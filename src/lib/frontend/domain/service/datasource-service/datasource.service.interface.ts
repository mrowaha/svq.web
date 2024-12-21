export interface IDatasourceService {
  uploadFile(datasource: string, content: File): Promise<any>
}