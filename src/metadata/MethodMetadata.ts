import { MetadataArgsStorage } from "../adapter-builder/MetadataArgsStorage";
import isMatch from "../utils/isMatch";
import isNil from "../utils/isNil";
import { ControllerMetadata } from "./ControllerMetadata";
import { MethodMetadataArgs } from "./definitions/method.metadata";
import { ParamMetadata } from "./ParamMetadata";
import { MethodType } from "./types/method.types";
import { ParameterType, PatternArgsType } from "./types/param.types";

export class MethodMetadata {
  methodName: string | symbol;
  target: Function;
  type: MethodType;
  options: PatternArgsType;
  paramMetadatas: ParamMetadata[];
  metadataArgsStorage: MetadataArgsStorage;

  constructor(
    private controllerMetadata: ControllerMetadata,
    args: MethodMetadataArgs
  ) {
    this.methodName = args.methodName;
    this.target = args.target;
    this.type = args.methodType;
    this.options = args.options;
    this.metadataArgsStorage = MetadataArgsStorage.getInstance();
    const paramsArgs = this.metadataArgsStorage.findParametersMetadataOfMethod(
      this.target,
      this.methodName
    );
    this.paramMetadatas = paramsArgs.map((args) => new ParamMetadata(args));
  }

  async execute(msgText: string, ctx: any) {
    if (!isMatch(msgText, this.options)) return;

    const injectParams = this.paramMetadatas
      .sort((param1, param2) => param1.index - param2.index)
      .map((p) => {
        switch (p.type) {
          case ParameterType.Message:
            return ctx.msg;

          case ParameterType.Bot:
            return ctx.bot;

          default:
            return null;
        }
      });
    const result = await this.controllerMetadata.instance[this.methodName](
      ...injectParams
    );
    return true;
  }
}
