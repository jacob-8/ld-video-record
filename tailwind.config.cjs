const colors = require('tailwindcss/colors');

const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
			colors: {
				orange: colors.orange,
				primary: colors.blue,
			}
		},
	},
	plugins: [],
};

module.exports = config;
