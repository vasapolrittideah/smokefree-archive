"use server";

import * as _ from "lodash";
import { TValidationSchema } from "@/lib/validations/signup";
import { revalidatePath } from "next/cache";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { redirect } from "next/navigation";

export async function signUp(formData: TValidationSchema) {
    const body = JSON.stringify(
        _.mapKeys(formData, function (value, key) {
            return _.snakeCase(key);
        })
    );

    const res = await fetch("http://localhost:8082/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
    });

    return await res.json();
}
