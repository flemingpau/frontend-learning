#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const {copyFolder} = require("./bin/copyFolder.js");
let myJSON=require("./templates/package.json");

program
  .version(pkg.version)
  .description('My CLI tool')

program
  .command('create [name]')//命令
  .description('Create a new React component library')
  .action(async (name) => {
    if(!name){//输入名字
        const answers = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'What is the name of the component library?',
            default: 'my-components',
        });
        name=answers;
        // myJSON.data.name=name;
    }
    const description = await inquirer.prompt({
        type: 'input',
        name: 'description',
        message: 'Enter a description for the component library:',
    });
    //根目录 源文件
    const root = path.resolve(path.join(process.cwd(),name));
    const src = path.join(root, 'src');
    const dist = path.join(root, 'dist');
    // const template = fs.readFileSync(path.join(__dirname, 'templates', 'package.json'), 'utf-8');
    // console.log(fs.stat(root))
    if(fs.existsSync(root)){//目标根目录存在，则判断是否覆盖
        const {force}=await inquirer.prompt({
            type:"confirm",
            name: "force",
            message:"目录存在，是否覆盖？"
        })//不覆盖结束
        if(!force)process.exit(1);
        fs.removeSync(root);
    }//删除根目录并创建
    fs.mkdirSync(root);
    fs.mkdirSync(src);
    fs.mkdirSync(dist);
    //将根目录中除node_modules以外的文件都复制一份（待定）
    const sourceFolder = path.join(__dirname, 'templates');
    const destinationFolder = root;
    
    copyFolder(sourceFolder, destinationFolder,["node_modules","component_template"]);
    
    // const copysrc= path.join(__dirname, 'templates');
    // fs.copySync(path.join(__dirname, 'templates', 'package.json'), path.join(root, 'package.json'));
    // // fs.copySync(path.join(copysrc, 'templates', 'babel.config.js'), path.join(root, 'babel.config.js'));
    // fs.copySync(path.join(__dirname, 'templates', 'README.md'), path.join(root, 'README.md'));
    // fs.copySync(path.join(__dirname, 'templates', 'webpack.config.js'), path.join(root, 'webpack.config.js'));
    // fs.writeFileSync(path.join(root, 'webpack.config.js'), eval("`" + template+"`"));
    // // fs.writeFileSync(path.join(__dirname, 'templates', 'package.json',JSON.stringify(`{name: "${name}"}`)));
     //fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(myJSON));
    console.log(`Creating ${name} - ${description}`);
    console.log("Hint: to start your work:")//项目提示
    console.log(`cd ${root}`)
    console.log(`npm install`)
    console.log("npm start")
  });
function opValidate(value, dummyPrevious) {
  if (typeof value != 'string') {
    throw new InvalidArgumentError('必须输入正确的字符串')
  }
  return value
}

function opArrValidate(value, dummyPrevious) {
  if (typeof value != 'string') {
    throw new InvalidArgumentError('必须输入正确的字符串')
  }
  if (dummyPrevious) {
    return [...dummyPrevious, value]
  }
  return [value]
}
program
  .command('generate')
  .argument('[name]',"生成组件名称")
  .option('-p, --path <pathname>',"指定文件生成路径[如：./src/components/src]默认则当前目录",opValidate)
  .description('生成组件模板')
  .action(async (name,options) => {
    if(!name){
        const answers = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'What is the name of the component?',
            default: 'mycomponent',
        });
        name=answers;
    };let root;
    console.log(options.path);
    if(!options.path)root= path.resolve(process.cwd(),name);
    else root= path.resolve(options.path,name);
    if(!fs.existsSync(root)){
      fs.mkdirSync(root);
      fs.mkdirSync(path.resolve(root,"docs"));
      fs.mkdirSync(path.resolve(root,"example"));
      fs.mkdirSync(path.resolve(root,"__tests__"));
      fs.writeFileSync(path.resolve(root,'./props.ts'), '')
      fs.writeFileSync(path.resolve(root,"index.ts"),"")
      fs.writeFileSync(path.resolve(root,`${name}.ts`),"")
      fs.writeFileSync(path.resolve(root,`${name}.css`),"")
      fs.writeFileSync(path.resolve(root,"docs",`${name}.md`),"")
    }
  });

program.parse(process.argv);

