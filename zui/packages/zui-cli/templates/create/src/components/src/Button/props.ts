import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
export { ButtonType, ButtonSize };

type ButtonType = "default" | "primary" | "danger" | "link";
type ButtonSize = "small" | "normal" | "large";

export interface BaseButton {
  className?: string;
  disabled?: boolean;
  btnType?: ButtonType;
  size?: ButtonSize;
  href?: string;
  children?: string;
}
type NativeButtonProps = BaseButton & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButton & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = NativeButtonProps | AnchorButtonProps;
