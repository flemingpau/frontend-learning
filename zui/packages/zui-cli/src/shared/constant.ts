import { resolve } from 'path'
import { getDirname } from './fsUtils.js'

export const dirname = getDirname(import.meta.url)

export const CWD = process.cwd()
export const VARLET_CONFIG = resolve(CWD, 'varlet.config.mjs')
export const SRC_DIR = resolve(CWD, 'src')
export const ES_DIR = resolve(CWD, 'es')
export const LIB_DIR = resolve(CWD, 'lib')
export const UMD_DIR = resolve(CWD, 'umd')
export const TYPES_DIR = resolve(CWD, 'types')
export const ROOT_DOCS_DIR = resolve(CWD, 'docs')
export const ROOT_PAGES_DIR = resolve(CWD, 'pages')

export const ESLINT_EXTENSIONS = ['.vue', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs']
export const VITE_RESOLVE_EXTENSIONS = ['.vue', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs', '.less', '.css']
export const SCRIPTS_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs']
export const PUBLIC_DIR_INDEXES = ['index.vue', 'index.tsx', 'index.ts', 'index.jsx', 'index.js']
export const STYLE_DIR_NAME = 'style'
export const EXAMPLE_DIR_NAME = 'example'
export const LOCALE_DIR_NAME = 'locale'
export const DOCS_DIR_NAME = 'docs'
export const TESTS_DIR_NAME = '__tests__'
export const GENERATORS_DIR = resolve(dirname, '../../../template/generators')
export const UI_PACKAGE_JSON = resolve(CWD, 'package.json')
export const CLI_PACKAGE_JSON = resolve(dirname, '../../package.json')

// site
export const SITE_OUTPUT_PATH = resolve(CWD, 'site')
export const SITE_PUBLIC_PATH = resolve(CWD, 'public')

// template highlight
export const HL_DIR = resolve(CWD, 'highlight')
export const HL_COMPONENT_NAME_RE = /.*(\/|\\)(.+)(\/|\\)docs(\/|\\)/
export const HL_API_RE = /##\s*API(?:\r\n|\n)+/

export const HL_EN_TITLE_ATTRIBUTES_RE = /###\s*Props(?:\r\n|\n)+/
export const HL_EN_TITLE_EVENTS_RE = /###\s*Events(?:\r\n|\n)+/
export const HL_EN_TITLE_SLOTS_RE = /###\s*Slots(?:\r\n|\n)+/
export const HL_EN_MD = 'en-US.md'
export const HL_EN_WEB_TYPES_JSON = resolve(HL_DIR, 'web-types.en-US.json')

export const HL_ZH_TITLE_ATTRIBUTES_RE = /###\s*属性(?:\r\n|\n)+/
export const HL_ZH_TITLE_EVENTS_RE = /###\s*事件(?:\r\n|\n)+/
export const HL_ZH_TITLE_SLOTS_RE = /###\s*插槽(?:\r\n|\n)+/

// icons
export const ICONS_DIST_DIR = resolve(CWD, 'dist')
export const ICONS_CSS_DIR = resolve(ICONS_DIST_DIR, 'css')
export const ICONS_PNG_DIR = resolve(ICONS_DIST_DIR, 'png')
export const ICONS_FONTS_DIR = resolve(ICONS_DIST_DIR, 'fonts')
export const ICONS_SVG_DIR = resolve(CWD, 'svg')

// extension
export const EXTENSION_ENTRY = resolve(CWD, 'src/extension.ts')

// jest
export const JEST_CONFIG = resolve(dirname, '../../../cjs/jest.config.cjs')