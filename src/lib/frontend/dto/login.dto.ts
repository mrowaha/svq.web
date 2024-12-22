import { has } from "lodash";
export interface LoginDto {
  username: string;
  password: string;
}

export interface TokenDto {
  access_token: string;
  token_type: string;
}

export function isTokenDto(dto: any): dto is TokenDto {
  return has(dto, "access_token");
}
