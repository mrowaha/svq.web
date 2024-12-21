import { EchoDto } from "../../dto/echo.dto";
import { BaseApi } from "../base.api";

class EchoApi extends BaseApi {
  constructor() {
    super("/echo");
  }

  async echo(echo: EchoDto) {
    return await this.post("/", echo);
  }
}

export const echoApi = new EchoApi();
