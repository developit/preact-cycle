import babel from 'rollup-plugin-babel';

export default {
	plugins: [
		babel({
			babelrc: false,
			sourceMap: true,
			exclude: 'node_modules/**',
			presets: [
				'es2015-minimal-rollup',
				'stage-0'
			],
			plugins: [
				['transform-react-jsx', { pragma:'h' }]
			]
		})
	]
};
