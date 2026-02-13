import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "1rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                dravida: {
                    red: "#D71920", // Deep Red
                    black: "#1A1A1A", // Rich Black
                    gray: "#F3F4F6", // Light Gray for backgrounds
                },
            },
            fontFamily: {
                // We'll add font family later when we set up layout
            },
        },
    },
    plugins: [],
};
export default config;
