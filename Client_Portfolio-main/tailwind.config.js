export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        gradientShift: "gradientShift 15s ease-in-out infinite",
        orbit: "orbit 4s linear infinite",
        "orbit-reverse": "orbit-reverse 4s linear infinite",
        comet: "comet 2.5s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spin: "spin 6s linear infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(120px) rotate(-360deg)",
          },
        },
        "orbit-reverse": {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": {
            transform: "rotate(-360deg) translateX(120px) rotate(360deg)",
          },
        },
        comet: {
          "0%": { transform: "translateX(-100%) rotate(45deg)", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { transform: "translateX(100%) rotate(45deg)", opacity: 0 },
        },
        pulse: {
          "0%, 100%": { opacity: 0.2 },
          "50%": { opacity: 0.4 },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
      },
      inset: {
        "1/5": "20%",
      },
      colors: {
        darkBg: "#080818",
        darkCard: "#0a0a20",
      },
      zIndex: {
        "-1": "-1",
      },
      gridTemplateColumns: {
        "auto-fill-100": "repeat(auto-fill, minmax(100px, 1fr))",
        "auto-fill-200": "repeat(auto-fill, minmax(200px, 1fr))",
        "auto-fill-250": "repeat(auto-fill, minmax(250px, 1fr))",
        "auto-fill-300": "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [],
};
