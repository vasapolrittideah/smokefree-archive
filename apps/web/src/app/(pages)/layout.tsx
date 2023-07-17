// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.scss";
import styles from "./layout.module.scss";
import ThemesProvider from "@/components/themes/provider";
import SessionProvider from "@/components/session/provider";
import Navbar from "@/components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
    title: "Smokefree",
    description: "A smoking cessation program",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="th" suppressHydrationWarning={true}>
            <body className={styles.body}>
                <SessionProvider>
                    <ThemesProvider>
                        <Navbar />
                        <div>{children}</div>
                        <footer className={styles.footer}>
                            <div className={styles.line} />
                            <p>
                                สงวนลิขสิทธิ์&nbsp;&copy;&nbsp;2566&nbsp;โรงพยาบาลเฉลิมพระเกียรติ&nbsp;สมเด็จพระเทพรัตนราชสุดาฯสยามบรมราชกุมารี&nbsp;ระยอง
                            </p>
                            <div className={styles.text}>
                                <span>จัดทำขึ้นด้วย</span>
                                <FontAwesomeIcon className={styles.icon} icon={faHeart} />
                                <span>โดย วศพล ฤทธิเดช</span>
                            </div>
                        </footer>
                    </ThemesProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
