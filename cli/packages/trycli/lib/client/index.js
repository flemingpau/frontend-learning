import config from '@config';
import AppType from './appType';
import { onMounted, onUnmounted } from 'vue';
import { kebabCase } from '@varlet/shared';
import { get } from 'lodash-es';
const mountedVarKeys = [];
function formatStyleVars(styleVars) {
    return Object.entries(styleVars !== null && styleVars !== void 0 ? styleVars : {}).reduce((styles, [key, value]) => {
        const cssVar = key.startsWith('--') ? key : `--${kebabCase(key)}`;
        styles[cssVar] = value;
        return styles;
    }, {});
}
export function StyleProvider(styleVars = {}) {
    mountedVarKeys.forEach((key) => document.documentElement.style.removeProperty(key));
    mountedVarKeys.length = 0;
    const styles = formatStyleVars(styleVars);
    Object.entries(styles).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
        mountedVarKeys.push(key);
    });
}
export function getPCLocationInfo() {
    var _a;
    const [, language, path] = window.location.hash.split('/');
    const [menuName, hash = ''] = (_a = path === null || path === void 0 ? void 0 : path.split('#')) !== null && _a !== void 0 ? _a : [];
    return {
        language,
        menuName,
        hash,
    };
}
function getHashSearch() {
    const { href } = window.location;
    const hashSearch = href.slice(href.indexOf('?'));
    return new URLSearchParams(hashSearch);
}
export function getBrowserTheme() {
    var _a;
    const themeKey = get(config, 'themeKey');
    const darkThemeConfig = get(config, 'darkTheme');
    if (!darkThemeConfig) {
        return 'lightTheme';
    }
    const storageTheme = window.localStorage.getItem(themeKey);
    if (!storageTheme) {
        const preferTheme = ((_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, '(prefers-color-scheme: dark)').matches) ? 'darkTheme' : 'lightTheme';
        window.localStorage.setItem(themeKey, preferTheme);
        return preferTheme;
    }
    return storageTheme;
}
export function watchLang(cb, platform = 'mobile') {
    const handleHashchange = () => {
        var _a;
        const language = platform === 'mobile' ? (_a = getHashSearch().get('language')) !== null && _a !== void 0 ? _a : 'zh-CN' : getPCLocationInfo().language;
        cb(language);
    };
    useRouteListener(handleHashchange);
    handleHashchange();
}
export function withSiteConfigNamespace(styleVars) {
    return Object.entries(styleVars).reduce((styleVars, [key, value]) => {
        styleVars[`--site-config-${key}`] = value;
        return styleVars;
    }, {});
}
export function watchPlatform(cb) {
    const handleHashchange = () => {
        var _a;
        const platform = (_a = getHashSearch().get('platform')) !== null && _a !== void 0 ? _a : 'mobile';
        cb(platform);
    };
    useRouteListener(handleHashchange);
    handleHashchange();
}
export function useRouteListener(cb) {
    onMounted(() => {
        window.addEventListener('hashchange', cb);
        window.addEventListener('popstate', cb);
    });
    onUnmounted(() => {
        window.removeEventListener('hashchange', cb);
        window.removeEventListener('popstate', cb);
    });
}
export function watchDarkMode(dark, cb) {
    watchTheme((theme) => {
        const siteStyleVars = withSiteConfigNamespace(get(config, theme, {}));
        StyleProvider(theme === 'darkTheme' ? Object.assign(Object.assign({}, siteStyleVars), dark) : siteStyleVars);
        cb === null || cb === void 0 ? void 0 : cb(theme);
    });
}
export function watchTheme(cb, shouldUnmount = true) {
    const handleThemeChange = (event) => {
        const { data } = event;
        if (data.action === 'theme-change') {
            cb(data.data, data.from);
        }
    };
    window.addEventListener('message', handleThemeChange);
    if (shouldUnmount) {
        onUnmounted(() => {
            window.removeEventListener('message', handleThemeChange);
        });
    }
    cb(getBrowserTheme(), 'default');
}
export { AppType };
