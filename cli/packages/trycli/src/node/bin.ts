#!/usr/bin/env node
import { Command } from 'commander'
import { getCliVersion } from './shared/fsUtils.js'

const program = new Command()

program.version(`varlet-cli ${getCliVersion()}`).usage('<command> [options]')


  program
  .command('dev')
  .description('Run development environment')
  .action(async (options) => {
    const { dev } = await import('./commands/dev.js')
    return dev(options)
  })

program
  .command('build')
  .description('Build site for production')
  .action(async () => {
    const { build } = await import('./commands/build.js')
    return build()
  })

  program
    .command('buildComponent')
    .description('Build lib for component')
    .option('-n, --name <componentName>', 'Component name')
    .action(async (options) => {
      const { buildComponent } = await import('./commands/buildComponent.js')
      return buildComponent(options)
    })

program.on('command:*', async ([cmd]) => {
  const { default: logger } = await import('./shared/logger.js')

  program.outputHelp()
  logger.error(`\nUnknown command ${cmd}.\n`)
  process.exitCode = 1
})
program
  .command('createStore')
  .argument('[name]',"组件库名称")
  .description('Create a new React component store')
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
