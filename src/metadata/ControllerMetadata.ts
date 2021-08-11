import Container from "typedi";
import { MetadataArgsStorage } from "../adapter-builder/MetadataArgsStorage";
import isMatch from "../utils/isMatch";
import { ControllerMetadataArgs } from "./definitions/controller.metadata";
import { MethodMetadata } from "./MethodMetadata";
import { PatternArgsType } from "./types/param.types";

export class ControllerMetadata {
  name: string;
  target: Function;
  methods: MethodMetadata[];
  options: PatternArgsType;

  metadataArgsStorage: MetadataArgsStorage;

  constructor(args: ControllerMetadataArgs) {
    this.name = args.name;
    this.target = args.target;
    this.options = args.options;
    this.metadataArgsStorage = MetadataArgsStorage.getInstance();
    const methodArgs = this.metadataArgsStorage.findMethodsMetadataOfController(
      this.target
    );
    this.methods = methodArgs.map((args) => new MethodMetadata(this, args));
  }

  async excute(msgText: string, ctx: any) {
    if (!isMatch(msgText, this.options)) return;
    for (const method of this.methods) {
      try {
        await method.execute(msgText, ctx);
      } catch (error) {
        console.error(error);
      }
    }
  }

  public get instance(): any {
    return Container.get(this.target);
  }
}
