"use server";

import { ValidationSchemaType } from "@/lib/validations/signup";

export async function action(data: ValidationSchemaType) {
    console.log(data);
}
