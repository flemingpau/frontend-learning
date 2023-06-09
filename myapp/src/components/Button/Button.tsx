import React, { FunctionComponent } from "react";
import { ButtonProps } from "./props";
const classNames = require("classnames");
export const Button: FunctionComponent<ButtonProps> = (props) => {
  const { btnType, className, disabled, size, children, href, ...restProps } =
    props;
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};
