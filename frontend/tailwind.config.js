/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'white': '#FFFFFF',
                'black': '#242424',
                'grey': '#F3F3F3',
                'dark-grey': '#6B6B6B',
                'green':'#b00f8c',
                'red': '#FF4E4E',
                'yellow':'#FFC831',
                'transparent': 'transparent',
                'twitter': '#1DA1F2',
                'purple': '#8B46FF',
            },
            fontFamily: {
              raleway: ["'Raleway'", "sans-serif"],
              gelasio: ["'Gelasio'", "serif"]
            },
        },
        fontSize: {
            'sm': '12px',
            'base': '14px',
            'xl': '16px',
            '2xl': '20px',
            '3xl': '28px',
            '4xl': '38px',
            '5xl': '50px',
        },
    },
    plugins: [],
};
