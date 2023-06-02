/* eslint-disable no-unused-vars */
import { Configuration, RuleSetRule } from 'webpack';

export type IWebpackConfigType = 'buildLib' | 'dev' | 'buildSite';

export interface CustomConfig extends Configuration {
  entries: object;
  setBabelOptions: (options: string | { [index: string]: any }) => void;
  setRules: (rules: (RuleSetRule | "...")[]) => void;
  setPlugins: (plugins: Configuration['plugins']) => void;
  setDevOptions: Record<string, any>;
  setOutput: (outputConfig: any) => void;
  setConfig: (config: any) => void;
}

export type AnyFunction = (...args: any[]) => any;
