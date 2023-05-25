#!/usr/bin/env node
const program = require('commander');
const pa = require("../package.json");
const inquirer =require('inquirer');
import execa from "execa";
// 定义当前版本
program.version(`v${pa.version}`);


program
  .command('start')
  .description('启动服务器')
  .action(async () => {
    execa.command("webpack serve --mode development");
  });
program
  .command('test')
  .description('测试commander的调用')
  .action(async () => {
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: '请输入项目名称：'
    })
    console.log("项目名称：", name)
  });
program.parse(process.argv);
