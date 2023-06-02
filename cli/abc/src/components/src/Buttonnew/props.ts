import { ButtonHTMLAttributes, ReactPropTypes } from "react";
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


export interface ButtonProps {
  className?: string;
  disabled?: boolean;
  btnType?: ButtonType;
  nativeType?: ButtonHTMLAttributes<any>;
  size?: ButtonSize;
  href?: string;
  children?: string;
  onclick?: (e: Event) => void| Promise<any>;
  onMouseDown?: (e: Event) => void| Promise<any>;
  onMouseEnter?: (e: Event) => void| Promise<any>;
}