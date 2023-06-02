import type { AnyFunction } from '../../../interface';
declare type IProps = {
    afterJsTsRule?: AnyFunction;
    afterSvgRule?: AnyFunction;
    afterCssRule?: AnyFunction;
    afterLessRule?: AnyFunction;
    afterImageRule?: AnyFunction;
    afterFontRule?: AnyFunction;
};
export declare function getRule({ afterJsTsRule, afterSvgRule, afterCssRule, afterLessRule, afterImageRule, afterFontRule, }: IProps): any[];
export {};
