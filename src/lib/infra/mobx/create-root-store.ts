import { idProp, Model, model, prop } from "mobx-keystone";
import { IRootStore } from "./root-store.interface";
import { EchoService, echoServiceContext } from "../../frontend/domain/service";

export const createRootStore = () => {
  @model("@svq/RootStore")
  class RootStore
    extends Model({
      id: idProp,
      echoService: prop(EchoService.create),
    })
    implements IRootStore
  {
    protected override onInit(): void {
      echoServiceContext.set(this, this.echoService);
    }
  }

  return new RootStore({});
};
