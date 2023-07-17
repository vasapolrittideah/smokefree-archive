"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { TValidationSchema } from "@/lib/validations/signup";
import { ValidationSchema } from "@/lib/validations/signup";
import { signUp } from "@/lib/actions/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./page.module.scss";
import { Input } from "@/components/input";
import Button from "@/components/button";
import Link from "next/link";
import { Password } from "@/components/password";
import {signIn} from "next-auth/react";

export default function SignUp() {
    const [errorMessage, setErrorMessage] = useState("");
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
        startTransition(async () => {
            const res = await signUp(data);

            if (res.status != 201) {
                if (res.status === 500 && res.message === "email does already exist") {
                    setErrorMessage(
                        "ที่อยู่อีเมลมีอยู่ในระบบแล้ว กรุณาตรวจสอบความถูกต้องอีเมลของคุณและยืนยันใหม่อีกครั้ง"
                    );
                    return;
                }

                setErrorMessage(res.message);
                return;
            }

            void signIn();
        });
    });

    const watchPassword = watch("password", "");
    watch(() => setErrorMessage(""));

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>
                    สร้างบัญชีเพื่อ
                    <br />
                    เข้าร่วมโครงการ
                </h1>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <Input<TValidationSchema>
                    label="อีเมล"
                    placeholder="กรอกอีเมล"
                    name="email"
                    register={register}
                    errors={errors}
                    width="100%"
                    height="3rem"
                    margin="0 0 .5rem 0"
                />
                <Password<TValidationSchema>
                    label="รหัสผ่าน"
                    placeholder="กรอกรหัสผ่าน"
                    name="password"
                    register={register}
                    errors={errors}
                    indicator={true}
                    width="100%"
                    height="3rem"
                    margin="0 0 .5rem 0"
                    value={watchPassword}
                />
                <Password<TValidationSchema>
                    label="ยืนยันรหัสผ่าน"
                    placeholder="กรอกยืนยันรหัสผ่าน"
                    name="passwordConfirm"
                    register={register}
                    errors={errors}
                    width="100%"
                    height="3rem"
                    margin="0 0 .5rem 0"
                />
                <Button
                    className={styles.button}
                    type="submit"
                    disabled={isPending}
                    loading={isPending}
                    shadow={true}
                    width="100%"
                    height="3rem"
                    margin=".5rem 0 0 0"
                >
                    ยืนยัน
                </Button>
                <div className={styles.signin}>
                    <span>คุณมีบัญชีแล้วใช่หรือไม่</span>
                    <Link className={styles.link} href="/">
                        เข้าสู่ระบบ
                    </Link>
                </div>
            </div>
        </form>
    );
}
