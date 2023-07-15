"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import type { TValidationSchema } from "@/lib/validations/signin";
import { ValidationSchema } from "@/lib/validations/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { action } from "@/lib/actions/signin";
import styles from "./page.module.scss";
import {Input} from "@/components/input";
import Button from "@/components/button";
import Image from "next/image";
import GoogleIcon from "@/public/images/google.svg";

export default function SignIn() {
    const [isPending, startTransition] = useTransition();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<TValidationSchema>({
        resolver: zodResolver(ValidationSchema),
    });

    const onSubmit = handleSubmit((data) => {
        startTransition(() => {
            void action(data);
        });
    });

    const watchPassword = watch("password", "");

    return (
        <form className={styles.form}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>
                    เข้าสู่ระบบ
                </h1>
                <Button className={styles.google} height="3rem">
                    <Image src={GoogleIcon} alt="Google" width={26} height={26} />
                    <span>
                        ดำเนินการต่อด้วย Google
                    </span>
                </Button>
                <div className={styles.break}>
                    <span>หรือ</span>
                </div>
                <Input<TValidationSchema>
                    label="อีเมล"
                    placeholder="กรอกอีเมล"
                    name="email"
                    register={register}
                    errors={errors}
                    width="100%"
                    height="3rem"
                    margin=".5rem 0"
                />
                <Input<TValidationSchema>
                    label="รหัสผ่าน"
                    placeholder="กรอกรหัสผ่าน"
                    name="password"
                    register={register}
                    errors={errors}
                    type="password"
                    width="100%"
                    height="3rem"
                    margin="0 0 .5rem 0"
                    value={watchPassword}
                />
                <Button
                    className={styles.button}
                    type="submit"
                    disabled={isPending}
                    shadow={true}
                    width="100%"
                    height="3rem"
                    margin=".5rem 0 0 0"
                >
                    ยืนยัน
                </Button>
            </div>
        </form>
    );
}
