/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        section: "#F6F6F6",
        content: "#F4F4F4",
        contentText: "#0D0D0D",
        card: "#F9F9F9",
        footer: "#2A2B36",
        purple: "#7076FF",
        darkPurple: "#000D84",
        link: "#3B41C6",
        blue: "#329AD5",
        body: "#E5F3FD",
        lightPurple: "rgba(89, 96, 254, 0.13)",
        red: "#FF0000",
        gray: "#B5B5B5",
        textGray: "#D9D9D9",
        warning: "#FF1F1F",
        green: "#22BC79",
        btnGreen: "#0BA859",
        btnRed: "#C82E2E",
        textGreen: "#409C14",
        orange: "#F46B45",
        orange50: "rgba(244, 107, 69, 0.5)",
        orangeInfo: "#F97A04",
      },
      borderRadius: {
        main: "11px",
        content: "36px",
        swiper: "15px",
        search: "31px",
        button: "16px",
      },
      fontWeight: {
        font700: "700",
      },
      boxShadow: {
        box: "0px 0px 8.399999618530273px 0px #5960FE5E",
        navbar: "0px 2px 7.599999904632568px -2px #5960FE",
        button: "0px 0px 8.399999618530273px 0px #00000040",
        swiper: "3px 4px 8.100000381469727px -1px #5960FE",
        login: "0px 0px 8.399999618530273px 0px #BEBEBE5E",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
