/** @type {import('next-i18next').UserConfig} */
const { resolve } = require("path");

module.exports = {
    i18n: {
        defaultLocale: "th",
        locales: ["th", "en"],
    },
    localePath: typeof window === "undefined" ? resolve("./public/locales") : "/locales",
};
