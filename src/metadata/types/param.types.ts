export interface PatternOptionsType {
  /**
   * only active when pattern is string
   * @default false
   */
  exact?: boolean;
}

export interface PatternArgsType {
  pattern: string | RegExp;
  options?: PatternOptionsType;
}

export enum ParameterType {
  Message,
  Bot,
}
