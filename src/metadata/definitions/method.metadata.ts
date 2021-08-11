import { MethodType } from "../types/method.types";
import { PatternArgsType } from "../types/param.types";

export const onMessagePatternKey = Symbol("message-pattern");
export const onMessagePatternOptionKey = Symbol("message-pattern-option");

export interface MethodMetadataArgs {
  methodName: string | symbol;
  target: Function;
  methodType: MethodType;
  returnType: any;
  options?: PatternArgsType;
}
