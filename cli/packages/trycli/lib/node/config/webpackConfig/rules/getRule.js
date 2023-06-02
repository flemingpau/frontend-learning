import { getCssRule } from './getCssRule';
import { getFontRule } from './getFontRule';
import { getImageRule } from './getImageRule';
import { getJsTsRule } from './getJsTsRule';
import { getLessRule } from './getLessRule';
import { getSvgRule } from './getSvgRule';
export function getRule({ afterJsTsRule, afterSvgRule, afterCssRule, afterLessRule, afterImageRule, afterFontRule, }) {
    const result = [];
    result.push(getJsTsRule(afterJsTsRule)());
    result.push(getLessRule(afterLessRule)());
    result.push(getCssRule(afterCssRule)());
    result.push(getImageRule(afterImageRule)());
    result.push(getFontRule(afterFontRule)());
    result.push(getSvgRule(afterSvgRule)());
    return result;
}
