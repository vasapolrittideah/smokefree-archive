import {Input, Props as InputProps} from "../input";
import {FieldValues} from "react-hook-form";
import React from "react";
import PasswordMeter from "@/components/password-meter";
import styles from "./password.module.scss";

type Props<TFieldValues extends FieldValues> = Omit<InputProps<TFieldValues>, "ref"> & {
    indicator?: boolean;
}

function PasswordInner<TFieldValues extends FieldValues>(
    {
        label,
        name,
        rules,
        register,
        errors,
        style,
        indicator = false,
        ...props
    }: Props<TFieldValues>,
    ref: React.ForwardedRef<HTMLInputElement>
) {
    return (
        <>
            <Input<TFieldValues>
                className={styles.password}
                ref={ref}
                label="รหัสผ่าน"
                placeholder="กรอกรหัสผ่าน"
                name={name}
                register={register}
                errors={errors}
                type="password"
                {...props}
            />
            {indicator && <PasswordMeter className={styles.indicator} password={props.value as string} />}
        </>
    );
}

export const Password = React.forwardRef(PasswordInner) as <TFieldValues extends FieldValues>(
    props: Props<TFieldValues> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof PasswordInner>;
