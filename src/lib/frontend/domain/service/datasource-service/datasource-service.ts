import { _async, _await, Model, model, modelFlow } from "mobx-keystone";
import { IDataSourceService } from "./datasource-service.interface";
import { dataSourceApi } from "@/lib/frontend/api/datasource/datasource.api";

const create = () => {
    return new DataSourceService({});
};

@model("@svq/DataSourceService")
export class DataSourceService extends Model({}) implements IDataSourceService {
    static create = create;

    @modelFlow
    uploadFile = _async(function* (
        this: DataSourceService,
        file: File,
        datasource: string
    ) {
        const response = yield* _await(dataSourceApi.uploadFile(file, datasource));
        return response;
    });

    @modelFlow
    listDocuments = _async(function* (
        this: DataSourceService,
        datasource: string
    ) {
        const response = yield* _await(dataSourceApi.listDocuments(datasource));
        return response;
    });
}