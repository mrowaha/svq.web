import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  modelClass,
} from "mobx-keystone";
import { IEchoService } from "./echo-service.service.interface";
import { echoApi } from "@/lib/frontend/api/echo/echo.api";
import { EchoDto, isEchoDto } from "@/lib/frontend/dto/echo.dto";

const create = () => {
  return new EchoService({});
};

@model("@svq/EchoService")
export class EchoService extends Model({}) implements IEchoService {
  static create = create;
  @modelFlow
  echo = _async(function* (this: EchoService, echo: EchoDto) {
    const resp = yield* _await(echoApi.echo(echo));
    if (isEchoDto(resp)) return resp;
    throw new Error("unexpected response format for /echo");
  });
}
