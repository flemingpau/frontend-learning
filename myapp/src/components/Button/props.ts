import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
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

export interface BaseButton {
  className?: string;
  disabled?: boolean;
  btnType?: ButtonType;
  size?: ButtonSize;
  href?: string;
  children?: any;
}
type NativeButtonProps = BaseButton & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButton & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = NativeButtonProps | AnchorButtonProps;
