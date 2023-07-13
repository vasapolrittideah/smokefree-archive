import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.scss";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
    title: "Smokefree",
    description: "A smoking cessation program",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="th">
            <body>
                <div>{children}</div>
                <footer className={styles.footer}>
                    <div className={styles.footer__line} />
                    <p>
                        สงวนลิขสิทธิ&nbsp;์&copy;&nbsp;2566&nbsp;โรงพยาบาลเฉลิมพระเกียรติ&nbsp;สมเด็จพระเทพรัตนราชสุดาฯสยามบรมราชกุมารี&nbsp;ระยอง
                    </p>
                </footer>
            </body>
        </html>
    );
}
