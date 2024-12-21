import { has } from "lodash";
export interface EchoDto {
  message: string;
}

export function isEchoDto(dto: any): dto is EchoDto {
  return has(dto, "message");
}

export function asEchoDto(obj: any): EchoDto {
  return {
    message: obj.message ?? "",
  };
}
