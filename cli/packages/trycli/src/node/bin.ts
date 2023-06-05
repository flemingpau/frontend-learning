#!/usr/bin/env node
import { Command } from 'commander'
import { getCliVersion } from './shared/fsUtils.js'

const program = new Command()

program.version(`ccli ${getCliVersion()}`).usage('<command> [options]')

  //调用开发环境
  program
  .command('dev')// 命令
  .description('Run development environment')// 命令描述
  .action(async (options) => {// 异步获取dev接口并调用
    const { dev } = await import('./commands/dev.js')
    return dev(options)
  })

  //生产环境
  program
    .command('build')
    .description('Build for production')
    .action(async () => {
      const { build } = await import('./commands/build.js')
      return build()
  })

  //打包单一组件
  program
    .command('buildComponent')
    .description('Build lib for component')
    .option('-n, --name <componentName>', 'Component name')
    .action(async (options) => {
      const { buildComponent } = await import('./commands/buildComponent.js')
      return buildComponent(options)
    })

  //添加监听器，当出现未知command时，调用logger输出
  program.on('command:*', async ([cmd]) => {
    const { default: logger } = await import('./shared/logger.js')
    program.outputHelp()
    logger.error(`\nUnknown command ${cmd}.\n`)
    process.exitCode = 1
  })

  //建立新组件库
  program
    .command('createStore')
    .argument('[name]',"组件库名称")
    .description('Create a new React component store')
    .action(async (name) => {
      const { createStore } = await import('./commands/createStore.js')
      return createStore(name)
    });

  // 生成组件
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
