import Image from "next/image";
import React from "react";
import "./globals.scss";
import styles from "./layout.module.scss";
export const metadata = {
    title: "Smokefree",
    description: "A smoking cessation program",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={styles.body}>
                <div className={styles.wrapper}>{children}</div>
                <div className={styles.circle} />
            </body>
        </html>
    );
}
