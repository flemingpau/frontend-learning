import inquirer from 'inquirer'
import path from 'path';
import fs from "fs-extra"
import {cp} from "./copyFolder.js"
import { CWD, TEMPLATE_CREATE, TEMPLATE_PACKAGE_JSON } from '../shared/constant.js';


export async function createStore(name: string) {
    const pck = TEMPLATE_PACKAGE_JSON;
    const data = fs.readFileSync(pck,"utf-8")
    const myJSON = JSON.parse(data)
    if(!name){//输入名字
        const answers = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'What is the name of the component library?',
            default: 'my-components',
        });
        name=answers.name as string;
        
    }
    myJSON.name=name;
    const ans = await inquirer.prompt({
        type: 'input',
        name: 'description',
        message: 'Enter a description for the component library:',
    });
    myJSON.description=ans.description;
    //根目录 源文件
    const root = path.join(CWD, name);
    const src = path.join(root, 'src');

    if(fs.existsSync(root)){//目标根目录存在，则判断是否覆盖
        const {force}=await inquirer.prompt({
            type:"confirm",
            name: "force",
            message:"目录存在，是否覆盖？",
            default: false
        })//不覆盖结束
        if(!force)process.exit(1);
        fs.removeSync(root);
    }//删除根目录并创建
    fs.mkdirSync(root);
    fs.mkdirSync(src);
    //将根目录中除node_modules以外的文件都复制一份（待定）
    const sourceFolder = TEMPLATE_CREATE;
    const destinationFolder = root;
    
    cp(sourceFolder, destinationFolder,["node_modules","component_template"]);
    
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(myJSON,null,"\t"));
    console.log(`Creating ${name} - ${ans.description}`);
    console.log("Hint: to start your work:")//项目提示
    console.log(`cd ${root}`)
    console.log(`npm install`)
    console.log("npm start")
}
