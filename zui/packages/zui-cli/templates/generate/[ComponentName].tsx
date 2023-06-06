import React, { FunctionComponent } from "react";
import { Props } from "./props";
export const ComponentName: FunctionComponent<Props> = (props) => {
    const { className,  children, ...restProps } =
        props;
    const classes = className;
    return (
        <div className={classes} {...restProps}>
            {children}
        </div>
    );
};
