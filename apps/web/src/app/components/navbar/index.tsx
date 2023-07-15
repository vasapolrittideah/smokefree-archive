"use client";

import ThemeSwitcher from "@/components/themes/swither";
import styles from "./navbar.module.scss";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Button from "@/components/button";
import Link from "next/link";
import Image from "next/image";
import icon from "@/public/images/icon.png";
import iconDark from "@/public/images/icon-dark.png";
import { useTheme } from "next-themes";

export default function Navbar() {
    const { resolvedTheme } = useTheme();
    const [show, setShow] = useState(false);

    const controlNavbar = () => {
        if (window.scrollY > 10) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, []);

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.wrapper}>
                    <ul>
                        <li>
                            <Link href="/">
                                {resolvedTheme === "dark" ? (
                                    <Image src={icon} alt="Icon" width={36} height={36} />
                                ) : (
                                    <Image src={iconDark} alt="Icon" width={36} height={36} />
                                )}
                            </Link>
                        </li>
                        <li>
                            <Link className={styles.link} href="/">
                                หน้าหลัก
                            </Link>
                        </li>
                        <li>
                            <Link className={styles.link} href="/#about">
                                เกี่ยวกับ
                            </Link>
                        </li>
                        <li>
                            <Link className={styles.link} href="/signin">
                                เข้าสู่ระบบ
                            </Link>
                        </li>
                        <li>
                            <Link className={styles.link} href="/signup">
                                <Button className={styles.button} height="2.2rem" width="100%">
                                    สมัครบัญชี
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <ThemeSwitcher />
                        </li>
                    </ul>
                </div>
                <div className={classNames({ [styles.line]: show })} />
            </nav>
        </>
    );
}
