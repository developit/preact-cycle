import babel from 'rollup-plugin-babel';

export default {
	plugins: [
		babel({
			sourceMap: true,
			exclude: 'node_modules/**',
			presets: [
				'es2015-minimal-rollup',
				'stage-0'
			]
		})
	]
};
