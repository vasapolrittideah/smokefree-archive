'use strict';

module.exports = {
    mode: 'jit',
    content: [
        './apps/**/*.{html,svelte,tsx,ts,jsx,js,pcss,scss,css}',
        './libs/**/*.{html,svelte,tsx,ts,jsx,js,pcss,scss,css}',
    ],
    /**
     * Enable dark mode
     */
    darkMode: 'class',
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
