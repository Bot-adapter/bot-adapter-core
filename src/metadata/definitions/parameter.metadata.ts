import { ParameterType } from "../types/param.types";

export interface ParameterMetaDataArgs {
  target: Function;
  methodName: string | symbol;
  index: number;
  type: ParameterType;
}
