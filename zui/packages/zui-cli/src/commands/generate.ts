import inquirer from 'inquirer'
import path from 'path';
import fs from "fs-extra"
import {cp} from "./copyFolder.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
interface Options{
    path?:string
}
export async function generate(name: string,options:Options) {
    if(!name){
        const answers = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'What is the name of the component?',
            default: 'mycomponent',
        });
        name=answers.name;
    };let root;
    console.log(options.path);
    if(!options.path)root= path.resolve(process.cwd(),name);
    else root= path.resolve(options.path,name);
    if(!fs.existsSync(root)){
        fs.mkdirSync(root);
        const sourceFolder = path.join(__dirname, '../../templates/generate');
        const destinationFolder = root;
        cp(sourceFolder, destinationFolder,[]);
        renameFilesWithMyComponent(root,name);
    //   fs.mkdirSync(path.resolve(root,"docs"));
    //   fs.mkdirSync(path.resolve(root,"example"));
    //   fs.mkdirSync(path.resolve(root,"__tests__"));
    //   fs.writeFileSync(path.resolve(root,'./props.ts'), '')
    //   fs.writeFileSync(path.resolve(root,"index.tsx"),"")
    //   fs.writeFileSync(path.resolve(root,`${name}.ts`),"")
    //   fs.writeFileSync(path.resolve(root,`${name}.css`),"")
    //   fs.writeFileSync(path.resolve(root,"docs",`${name}.md`),"")
    }
  }
  function renameFilesWithMyComponent(directory:string,name:string) {
    // 读取目录下的所有文件和子目录
    const files = fs.readdirSync(directory);
  
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const isDirectory = fs.lstatSync(filePath).isDirectory();
  
      if (isDirectory) {
        // 递归处理子目录
        renameFilesWithMyComponent(filePath,name);
      } else {
        // 修改文件名中包含"[ComponentName]"的文件
        if (file.includes('[ComponentName]')) {
          const newFileName = file.replace('[ComponentName]', name);
          const newFilePath = path.join(directory, newFileName);
          fs.renameSync(filePath, newFilePath);
          const data=fs.readFileSync(newFilePath,"utf-8").replaceAll("ComponentName",name)
          fs.writeFileSync(newFilePath,data)
          // console.log(`Renamed file: ${filePath} -> ${newFilePath}`);
        }
      }
    });
  }
