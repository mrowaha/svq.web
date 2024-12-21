export interface FileDto {
  datasource: string;
  content: File;
}

export function asFileDto(datasource: string, content: File) {
  return {
    datasource,
    content,
  } as FileDto;
}
