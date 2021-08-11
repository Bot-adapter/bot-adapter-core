import {
  onMessagePatternKey,
  onMessagePatternOptionKey,
} from "../metadata/definitions/method.metadata";
import { MetadataArgsStorage } from "../adapter-builder/MetadataArgsStorage";
import { MethodType } from "../metadata/types/method.types";
import { PatternArgsType } from "../metadata/types/param.types";

export function OnMessage(args: PatternArgsType): MethodDecorator {
  const { pattern, options = { exact: false } } = args;
  return function (target, methodName, descriptor) {
    Reflect.defineMetadata(onMessagePatternKey, pattern, descriptor.value);
    Reflect.defineMetadata(
      onMessagePatternOptionKey,
      options,
      descriptor.value
    );
    const returnType = Reflect.getMetadata(
      "design:returntype",
      target,
      methodName
    );
    const metadataArgsStorage = MetadataArgsStorage.getInstance();
    metadataArgsStorage.methods.push({
      methodName: methodName,
      target: target.constructor,
      returnType,
      methodType: MethodType.OnMessage,
      options: args,
    });
  };
}
