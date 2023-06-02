import React, { FunctionComponent } from "react";
import { ButtonProps } from "./props";
import classNames from "classnames";
export const Button: FunctionComponent<ButtonProps> = (props) => {
  const { btnType, className, disabled, size, href, children, ...restProps } =
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
      <button className={classes} disabled={disabled} >
        {children}
      </button>
    );
  }
};
