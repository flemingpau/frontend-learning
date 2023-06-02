type ClassName = string | undefined |null
type Classes = (ClassName | [ any, ClassName, ClassName?])
export function createNameSpace(name:string){
    const namespace = `com-${name}`;
    //BEM代表块 (Block)，元素 (Element)，修饰符 (Modifier)
    const createBem=(suffix?: string):string=>{
        if(!suffix) return namespace
        return suffix.startsWith("--")?`${namespace}${suffix}`:`${namespace}__${suffix}`;
    }

    const classes=(...classes: Classes[])=>{
        return classes.map((className)=>{
            if(Array.isArray(className)){
                const [ condition, tr , fa = null ] = className;
                return condition?tr:fa;
            }
            return className;
        })
    }
    return {n:createBem,
    classes,
    }
}