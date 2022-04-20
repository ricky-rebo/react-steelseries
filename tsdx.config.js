// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!

const postcss = require('rollup-plugin-postcss');
const url = require("postcss-url");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
		config.plugins.push(
      postcss({
				to: "dist/fonts/index.css",
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
					url({
						url: "inline", 		// enable inline assets using base64 encoding
						maxSize: 10, 			// maximum file size to inline (in kilobytes)
						fallback: "copy", // fallback method to use if max size is exceeded
					}),
        ],
        inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: (!!options.writeMeta) ? "fonts/index.css" : false,
      })
    );

    return config; // always return a config.
  },
};