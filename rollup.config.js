import babel from 'rollup-plugin-babel';

export default {
	plugins: [
		babel({
			babelrc: false,
			sourceMap: true,
			exclude: 'node_modules/**',
			presets: [
				['es2015', { loose:true, modules:false }],
				'stage-0'
			],
			plugins: [
				['transform-react-jsx', { pragma:'h' }]
			]
		})
	]
};
