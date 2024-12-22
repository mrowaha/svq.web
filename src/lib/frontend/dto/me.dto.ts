import { has } from "lodash";
export interface MeDto {
  username: string;
  email: string;
  fullname: string;
}

export function isMeDto(dto: any): dto is MeDto {
  return has(dto, "username");
}
