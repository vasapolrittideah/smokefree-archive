"use client";

import styles from "./count.module.scss";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect } from "react";

type Props = {
    initial: number;
    final: number;
    duration: number;
};

export default function Count({ initial, final, duration }: Props) {
    const count = useMotionValue(initial);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, final, { duration });
        return animation.stop;
    }, []);

    return <motion.span>{rounded}</motion.span>;
}
