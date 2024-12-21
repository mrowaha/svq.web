import { EchoDto } from "@/lib/frontend/dto/echo.dto";

export interface IEchoService {
  echo(dto: EchoDto): Promise<EchoDto>;
}
