import { ParameterMetaDataArgs } from "./definitions/parameter.metadata";
import { MethodMetadata } from "./MethodMetadata";
import { ParameterType } from "./types/param.types";

export class ParamMetadata {
  target: Function;
  methodName: string | symbol;
  type: ParameterType;
  index: number;

  constructor(args: ParameterMetaDataArgs) {
    this.target = args.target;
    this.methodName = args.methodName;
    this.type = args.type;
    this.index = args.index;
  }
}
