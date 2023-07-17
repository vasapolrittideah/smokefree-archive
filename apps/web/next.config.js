//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require("@nx/next");
const { join } = require("path");
const { i18n } = require("./next-i18next.config");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    sassOptions: {
        includePaths: [join(__dirname, "src", "app", "styles")],
        additionalData: `@import "src/app/styles/main.scss";`,
    },
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
