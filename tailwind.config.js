/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'purple-main': '#7C5DFA',
                'purple-hover': '#9277FF',
                'dark-bg': '#0C0E16',
                'dark-card': '#1E2139',
                'dark-text': '#DFE3FA',
                'light-bg': '#F8F8FB',
                'light-text': '#0C0E16',
                'status-paid': '#33D69F',
                'status-pending': '#FF8F00',
                'status-draft': '#373B53',
            },
            fontFamily: {
                spartan: ['League Spartan', 'sans-serif'],
            },
        },
    },
    plugins: [],
}