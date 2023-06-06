import { ButtonHTMLAttributes, ReactPropTypes } from "react";
// import proptypes from "prop-types"
export { ButtonType, ButtonSize };
export function typeValidator(type: string): boolean {
  return ["default", "primary", "danger", "link"].includes(type);
}
export function sizeValidator(size: string): boolean {
  return ["small", "normal", "large"].includes(size);
}
export function nativeTypeValidator(nativeType: string): boolean {
  return ["button", "reset", "submit"].includes(nativeType);
}
type ButtonType = "default" | "primary" | "danger" | "link";
type ButtonSize = "small" | "normal" | "large";

// export const props = {
//   type:{
//     type : String,//proptypes.string,
//     validator: typeValidator,
//   },
//   nativeType: {
//     type: String,//proptypes.string,
//     default:'button',
//     validator: nativeTypeValidator,
//   },
//   size: {
//     type: String,//proptypes.string,
//     validator:sizeValidator,
//   },
//   color:{
//     type: String,
//   },
//   textColor:{
//     type: String,
//   },
//   children:{
//     type:String,
//   }
// }
export interface props = {
  type: string,
  nativeType: {
    type: String,//proptypes.string,
    default:'button',
    validator: nativeTypeValidator,
  },
  size: {
    type: String,//proptypes.string,
    validator:sizeValidator,
  },
  color:{
    type: String,
  },
  textColor:{
    type: String,
  },
  children:{
    type:String,
  }
}