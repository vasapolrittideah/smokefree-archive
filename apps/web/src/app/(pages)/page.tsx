"use client";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import React, { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import styles from "./page.module.scss";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/button";

export default function Home() {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, 56, { duration: 2.5 });

        return animation.stop;
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.background} />
            <header className={styles.wrapper__hero}>
                <p className={styles.hero__tag}>โครงการ</p>
                <motion.div
                    className={styles.horizontal_line}
                    initial={{ width: 0, opacity: "40%" }}
                    animate={{ width: "calc(100% + 12rem)", opacity: "10%" }}
                    transition={{ ease: "easeIn", duration: 0.5 }}
                />
                <motion.div
                    className={styles.vertical_line}
                    initial={{ height: 0, opacity: "40%" }}
                    animate={{ height: "85%", opacity: "10%" }}
                    transition={{ ease: "easeIn", duration: 0.5 }}
                />
                <motion.div
                    className={styles.vertical_line__right}
                    initial={{ height: 0, opacity: "40%" }}
                    animate={{ height: "85%", opacity: "10%" }}
                    transition={{ ease: "easeIn", duration: 0.5, delay: 0.25 }}
                />
                <h1 className={styles.hero__title}>
                    <span className={styles.hero__title__underline}>บุหรี่</span>
                    เลิกได้ถ้าลงมือทำ
                </h1>
                <motion.div
                    className={styles.horizontal_line}
                    initial={{ width: 0, opacity: "40%" }}
                    animate={{ width: "calc(100% + 12rem)", opacity: "10%" }}
                    transition={{ ease: "easeIn", duration: 0.5, delay: 0.1 }}
                />
                <div className={styles.hero__middle}>
                    <div className={styles.hero__middle__left} />
                    <p className={styles.hero__middle__right}>
                        โครงการเลิกบุหรี่เป็นแนวทางหรือกลยุทธ์ที่มุ่งเน้นในการช่วยผู้ที่ต้องการเลิกบุหรี่ให้สามารถก้าวไปสู่การเลิกสูบบุหรี่อย่างปลอดภัยและประสบความสำเร็จได้&nbsp;โครงการนี้มักเป็นการผสมผสานของการให้คำปรึกษาและการสนับสนุนทางสังคมเพื่อช่วยเหลือผู้สูบบุหรี่ในการรับมือกับความ
                        <br />
                        เครียดและอุปสรรคต่างๆ&nbsp;ที่อาจเกิดขึ้นระหว่างขั้นตอนการเลิกบุหรี่
                    </p>
                </div>
                <motion.div
                    className={styles.horizontal_line}
                    initial={{ width: 0, opacity: "40%" }}
                    animate={{ width: "calc(100% + 12rem)", opacity: "10%" }}
                    transition={{ ease: "easeIn", duration: 0.5, delay: 0.2 }}
                />
                <div className={styles.hero__footer}>
                    <Button width="10rem" height="3rem" loading={false}>
                        <span>เริ่มต้น</span>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </Button>
                    <p className={styles.hero__footer__right}>
                        <motion.span>{rounded}</motion.span> ผู้เข้าร่วมโครงการ
                    </p>
                </div>
                <motion.div
                    className={styles.horizontal_line}
                    initial={{ width: 0, opacity: "40%" }}
                    animate={{ width: "calc(100% + 12rem)", opacity: "10%" }}
                    transition={{ ease: "easeIn", duration: 0.5, delay: 0.3 }}
                />
            </header>
            <section className={styles.wrapper__about}>
                <h1 className={styles.about__title}>ทำไมถึงจัดทำโครงการนี้ขึ้น</h1>
                <p className={styles.about__para}>
                    งานอาชีวเวชกรรม&nbsp;ของโรงพยาบาลเฉลิมพระเกียรติ&nbsp;สมเด็จพระเทพรัตนราชสุดาฯสยามบรมราชกุมารี&nbsp;ระยอง&nbsp;ได้จัดทำโครงการพัฒนาระบบบริการการพยาบาลเพื่อเลิกบุหรี่&nbsp;โดยมีวัตถุประสงค์เพื่อให้พนักงานที่มีพฤติกรรมสูบบุหรี่&nbsp;มารับการจัดบริการเชิงรุกของโรงพยาบาล
                </p>
                <p className={styles.about__para}>
                    พนักงานจะได้รับบริการให้คำปรึกษาโดยพยาบาล&nbsp;นักวิชาการสาธารณสุขเพื่อบำบัดการสูบบุหรี่&nbsp;รวมทั้งมีระบบการติดตามเป็นระยะ&nbsp;และ/หรือมีการติดตามทางโทรศัพท์&nbsp;การนวดสะท้อนฝ่าเท้าเพื่อลดความอยากบุหรี่&nbsp;มีสมุนไพรที่เป็นตัวช่วยในการลดความอยากบุหรี่&nbsp;สร้างแรงบันดาลใจ&nbsp;กระตุ้นให้ตระหนักถึงอันตรายของบุหรี่
                </p>
                <p className={styles.about__para}>
                    โดยคาดหวังว่าการให้บริการช่วยเลิกเชิงรุก&nbsp;จะทำให้พนักงานที่สูบบุหรี่เข้าถึงระบบบริการบำบัดการเสพยาสูบ&nbsp;ตัดสินใจเลิกบุหรี่&nbsp;และทำการเลิกบุหรี่ได้สำเร็จมากขึ้น
                </p>
            </section>
        </main>
    );
}
