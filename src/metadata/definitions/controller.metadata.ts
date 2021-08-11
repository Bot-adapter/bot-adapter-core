import { PatternArgsType } from "../types/param.types";

export const ControllerMetadataKey = Symbol("controller");
export const ControllerOptionsMetadataKey = Symbol("controller-options");

export interface ControllerMetadataArgs {
  name: string;
  target: Function;
  options?: PatternArgsType;
}
