import inquirer from 'inquirer'
import path from 'path';
import fs from "fs-extra"
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
      fs.mkdirSync(path.resolve(root,"docs"));
      fs.mkdirSync(path.resolve(root,"example"));
      fs.mkdirSync(path.resolve(root,"__tests__"));
      fs.writeFileSync(path.resolve(root,'./props.ts'), '')
      fs.writeFileSync(path.resolve(root,"index.tsx"),"")
      fs.writeFileSync(path.resolve(root,`${name}.ts`),"")
      fs.writeFileSync(path.resolve(root,`${name}.css`),"")
      fs.writeFileSync(path.resolve(root,"docs",`${name}.md`),"")
    }
  }