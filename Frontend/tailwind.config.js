/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#6c63ff',
                secondary: '#f50057',
                bg: '#f4f4f9',
                card: '#ffffff',
            }
        },
    },
    plugins: [],
}
