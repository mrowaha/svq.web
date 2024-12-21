import { _async, _await, Model, modelFlow, model } from "mobx-keystone";
import { IDatasourceService } from "./datasource.service.interface";
import { datasourceApi } from "@/lib/frontend/api/datasource/datasource.api";
import { asFileDto } from "@/lib/frontend/dto/file.dto";
import { supported } from "./datasource.service.constants";
import { UnSupportedMimeType } from "./datasource.service.errors";

const create = () => {
  return new DatasourceService({});
};

@model("@svq/DatasourceService")
export class DatasourceService extends Model({}) implements IDatasourceService {
  static create = create;

  @modelFlow
  uploadFile = _async(function* (
    this: DatasourceService,
    datasource: string,
    content: File
  ) {
    if (!supported.includes(content.type as any)) {
      throw new UnSupportedMimeType(content.type);
    }

    const resp = yield* _await(
      datasourceApi.uploadFile(asFileDto(datasource, content))
    );
    console.log(resp);
  });
}
