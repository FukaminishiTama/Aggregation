/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],  // ここで HTML や JS を監視する
  theme: {
    extend: {}, // カスタマイズする場合
  },
  plugins: [],
}


// module.exports = {
//   mode: 'jit',
//   content: [
//   "./src/**/*.{html,js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };