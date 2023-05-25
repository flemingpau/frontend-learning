#!/usr/bin/env node
import {program} from 'commander';
// import inquirer from 'inquirer';
import {execa} from "execa";
// 定义当前版本


program
  .command('start')
  .description('启动服务器')
  .action(async () => {
    await execa("webpack", ["serve", "--mode"," development"]);
  });

program.parse(process.argv);
export default program;