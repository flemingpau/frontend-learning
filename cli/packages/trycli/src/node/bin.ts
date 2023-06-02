#!/usr/bin/env node
import { Command } from 'commander'
import { getCliVersion } from './shared/fsUtils.js'

const program = new Command()

program.version(`varlet-cli ${getCliVersion()}`).usage('<command> [options]')

// program
//   .command('dev')
//   .option('-f --force', 'Force dep pre-optimization regardless of whether deps have changed')
//   .option('-d --draft', 'Start the service in draft mode')
//   .description('Run varlet development environment')
//   .action(async (options) => {
//     const { dev } = await import('./commands/dev.js')

//     return dev(options)
//   })

  program
  .command('wdev')
  .option('-f --force', 'Force dep pre-optimization regardless of whether deps have changed')
  .option('-d --draft', 'Start the service in draft mode')
  .description('Run varlet development environment')
  .action(async (options) => {
    const { dev } = await import('./commands/wdev.js')

    return dev(options)
  })

program
  .command('wbuild')
  .description('Build varlet site for production')
  .action(async () => {
    const { build } = await import('./commands/wbuild.js')

    return build()
  })

  program
    .command('buildComponent')
    .description('Create a component directory')
    .option('-n, --name <componentName>', 'Component name')
    .action(async (options) => {
      const { buildComponent } = await import('./commands/buildComponent.js')
      return buildComponent(options)
    })
// program
//   .command('dev:vite')
//   .description('Use vite start server for development')
//   .action(async () => {
//     const { vite } = await import('./commands/vite.js')

//     return vite('dev')
//   })

// program
//   .command('build:vite')
//   .description('Use vite build app for production')
//   .action(async () => {
//     const { vite } = await import('./commands/vite.js')

//     return vite('build')
//   })

// program
//   .command('dev:extension')
//   .description('Run VSCode extension development environment')
//   .action(async () => {
//     const { extension } = await import('./commands/extension.js')

//     return extension('dev')
//   })

// program
//   .command('build:extension')
//   .description('Build VSCode extension for production')
//   .action(async () => {
//     const { extension } = await import('./commands/extension.js')

//     return extension('build')
//   })

// program
//   .command('build:icons')
//   .description('Build icons')
//   .action(async () => {
//     const { icons } = await import('./commands/icons.js')

//     return icons()
//   })

// program
//   .command('preview')
//   .description('Preview varlet site for production')
//   .action(async () => {
//     const { preview } = await import('./commands/preview.js')

//     return preview()
//   })

// program
//   .command('compile')
//   .description('Compile varlet components library code')
//   .action(async () => {
//     const { compile } = await import('./commands/compile.js')

//     return compile()
//   })

// program
//   .command('lint')
//   .description('Lint code')
//   .action(async () => {
//     const { lint } = await import('./commands/lint.js')

//     return lint()
//   })

// program
//   .command('create')
//   .description('Create a component directory')
//   .option('-n, --name <componentName>', 'Component name')
//   .option('-s, --sfc', 'Generate files in sfc format')
//   .option('-t, --tsx', 'Generate files in tsx format')
//   .option('-l, --locale', 'Generator internationalized files')
//   .action(async (options) => {
//     const { create } = await import('./commands/create.js')

//     return create(options)
//   })

// program
//   .command('jest')
//   .description('Run Jest in work directory')
//   .option('-w, --watch', 'Watch files for changes and rerun tests related to changed files')
//   .option('-wa, --watchAll', 'Watch files for changes and rerun all tests when something changes')
//   .option('-c, --component <componentName>', 'Test a specific component')
//   .option('-cc --clearCache', 'Clear test cache')
//   .action(async (option) => {
//     const { jest } = await import('./commands/jest.js')

//     return jest(option)
//   })

// program
//   .command('gen')
//   .description('Generate cli application')
//   .option('-n, --name <applicationName>', 'Application name')
//   .option('-s, --sfc', 'Generate files in sfc format')
//   .option('-t, --tsx', 'Generate files in tsx format')
//   .option('-l, --locale', 'Generator internationalized files')
//   .action(async (option) => {
//     const { gen } = await import('./commands/gen.js')

//     return gen(option)
//   })

// program
//   .command('changelog')
//   .option('-rc --releaseCount <releaseCount>', 'Release count')
//   .option('-f --file <file>', 'Changelog filename')
//   .description('Generate changelog')
//   .action(async (option) => {
//     const { changelog } = await import('./commands/changelog.js')

//     return changelog(option)
//   })

// program
//   .command('release')
//   .option('-r --remote <remote>', 'Remote name')
//   .description('Release all packages and generate changelogs')
//   .action(async (option) => {
//     const { release } = await import('./commands/release.js')

//     return release(option)
//   })

// program
//   .command('commit-lint <gitParams>')
//   .description('Lint commit message')
//   .action(async (option) => {
//     const { commitLint } = await import('./commands/commitLint.js')

//     return commitLint(option)
//   })

// program
//   .command('checklist <gitParams>')
//   .description('Display a checklist for confirmation')
//   .action(async (option) => {
//     const { checklist } = await import('./commands/checklist.js')

//     return checklist(option)
//   })

program.on('command:*', async ([cmd]) => {
  const { default: logger } = await import('./shared/logger.js')

  program.outputHelp()
  logger.error(`\nUnknown command ${cmd}.\n`)
  process.exitCode = 1
})
program
  .command('createStore')//命令
  .argument('[name]',"组件库名称")
  .description('Create a new React component library')
  .action(async (name) => {
    const { createStore } = await import('./commands/createStore.js')
    return createStore(name)
  });

program
  .command('generate')
  .argument('[name]',"生成组件名称")
  .option('-p, --path <pathname>',"指定文件生成路径[如：./src/components/src]默认则当前目录")
  .description('生成组件模板')
  .action(async (name,options) => {
    const { generate } = await import('./commands/generate.js')
    return generate(name,options)
  });


program.parse()
