import styles from "./password-meter.module.scss";
import zxcvbn from "zxcvbn";
import classNames from "classnames";

type Props = {
    password: string;
}

export default function PasswordMeter({ password }: Props) {
    const score = zxcvbn(password).score;

    function changePasswordLabel(): string {
        switch (score) {
            case 0:
                return "คาดเดาได้ง่าย";
            case 1:
                return "คาดเดาได้ยาก";
            case 2:
                return "ปานกลาง";
            case 3:
                return "แข็งแกร่ง";
            case 4:
                return "แข็งแกร่งมากที่สุด";
            default:
                return "ไม่มี";
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.indicator}>
                <div className={styles[`_${score}`]} />
            </div>
            <p className={styles[`_${score}__message`]}>
                {changePasswordLabel()}
            </p>
        </div>
    );
}
