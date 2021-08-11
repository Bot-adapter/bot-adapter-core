import { MetadataArgsStorage } from "../adapter-builder/MetadataArgsStorage";
import { ParameterType } from "../metadata/types/param.types";

export function Message(): ParameterDecorator {
  return function (target, methodName, parameterIndex) {
    const metadataArgsStorage = MetadataArgsStorage.getInstance();
    metadataArgsStorage.parameters.push({
      methodName,
      target: target.constructor,
      index: parameterIndex,
      type: ParameterType.Message,
    });
  };
}
