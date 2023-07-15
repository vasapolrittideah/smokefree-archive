"use server";

import { ValidationSchemaType } from "@/lib/validations/signin";

export async function action(data: ValidationSchemaType) {
    console.log(data);
}
