import styles from "./input.module.scss";
import {
    RegisterOptions,
    FieldValues,
    Path,
    DeepMap,
    FieldError,
    UseFormRegister,
    get,
} from "react-hook-form";
import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PasswordMeter from "@/components/password-meter";

export type Props<TFieldValues extends FieldValues> = React.HTMLProps<HTMLInputElement> & {
    className?: string;
    label?: string;
    width?: number | string;
    height?: number | string;
    margin?: number | string;
    padding?: number | string;
    name: Path<TFieldValues>;
    rules?: RegisterOptions;
    register?: UseFormRegister<TFieldValues>;
    errors?: Partial<DeepMap<TFieldValues, FieldError>>;
};

function InputInner<TFieldValues extends FieldValues>(
    {
        className,
        label,
        width,
        height,
        margin,
        padding,
        name,
        rules,
        register,
        errors,
        style,
        ...props
    }: Props<TFieldValues>,
    ref: React.ForwardedRef<HTMLInputElement>
) {
    const errorMessages = get(errors, name);
    const hasError = !!(errors && errorMessages);

    return (
        <div className={classNames(className, styles.wrapper)} style={{ margin, padding }}>
            <label className={styles.label} htmlFor={name}>
                {label}
            </label>
            <input
                ref={ref}
                className={classNames({ [styles.input__error]: hasError }, styles.input)}
                id={name}
                style={{ height, width, ...style }}
                {...(register && register(name, rules))}
                {...props}
            />
            {hasError && (
                <ErrorMessage
                    errors={errors}
                    name={name as any}
                    render={({ message }) => (
                        <div className={styles.error}>
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            <span>{message}</span>
                        </div>
                    )}
                />
            )}
        </div>
    );
}

export const Input = React.forwardRef(InputInner) as <TFieldValues extends FieldValues>(
    props: Props<TFieldValues> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof InputInner>;
