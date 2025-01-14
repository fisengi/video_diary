/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                light: {
                    text: "#1A202C", // Dark charcoal for light text
                    background: "#F3F0FF", // Soft lavender-tinted white
                    tint: "#7F56D9", // Rich lavender-purple
                    icon: "#8B6FDF", // Muted purple for icons
                    tabIconDefault: "#B3A4E6", // Subtle purple-gray
                    tabIconSelected: "#7F56D9", // Matches the tint
                },
                dark: {
                    text: "#EDE9F7", // Light lavender-gray
                    background: "#1C1B2E", // Deep indigo
                    tint: "#9F7AEA", // Soft lavender
                    icon: "#B3A4E6", // Soft lavender-gray
                    tabIconDefault: "#7E699B", // Muted purple
                    tabIconSelected: "#9F7AEA", // Matches the tint
                },
                primary: "#7F56D9", // Main purple shade
                secondary: "#9F7AEA", // Secondary lavender shade
                accent: "#F3F0FF", // Light accent color
            },
        },
    },
    plugins: [],
};
