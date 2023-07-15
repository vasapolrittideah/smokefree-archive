"use client";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import React from "react";
import { motion } from "framer-motion";
import styles from "./page.module.scss";
import Button from "@/components/button";
import QuitSmoking from "@/public/images/quit-smoking.svg";
import Image from "next/image";
import Count from "@/components/count";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.bg} />
            <header className={styles.hero}>
                <p className={styles.tag}>โครงการ</p>
                <motion.div
                    className={styles.hline}
                    initial={{ width: 0, opacity: "40%" }}
                    animate={{ width: "calc(100% + 12rem)", opacity: "10%" }}
                    transition={{ ease: "easeIn", duration: 0.5 }}
                />
                <motion.div
                    className={styles.vline}
                    initial={{ height: 0, opacity: "40%" }}
                    animate={{ height: "88%", opacity: "10%" }}
                    transition={{ ease: "easeIn", duration: 0.5 }}
                />
                <motion.div
                    className={styles.vline_r}
                    initial={{ height: 0, opacity: "40%" }}
                    animate={{ height: "88%", opacity: "10%" }}
                    transition={{ ease: "easeIn", duration: 0.5, delay: 0.25 }}
                />
                <h1 className={styles.title} id="title">
                    <span>บุหรี่</span>
                    เลิกได้ถ้าลงมือทำ
                </h1>
                <motion.div
                    className={styles.hline}
                    initial={{ width: 0, opacity: "40%" }}
                    animate={{ width: "calc(100% + 12rem)", opacity: "10%" }}
                    transition={{ ease: "easeIn", duration: 0.5, delay: 0.1 }}
                />
                <div className={styles.description}>
                    <p>
                        โครงการเลิกบุหรี่เป็นกลยุทธ์ที่มุ่งเน้นการช่วยเหลือผู้ที่ต้องการเลิกบุหรี่ให้สามารถเลิกสูบอย่างปลอดภัยและประสบความสำเร็จ
                        โดยผสมผสานการให้คำปรึกษาและการสนับสนุนทางสังคม
                        เพื่อช่วยผู้สูบบุหรี่รับมือกับความเครียดและอุปสรรคต่างๆ
                        ที่เกิดขึ้นระหว่างขั้นตอนการเลิกบุหรี่
                    </p>
                </div>
                <motion.div
                    className={styles.hline}
                    initial={{ width: 0, opacity: "40%" }}
                    animate={{ width: "calc(100% + 12rem)", opacity: "10%" }}
                    transition={{ ease: "easeIn", duration: 0.5, delay: 0.2 }}
                />
                <div className={styles.start}>
                    <Button width="18rem" height="3rem" shadow={true} loading={false}>
                        <span>เริ่มต้น</span>
                    </Button>
                    <p>
                        <Count initial={0} final={56} duration={2.5} />
                        &nbsp;ผู้เข้าร่วมโครงการ
                    </p>
                </div>
                <motion.div
                    className={styles.hline}
                    initial={{ width: 0, opacity: "40%" }}
                    animate={{ width: "calc(100% + 12rem)", opacity: "10%" }}
                    transition={{ ease: "easeIn", duration: 0.5, delay: 0.3 }}
                />
            </header>
            <section className={styles.about} id="about">
                <h1>ทำไมถึงจัดทำโครงการนี้ขึ้น</h1>
                <p>
                    งานอาชีวเวชกรรม&nbsp;ของโรงพยาบาลเฉลิมพระเกียรติ&nbsp;สมเด็จพระเทพรัตนราชสุดาฯสยามบรมราชกุมารี&nbsp;ระยอง&nbsp;ได้จัดทำโครงการพัฒนาระบบบริการการพยาบาลเพื่อเลิกบุหรี่&nbsp;โดยมีวัตถุประสงค์เพื่อให้พนักงานที่มีพฤติกรรมสูบบุหรี่&nbsp;มารับการจัดบริการเชิงรุกของโรงพยาบาล
                </p>
                <p>
                    พนักงานจะได้รับบริการให้คำปรึกษาโดยพยาบาล&nbsp;นักวิชาการสาธารณสุขเพื่อบำบัดการสูบบุหรี่&nbsp;รวมทั้งมีระบบการติดตามเป็นระยะ&nbsp;และ/หรือมีการติดตามทางโทรศัพท์&nbsp;การนวดสะท้อนฝ่าเท้าเพื่อลดความอยากบุหรี่&nbsp;มีสมุนไพรที่เป็นตัวช่วยในการลดความอยากบุหรี่&nbsp;สร้างแรงบันดาลใจ&nbsp;กระตุ้นให้ตระหนักถึงอันตรายของบุหรี่
                </p>
                <p>
                    โดยคาดหวังว่าการให้บริการช่วยเลิกเชิงรุก&nbsp;จะทำให้พนักงานที่สูบบุหรี่เข้าถึงระบบบริการบำบัดการเสพยาสูบ&nbsp;ตัดสินใจเลิกบุหรี่&nbsp;และทำการเลิกบุหรี่ได้สำเร็จมากขึ้น
                </p>
            </section>
            <Image
                className={styles.image}
                src={QuitSmoking}
                alt="Quit Smoking"
                width={400}
                height={400}
            />
        </main>
    );
}
