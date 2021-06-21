const colors = require('tailwindcss/colors');

const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
			colors: {
				primary: colors.blue,
			}
		},
	},
	plugins: [],
};

module.exports = config;
