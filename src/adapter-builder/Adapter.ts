import Container from "typedi";
import { ControllerMetadata } from "../metadata/ControllerMetadata";
import { MetadataArgsStorage } from "./MetadataArgsStorage";

export interface Handlers<TMsg = any> {
  messageHandler(msg: TMsg): string | void;
}

export class Adapter {
  private metadataArgsStorage: MetadataArgsStorage;
  private controllerMetadatas: ControllerMetadata[];
  constructor(controllers?: Function[]) {
    this.metadataArgsStorage = MetadataArgsStorage.getInstance();
    this.registerControllers(controllers || []);
  }

  /**
   * registerControllers
   */
  public registerControllers(controllers: Function[]): void {
    Container.import(controllers);
  }

  private getControllers() {
    const controllers = this.metadataArgsStorage.controllers;
    this.controllerMetadatas = controllers.map(
      (args) => new ControllerMetadata(args)
    );
    return this.controllerMetadatas;
  }

  private getOnMessageHandler(
    getMsgTextFunc: (msg: any) => string
  ): Handlers["messageHandler"] {
    const controllers = this.getControllers();
    return function (msg: any) {
      if (!msg) return;
      const msgText = getMsgTextFunc(msg);
      controllers.forEach((c) => {
        c.excute(msgText, { msg });
      });
    };
  }

  public getHandlers(
    getMsgTextFunc: (msg: any) => string = (msg) => msg
  ): Handlers {
    return {
      messageHandler: this.getOnMessageHandler(getMsgTextFunc),
    };
  }
}
