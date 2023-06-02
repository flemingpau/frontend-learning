import React, { FunctionComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
export class Button extends React.Component {
  render()
{
  //const { , className, disabled, size, href, children, ...restProps } =
  const className=this.props.className;
  const children=this.props.children;
  const btnType=this.props.btnType;
  const disabled=this.props.disabled;
  const size=this.props.size;
  // const href=this.props.href;

  const classes = classNames("btn", className, {
  [`btn-${btnType}`]: btnType,
  [`btn-${size}`]: size,
  disabled: btnType === "link" && disabled,
});
// if (btnType === "link" && href) {
//   return (
//     <a className={classes} href={href} >
//       {children}
//     </a>
//   );
// } else {
  return (
    <button className={classes} disabled={disabled} >
      {children}
    </button>
  );

};
}
type ButtonType = "default" | "primary" | "danger" | "link";
type ButtonSize = "small" | "normal" | "large";
Button.propTypes= {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  btnType: PropTypes.string,
  nativeType: PropTypes.string,
  size: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.string,
  onclick: PropTypes.func,
}