import React from "react";
import styles from "./layout.module.scss";
import type { Metadata } from "next";
import "../styles/globals.scss";

export const metadata: Metadata = {
    title: "Smokefree",
    description: "A smoking cessation program",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="th">
            <body className={styles.body}>
                <div className={styles.wrapper}>{children}</div>
            </body>
        </html>
    );
}
