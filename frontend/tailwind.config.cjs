const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                devfest: {
                    blue: "#4285F4",
                    red: "#EA4335",
                    yellow: "#FBBC04",
                    green: "#34A853",
                    black: "#000000",
                },
            },
            boxShadow: {
                neo: "4px 4px 0px 0px rgba(0,0,0,1)",
                "neo-lg": "8px 8px 0px 0px rgba(0,0,0,1)",
                "neo-sm": "2px 2px 0px 0px rgba(0,0,0,1)",
            },
        },
    },
    darkMode: "class",
    plugins: [heroui()],
};
