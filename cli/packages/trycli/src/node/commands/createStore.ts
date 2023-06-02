import inquirer from 'inquirer'
import path from 'path';
import fs, { copy } from "fs-extra"
import {cp} from "./copyFolder.js"
import { CWD } from '../shared/constant.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export async function createStore(name: string) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    if(!name){//输入名字
        const answers = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'What is the name of the component library?',
            default: 'my-components',
        });
        name=answers.name as string;
        // myJSON.data.name=name;
    }
    const description = await inquirer.prompt({
        type: 'input',
        name: 'description',
        message: 'Enter a description for the component library:',
    });
    //根目录 源文件
    const root = path.join(CWD, name);
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
    const sourceFolder = path.join(__dirname, '../../../templates');
    const destinationFolder = root;
    
    cp(sourceFolder, destinationFolder,["node_modules","component_template"]);
    
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
}
