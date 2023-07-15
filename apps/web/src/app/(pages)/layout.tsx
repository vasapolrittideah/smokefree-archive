import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.scss";
import styles from "./layout.module.scss";
import Provider from "@/components/themes/provider";
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
                <Provider>
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
                </Provider>
            </body>
        </html>
    );
}
