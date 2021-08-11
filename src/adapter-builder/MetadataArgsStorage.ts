import { Container, Service } from "typedi";
import { ControllerMetadataArgs } from "../metadata/definitions/controller.metadata";
import { MethodMetadataArgs } from "../metadata/definitions/method.metadata";
import { ParameterMetaDataArgs } from "../metadata/definitions/parameter.metadata";
import { MethodType } from "../metadata/types/method.types";

export class MetadataArgsStorage {
  private static instance: MetadataArgsStorage;
  private constructor() {}

  controllers: ControllerMetadataArgs[] = [];
  methods: MethodMetadataArgs[] = [];
  parameters: ParameterMetaDataArgs[] = [];

  public static getInstance() {
    if (!MetadataArgsStorage.instance) {
      MetadataArgsStorage.instance = new MetadataArgsStorage();
    }
    return MetadataArgsStorage.instance;
  }

  findMethodsMetadataOfController(
    target: Function,
    type?: MethodType
  ): MethodMetadataArgs[] {
    const result = this.methods.filter((m) => m.target === target);
    if (type !== null && type !== undefined) {
      return result.filter((m) => m.methodType === type);
    }
    return result;
  }

  findParametersMetadataOfMethod(
    target: Function,
    methodName: string | symbol
  ): ParameterMetaDataArgs[] {
    const result = this.parameters.filter(
      (p) => p.target === target && p.methodName === methodName
    );
    return result;
  }
}
