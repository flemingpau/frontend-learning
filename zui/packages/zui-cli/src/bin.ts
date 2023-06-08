#!/usr/bin/env node
import { Command } from 'commander'
import { getCliVersion } from './shared/fsUtils.js'

const program = new Command()

program.version(`zui-cli ${getCliVersion()}`).usage('<command> [options]')

//建立新组件库
program
  .command('createStore')
  .argument('[name]',"Component store name")
  .description('Create a new React component store')
  .action(async (name) => {
    const { createStore } = await import('./commands/createStore.js')
    return createStore(name)
  });

// 生成组件
program
  .command('generate')
  .argument('[name]',"")
  .option('-p, --path <pathname>',"specify the path u want","./src/components/src")
  .description('Generate a new component')
  .action(async (name,options) => {
    const { generate } = await import('./commands/generate.js')
    return generate(name,options)
  });

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

//on添加监听器，当出现未知command时，调用logger输出
program.on('command:*', async ([cmd]) => {
  const { default: logger } = await import('./shared/logger.js')
  //弹出help窗口
  program.outputHelp()
  logger.error(`\nUnknown command ${cmd}.\n`)
  //退出
  process.exitCode = 1
})


program.parse()
