import { Service as ContainerService } from "typedi";
import {
  ControllerMetadataKey,
  ControllerOptionsMetadataKey,
} from "../metadata/definitions/controller.metadata";
import { MetadataArgsStorage } from "../adapter-builder/MetadataArgsStorage";
import { PatternArgsType } from "../metadata/types/param.types";

export function Controller(options?: PatternArgsType): ClassDecorator {
  return function (target) {
    const metadataArgsStorage = MetadataArgsStorage.getInstance();
    metadataArgsStorage.controllers.push({
      name: target.name,
      target,
      options,
    });

    Reflect.defineMetadata(ControllerMetadataKey, target.name, target);
    Reflect.defineMetadata(ControllerOptionsMetadataKey, options, target);
    ContainerService()(target);
  };
}
