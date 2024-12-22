import { MeDto } from "@/lib/frontend/dto/me.dto";

export interface IAuthService {
  authorized: boolean;
  me(): Promise<MeDto>;
}
