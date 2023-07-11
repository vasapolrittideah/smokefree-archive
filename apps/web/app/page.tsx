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
import Button from "../components/button";

export default function Home() {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, 56, { duration: 3 });

        return animation.stop;
    }, []);

    return (
        <React.Fragment>
            <p className={styles.tag}>โครงการ</p>
            <motion.div
                className={styles.horizontal_line}
                initial={{ width: 0, opacity: "40%" }}
                animate={{ width: "calc(100% + 12rem)", opacity: "10%" }}
                transition={{ ease: "easeIn", duration: 0.5 }}
            />
            <motion.div
                className={styles.vertical_line}
                initial={{ height: 0, opacity: "40%" }}
                animate={{ height: "calc(100% - 6rem)", opacity: "10%" }}
                transition={{ ease: "easeIn", duration: 0.5 }}
            />
            <motion.div
                className={styles.vertical_line__right}
                initial={{ height: 0, opacity: "40%" }}
                animate={{ height: "calc(100% - 6rem)", opacity: "10%" }}
                transition={{ ease: "easeIn", duration: 0.5, delay: 0.25 }}
            />
            <h1 className={styles.title}>
                <span className={styles.title__underline}>บุหรี่</span>
                เลิกได้ถ้าคุณลงมือทำ
            </h1>
            <motion.div
                className={styles.horizontal_line}
                initial={{ width: 0, opacity: "40%" }}
                animate={{ width: "calc(100% + 12rem)", opacity: "10%" }}
                transition={{ ease: "easeIn", duration: 0.5, delay: 0.1 }}
            />
            <div className={styles.description}>
                <div className={styles.description__line} />
                <p className={styles.description__p}>
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
            <div className={styles.action}>
                <Button width="10rem" height="3rem" loading={false}>
                    <span>เริ่มต้น</span>
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </Button>
                <p className={styles.action__p}>
                    <motion.span>{rounded}</motion.span> ผู้เข้าร่วมโครงการ
                </p>
            </div>
            <motion.div
                className={styles.horizontal_line}
                initial={{ width: 0, opacity: "40%" }}
                animate={{ width: "calc(100% + 12rem)", opacity: "10%" }}
                transition={{ ease: "easeIn", duration: 0.5, delay: 0.3 }}
            />
        </React.Fragment>
    );
}
