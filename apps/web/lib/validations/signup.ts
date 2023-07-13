import { z } from "zod";

export const ValidationSchema = z
    .object({
        email: z.string().min(1, { message: "จำเป็นต้องกรอก อีเมล" }).email({
            message: "ต้องเป็นอีเมลที่ถูกต้อง",
        }),
        password: z.string().min(6, { message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร" }),
        passwordConfirm: z.string().min(1, { message: "จำเป็นต้องกรอก ยืนยันรหัสผ่าน" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: "ยืนยันรหัสผ่านไม่ถูกต้อง",
    });

export type ValidationSchemaType = z.infer<typeof ValidationSchema>;
