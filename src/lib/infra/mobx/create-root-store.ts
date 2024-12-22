import { idProp, Model, model, prop } from "mobx-keystone";
import { IRootStore } from "./root-store.interface";
import { EchoService, echoServiceContext } from "../../frontend/domain/service";
import { DataSourceService, dataSourceServiceContext } from "../../frontend/domain/service/datasource-service";
import { ChatService, chatServiceContext } from "@/lib/frontend/domain/service/chat-service";

export const createRootStore = () => {
  @model("@svq/RootStore")
  class RootStore
    extends Model({
      id: idProp,
      echoService: prop(EchoService.create),
      dataSourceService: prop(DataSourceService.create),
      chatService: prop(ChatService.create),
    })
    implements IRootStore {
    protected override onInit(): void {
      echoServiceContext.set(this, this.echoService);
      dataSourceServiceContext.set(this, this.dataSourceService);
      chatServiceContext.set(this, this.chatService);
    }
  }

  return new RootStore({});
};