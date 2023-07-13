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
    wrapperClassName?: string;
    buttonClassName?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    height?: string | number;
    width?: string | number;
    padding?: string | number;
    margin?: string | number;
    loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, Props>(function (
    {
        children,
        icon,
        wrapperClassName,
        buttonClassName,
        disabled = false,
        loading = false,
        onClick,
        height,
        width,
        padding,
        margin,
        style,
        ...props
    },
    ref
) {
    return (
        <div className={classNames(wrapperClassName, styles.wrapper)} style={{ margin, padding }}>
            <button
                ref={ref}
                className={classNames(buttonClassName, styles.button)}
                disabled={disabled || loading}
                onClick={onClick}
                style={{ height, width, ...style }}
                {...props}
            >
                {!loading && (children ? children : <span>{icon}</span>)}

                {loading && (
                    <span className={styles.loading}>
                        <Spinner />
                    </span>
                )}
            </button>
        </div>
    );
});

export default Button;
