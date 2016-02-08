import { h, render as doRender } from 'preact';
import createCycle from './create-cycle';

function createRenderer(Renderable, parent) {
	let root;
	return props => {
		root = doRender(h(Renderable, props), parent, root);
	};
}

export default function render(Renderable, data, parent) {
	let renderer = createRenderer(Renderable, parent);
	return createCycle(renderer, data);
}

render.render = render;
render.h = h;
