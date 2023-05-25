import React, { FunctionComponent } from "react";
import { props } from "./props";
type ButtonProps={
    name:string,
    props:any,
}
const Button : FunctionComponent<{}> = props=>{props.children};

export default Button;