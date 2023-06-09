import { resolve } from 'path'
import { getDirname } from './fsUtils.js'

export const dirname = getDirname(import.meta.url)

export const CWD = process.cwd()
export const ZUI_CONFIG = resolve(CWD, 'zui.config.mjs')
export const SRC_DIR = resolve(CWD, 'src')
export const ES_DIR = resolve(CWD, 'es')
export const LIB_DIR = resolve(CWD, 'lib')
export const UMD_DIR = resolve(CWD, 'umd')
export const TYPES_DIR = resolve(CWD, 'types')
export const ROOT_DOCS_DIR = resolve(CWD, 'docs')
export const ROOT_PAGES_DIR = resolve(CWD, 'pages')


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