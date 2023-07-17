import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./button.module.scss";
import Spinner from "../spinner";

type Props = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    height?: string | number;
    width?: string | number;
    padding?: string | number;
    margin?: string | number;
    shadow?: boolean;
    loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, Props>(function (
    {
        children,
        icon,
        className,
        disabled = false,
        loading = false,
        onClick,
        height,
        width,
        padding,
        margin,
        shadow = false,
        style,
        ...props
    },
    ref
) {
    return (
        <button
            ref={ref}
            className={classNames(className, { [styles.shadow]: shadow }, styles.button)}
            disabled={disabled || loading}
            onClick={onClick}
            style={{ height, width, margin, padding, ...style }}
            {...props}
        >
            {!loading && (children ? children : <span>{icon}</span>)}

            {loading && (
                <span className={styles.loading}>
                    <Spinner />
                </span>
            )}
        </button>
    );
});

export default Button;
