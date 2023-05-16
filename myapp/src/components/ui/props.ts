import type {ButtonHTMLAttributes,ReactPropTypes} from "react"

export function typeValidator(type:string):boolean{
    return ['default','primary','info','success','warning','danger'].includes(type);
}
export function sizeValidator(size:string):boolean{
    return ['normal','mini','small','large'].includes(size);
}