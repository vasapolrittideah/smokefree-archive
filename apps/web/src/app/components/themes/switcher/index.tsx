"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./switcher.module.scss";
import classNames from "classnames";

export default function ThemeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    return (
        <div className={styles.switcher}>
            <button
                className={classNames({ [styles["active"]]: resolvedTheme === "light" })}
                type="button"
                onClick={() => setTheme("light")}
            >
                <FontAwesomeIcon icon={faSun} />
            </button>
            <button
                className={classNames({ [styles["active"]]: resolvedTheme === "dark" })}
                type="button"
                onClick={() => setTheme("dark")}
            >
                <FontAwesomeIcon icon={faMoon} />
            </button>
        </div>
    );
}
