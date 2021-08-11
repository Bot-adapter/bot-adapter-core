import { PatternArgsType } from "../metadata/types/param.types";
import isNil from "./isNil";

export default function (msg: string, patternArg: PatternArgsType): boolean {
  if (isNil(patternArg)) {
    return true;
  }

  const { pattern, options = { exact: false } } = patternArg;
  if (typeof pattern === "string") {
    if (options.exact) {
      return pattern === msg;
    } else {
      if (pattern === "*") {
        return true;
      }
      return msg.includes(pattern);
    }
  } else if (pattern instanceof RegExp) {
    return pattern.test(msg);
  }

  return false;
}
