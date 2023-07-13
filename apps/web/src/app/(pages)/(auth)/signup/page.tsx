"use client";

import { useTransition, FormEvent } from "react";
import { useForm } from "react-hook-form";
import type { ValidationSchemaType } from "@/lib/validations/signup";
import { ValidationSchema } from "@/lib/validations/signup";
import { action } from "@/lib/actions/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./page.module.scss";
import { Input } from "@/components/input";
import Button from "@/components/button";
import Link from "next/link";

export default function SignUp() {
    const [isPending, startTransition] = useTransition();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchemaType>({
        resolver: zodResolver(ValidationSchema),
    });

    const onSubmit = handleSubmit((data) => {
        startTransition(() => {
            void action(data);
        });
    });

    const watchPassword = watch("password", "");

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.form__inner}>
                <h1 className={styles.title}>
                    สร้างบัญชีเพื่อ
                    <br />
                    เข้าร่วมโครงการ
                </h1>
                <Input
                    label="อีเมล"
                    placeholder="กรอกอีเมล"
                    name="email"
                    register={register}
                    errors={errors}
                    width="100%"
                    height="3rem"
                    margin="0 0 .5rem 0"
                />
                <Input
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
                <Input
                    label="ยืนยันรหัสผ่าน"
                    placeholder="กรอกยืนยันรหัสผ่าน"
                    name="passwordConfirm"
                    register={register}
                    errors={errors}
                    type="password"
                    width="100%"
                    height="3rem"
                    margin="0 0 .5rem 0"
                />
                <Button
                    buttonClassName={styles.button}
                    wrapperClassName={styles.button__wrapper}
                    type="submit"
                    disabled={isPending}
                    width="100%"
                    height="3rem"
                    margin=".5rem 0 0 0"
                >
                    ยืนยัน
                </Button>
                <div className={styles.signin}>
                    <span>
                        คุณมีบัญชีแล้วใช่หรือไม่
                    </span>
                    <Link className={styles.signin__link} href="/">
                        เข้าสู่ระบบ
                    </Link>
                </div>
            </div>
        </form>
    );
}
